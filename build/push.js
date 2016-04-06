'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _errors = require('kinvey-javascript-sdk-core/build/errors');

var _events = require('events');

var _network = require('kinvey-javascript-sdk-core/build/requests/network');

var _datastore = require('kinvey-javascript-sdk-core/build/stores/datastore');

var _enums = require('kinvey-javascript-sdk-core/build/enums');

var _user = require('kinvey-javascript-sdk-core/build/user');

var _client = require('kinvey-javascript-sdk-core/build/client');

var _query = require('kinvey-javascript-sdk-core/build/query');

var _utils = require('./utils');

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
var notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
var deviceCollectionName = process.env.KINVEY_DEVICE_COLLECTION_NAME || 'kinvey_device';
var emitter = new _events.EventEmitter();

var Push = exports.Push = {
  listeners: function listeners() {
    return emitter.listeners(notificationEvent);
  },
  onNotification: function onNotification(listener) {
    return emitter.on(notificationEvent, listener);
  },
  onceNotification: function onceNotification(listener) {
    return emitter.once(notificationEvent, listener);
  },
  removeListener: function removeListener(listener) {
    return emitter.removeListener(notificationEvent, listener);
  },
  removeAllListeners: function removeAllListeners() {
    return emitter.removeAllListeners(notificationEvent);
  },
  init: function init() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!(0, _utils.isiOS)() || !(0, _utils.isAndroid)()) {
      return Promise.reject(new _errors.KinveyError('Kinvey currently only supports ' + 'push notifications on iOS and Android platforms.'));
    }

    options = (0, _assign2.default)({
      android: {
        senderID: undefined
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      },
      force: false
    }, options);

    var promise = new Promise(function (resolve, reject) {
      if ((0, _utils.isiOS)()) {
        var version = Titanium.Platfrom.version;
        if (version.split('.')[0] >= 8) {
          Titanium.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
            Titanium.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
            Titanium.Network.registerForPushNotifications({
              success: function success(e) {
                resolve(e.deviceToken);
              },
              error: function error(e) {
                reject(new _errors.KinveyError('An error occurred registering this device ' + 'for push notifications.', e));
              },
              callback: function callback(data) {
                Push.emit(notificationEvent, data);
              }
            });
          });

          var types = [];

          if (options.ios.alert) {
            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_ALERT);
          }

          if (options.ios.badge) {
            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_BADGE);
          }

          if (options.ios.sound) {
            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_SOUND);
          }

          Titanium.App.iOS.registerUserNotificationSettings({
            types: types
          });
        } else {
          var _types = [];

          if (options.ios.alert) {
            _types.push(Titanium.Network.NOTIFICATION_TYPE_ALERT);
          }

          if (options.ios.badge) {
            _types.push(Titanium.Network.NOTIFICATION_TYPE_BADGE);
          }

          if (options.ios.sound) {
            _types.push(Titanium.Network.NOTIFICATION_TYPE_SOUND);
          }

          Titanium.Network.registerForPushNotifications({
            types: [Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND, Titanium.Network.NOTIFICATION_TYPE_BADGE],
            success: function success(e) {
              resolve(e.deviceToken);
            },
            error: function error(e) {
              reject(new _errors.KinveyError('An error occurred registering this device for ' + 'push notifications.', e));
            },
            callback: function callback(data) {
              Push.emit(notificationEvent, data);
            }
          });
        }
      } else if ((0, _utils.isAndroid)()) {
        CloudPush.retrieveDeviceToken({
          success: function success(e) {
            resolve(e.deviceToken);
          },
          error: function error(e) {
            reject(new _errors.KinveyError('An error occurred registering this device for ' + 'push notifications.', e));
          }
        });

        CloudPush.addEventListener('callback', function (data) {
          Push.emit(notificationEvent, data);
        });
      }
    }).then(function (deviceId) {
      if (!deviceId) {
        throw new _errors.KinveyError('Unable to retrieve the device id to register this device for push notifications.');
      }

      var store = _datastore.DataStore.getInstance(deviceCollectionName, _datastore.DataStoreType.Sync);
      return store.findById(deviceId).then(function (entity) {
        if (options.force !== true && entity.registered) {
          throw new _errors.KinveyError('Device is already registered. To force registration ' + 'please set options.force to true.');
        }
      }).then(function () {
        var user = _user.User.getActiveUser();
        var client = _client.Client.sharedInstance();
        var request = new _network.NetworkRequest({
          method: _enums.HttpMethod.POST,
          authType: user ? _enums.AuthType.Session : _enums.AuthType.Master,
          url: _url2.default.format({
            protocol: client.protocol,
            host: client.host,
            pathname: '/' + pushNamespace + '/' + client.appKey + '/register-device'
          }),
          properties: options.properties,
          data: {
            platform: Titanium.Platfrom.osname,
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout,
          client: client
        });
        return request.execute();
      }).then(function (response) {
        return store.save({ _id: deviceId, registered: true }).then(function () {
          return response.data;
        });
      });
    });

    return promise;
  },
  unregister: function unregister() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!(0, _utils.isiOS)() || !(0, _utils.isAndroid)()) {
      return Promise.reject(new _errors.KinveyError('Kinvey currently only supports ' + 'push notifications on iOS and Android platforms.'));
    }

    var store = _datastore.DataStore.getInstance(deviceCollectionName, _datastore.DataStoreType.Sync);
    var query = new _query.Query();
    query.equalsTo('registered', true);
    var promise = store.find(query).then(function (data) {
      if (data.length === 1) {
        return data[0]._id;
      }

      return undefined;
    }).then(function (deviceId) {
      if (!deviceId) {
        throw new _errors.KinveyError('This device has not been registered.');
      }

      var user = _user.User.getActiveUser();
      var client = _client.Client.sharedInstance();
      var request = new _network.NetworkRequest({
        method: _enums.HttpMethod.POST,
        authType: user ? _enums.AuthType.Session : _enums.AuthType.Master,
        url: _url2.default.format({
          protocol: client.protocol,
          host: client.host,
          pathname: '/' + pushNamespace + '/' + client.appKey + '/unregister-device'
        }),
        properties: options.properties,
        data: {
          platform: Titanium.Platfrom.osname,
          framework: 'titanium',
          deviceId: deviceId,
          userId: user ? null : options.userId
        },
        timeout: options.timeout,
        client: client
      });
      return request.execute().then(function (response) {
        return store.removeById(deviceId).then(function () {
          return response.data;
        });
      });
    });

    return promise;
  }
};