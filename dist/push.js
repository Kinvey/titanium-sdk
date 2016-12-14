'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('kinvey-node-sdk/dist/request');

var _client = require('kinvey-node-sdk/dist/client');

var _entity = require('kinvey-node-sdk/dist/entity');

var _events = require('events');

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
var notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
var CloudPush = void 0;

if (_device2.default.isAndroid()) {
  // eslint-disable-next-line
  CloudPush = require('./cloudpush');
}

var Push = function (_EventEmitter) {
  _inherits(Push, _EventEmitter);

  function Push() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Push);

    var _this = _possibleConstructorReturn(this, (Push.__proto__ || Object.getPrototypeOf(Push)).call(this));

    _this.client = options.client || _client.Client.sharedInstance();
    return _this;
  }

  _createClass(Push, [{
    key: 'isSupported',
    value: function isSupported() {
      return _device2.default.isiOS() || _device2.default.isAndroid();
    }
  }, {
    key: 'onNotification',
    value: function onNotification(listener) {
      return this.on(notificationEvent, listener);
    }
  }, {
    key: 'onceNotification',
    value: function onceNotification(listener) {
      return this.once(notificationEvent, listener);
    }
  }, {
    key: 'register',
    value: function register() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.isSupported() === false) {
        return _es6Promise2.default.reject(new Error('Kinvey currently only supports push notifications on iOS and Android platforms.'));
      }

      return this.unregister().catch(function () {
        return null;
      }).then(function () {
        return new _es6Promise2.default(function (resolve, reject) {
          var notificationListener = (0, _bind2.default)(function (data) {
            _this2.emit(notificationEvent, data);
          }, _this2);

          if (_device2.default.isiOS()) {
            if (parseInt(Ti.Platform.version.split('.')[0], 10) >= 8) {
              Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
                Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
                Ti.Network.registerForPushNotifications({
                  success: function success(e) {
                    resolve(e.deviceToken);
                  },
                  error: function error(e) {
                    reject(new Error('An error occurred registering this device' + ' for push notifications.', e));
                  },

                  callback: notificationListener
                });
              });

              var types = [];

              if (options.ios) {
                if (options.ios.alert) {
                  types.push(Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT);
                }

                if (options.ios.badge) {
                  types.push(Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE);
                }

                if (options.ios.sound) {
                  types.push(Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND);
                }
              }

              Ti.App.iOS.registerUserNotificationSettings({
                types: types,
                categories: options.categories || []
              });
            } else {
              var _types = [];

              if (options.ios) {
                if (options.ios.alert) {
                  _types.push(Ti.Network.NOTIFICATION_TYPE_ALERT);
                }

                if (options.ios.badge) {
                  _types.push(Ti.Network.NOTIFICATION_TYPE_BADGE);
                }

                if (options.ios.sound) {
                  _types.push(Ti.Network.NOTIFICATION_TYPE_SOUND);
                }
              }

              Ti.Network.registerForPushNotifications({
                types: _types,
                success: function success(e) {
                  resolve(e.deviceToken);
                },
                error: function error(e) {
                  reject(new Error('An error occurred registering this device for push notifications.', e));
                },

                callback: notificationListener
              });
            }
          } else if (_device2.default.isAndroid()) {
            CloudPush.retrieveDeviceToken({
              success: function success(e) {
                resolve(e.deviceToken);
              },
              error: function error(e) {
                reject(new Error('An error occurred registering this device for' + ' push notifications.', e));
              }
            });

            CloudPush.addEventListener('callback', notificationListener);
          }
        });
      }).then(function (deviceId) {
        if (typeof deviceId === 'undefined') {
          throw new Error('Unable to retrieve the device id to register this device for push notifications.');
        }

        var user = _entity.User.getActiveUser(_this2.client);
        var request = new _request.KinveyRequest({
          method: _request.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this2.client.protocol,
            host: _this2.client.host,
            pathname: _this2.pathname + '/register-device'
          }),
          properties: options.properties,
          authType: user ? _request.AuthType.Session : _request.AuthType.Master,
          data: {
            platform: _device2.default.isiOS() ? 'ios' : 'android',
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? undefined : options.userId
          },
          timeout: options.timeout,
          client: _this2.client
        });
        return request.execute().then(function (response) {
          return response.data;
        }).then(function (data) {
          var request = new _request.CacheRequest({
            method: _request.RequestMethod.PUT,
            url: _url2.default.format({
              protocol: _this2.client.protocol,
              host: _this2.client.host,
              pathname: _this2.pathname + '/device'
            }),
            data: {
              deviceId: deviceId
            },
            client: _this2.client
          });
          return request.execute().then(function () {
            return data;
          });
        });
      });
    }
  }, {
    key: 'unregister',
    value: function unregister() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.isSupported() === false) {
        return _es6Promise2.default.reject(new Error('Kinvey currently only supports push notifications on iOS and Android platforms.'));
      }

      var request = new _request.CacheRequest({
        method: _request.RequestMethod.GET,
        url: _url2.default.format({
          protocol: this.client.protocol,
          host: this.client.host,
          pathname: this.pathname + '/device'
        }),
        client: this.client
      });
      return request.execute().then(function (response) {
        return response.data;
      }).then(function (_ref) {
        var deviceId = _ref.deviceId;

        if (typeof deviceId === 'undefined') {
          throw new Error('This device has not been registered for push notifications.');
        }

        var user = _entity.User.getActiveUser(_this3.client);
        var request = new _request.KinveyRequest({
          method: _request.RequestMethod.POST,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: _this3.pathname + '/unregister-device'
          }),
          properties: options.properties,
          authType: user ? _request.AuthType.Session : _request.AuthType.Master,
          data: {
            platform: _device2.default.isiOS() ? 'ios' : 'android',
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout,
          client: _this3.client
        });
        return request.execute().then(function (response) {
          return response.data;
        });
      }).then(function (data) {
        var request = new _request.CacheRequest({
          method: _request.RequestMethod.DELETE,
          url: _url2.default.format({
            protocol: _this3.client.protocol,
            host: _this3.client.host,
            pathname: _this3.pathname + '/device'
          }),
          client: _this3.client
        });
        return request.execute().then(function () {
          return data;
        });
      });
    }
  }, {
    key: 'pathname',
    get: function get() {
      return '/' + pushNamespace + '/' + this.client.appKey;
    }
  }, {
    key: 'client',
    get: function get() {
      return this._client;
    },
    set: function set(client) {
      if (typeof client === 'undefined') {
        throw new Error('Kinvey.Push must have a client defined.');
      }

      this._client = client;
    }
  }]);

  return Push;
}(_events.EventEmitter);

exports.default = Push;