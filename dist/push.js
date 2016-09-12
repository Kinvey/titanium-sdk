'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Push = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _events = require('events');

var _device = require('./device');

var _es6Promise = require('es6-promise');

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _es6Promise.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _es6Promise.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


var pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
var notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
var pushSettingsFilename = process.env.KINVEY_PUSH_SETTINGS_FILE_NAME || 'kinvey_pushSettings.txt';
var deviceIdFilename = process.env.KINVEY_PUSH_SETTINGS_FILE_NAME || 'kinvey_deviceId.txt';
var notificationEventListener = void 0;

var Push = exports.Push = function (_EventEmitter) {
  _inherits(Push, _EventEmitter);

  function Push() {
    _classCallCheck(this, Push);

    var _this = _possibleConstructorReturn(this, (Push.__proto__ || Object.getPrototypeOf(Push)).call(this));

    _this.client = _kinveyJavascriptSdkCore.Client.sharedInstance();
    notificationEventListener = (0, _bind2.default)(_this.notificationListener, _this);

    try {
      var pushSettingsFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, pushSettingsFilename);
      var pushSettings = JSON.parse(pushSettingsFile.read().text);

      if (pushSettings) {
        _this.register(pushSettings);
      }
    } catch (Error) {
      // Catch any errors
    }
    return _this;
  }

  _createClass(Push, [{
    key: 'isSupported',
    value: function isSupported() {
      return _device.Device.isiOS() || _device.Device.isAndroid();
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
    key: 'notificationListener',
    value: function notificationListener(data) {
      this.emit(notificationEvent, data);
    }
  }, {
    key: 'register',
    value: function () {
      var _ref = _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee() {
        var _this2 = this;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var promise;
        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.isSupported()) {
                  _context.next = 2;
                  break;
                }

                throw new _kinveyJavascriptSdkCore.KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');

              case 2:
                promise = this.unregister().catch(function () {
                  return null;
                });

                promise = promise.then(function () {
                  var promise = new _es6Promise.Promise(function (resolve, reject) {
                    if (_device.Device.isiOS()) {
                      var version = Titanium.Platfrom.version;
                      if (version.split('.')[0] >= 8) {
                        Titanium.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
                          Titanium.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
                          Titanium.Network.registerForPushNotifications({
                            success: function success(e) {
                              resolve(e.deviceToken);
                            },
                            error: function error(e) {
                              reject(new _kinveyJavascriptSdkCore.KinveyError('An error occurred registering this device' + ' for push notifications.', e));
                            },

                            callback: notificationEventListener
                          });
                        });

                        var types = [];

                        if (options.ios) {
                          if (options.ios.alert) {
                            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_ALERT);
                          }

                          if (options.ios.badge) {
                            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_BADGE);
                          }

                          if (options.ios.sound) {
                            types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_SOUND);
                          }
                        }

                        Titanium.App.iOS.registerUserNotificationSettings({
                          types: types,
                          categories: options.categories || []
                        });
                      } else {
                        var _types = [];

                        if (options.ios) {
                          if (options.ios.alert) {
                            _types.push(Titanium.Network.NOTIFICATION_TYPE_ALERT);
                          }

                          if (options.ios.badge) {
                            _types.push(Titanium.Network.NOTIFICATION_TYPE_BADGE);
                          }

                          if (options.ios.sound) {
                            _types.push(Titanium.Network.NOTIFICATION_TYPE_SOUND);
                          }
                        }

                        Titanium.Network.registerForPushNotifications({
                          types: _types,
                          success: function success(e) {
                            resolve(e.deviceToken);
                          },
                          error: function error(e) {
                            reject(new _kinveyJavascriptSdkCore.KinveyError('An error occurred registering this device for push notifications.', e));
                          },

                          callback: notificationEventListener
                        });
                      }
                    } else if (_device.Device.isAndroid()) {
                      CloudPush.retrieveDeviceToken({
                        success: function success(e) {
                          resolve(e.deviceToken);
                        },
                        error: function error(e) {
                          reject(new _kinveyJavascriptSdkCore.KinveyError('An error occurred registering this device for' + ' push notifications.', e));
                        }
                      });
                    }
                  });
                  return promise;
                }).then(function (deviceId) {
                  if (!deviceId) {
                    throw new _kinveyJavascriptSdkCore.KinveyError('Unable to retrieve the device id to register this device for push notifications.');
                  }

                  var user = _kinveyJavascriptSdkCore.User.getActiveUser(_this2.client);
                  var request = new _kinveyJavascriptSdkCore.NetworkRequest({
                    method: _kinveyJavascriptSdkCore.RequestMethod.POST,
                    url: _url2.default.format({
                      protocol: _this2.client.protocol,
                      host: _this2.client.host,
                      pathname: _this2.pathname + '/register-device'
                    }),
                    properties: options.properties,
                    authType: user ? _kinveyJavascriptSdkCore.AuthType.Session : _kinveyJavascriptSdkCore.AuthType.Master,
                    data: {
                      platform: global.device.platform.toLowerCase(),
                      framework: 'phonegap',
                      deviceId: deviceId,
                      userId: user ? undefined : options.userId
                    },
                    timeout: options.timeout,
                    client: _this2.client
                  });
                  return request.execute().then(function (response) {
                    var deviceIdFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, deviceIdFilename);
                    deviceIdFile.write(JSON.stringify(deviceId));

                    var pushSettingsFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, pushSettingsFilename);
                    pushSettingsFile.write(JSON.stringify(options));
                    return response.data;
                  });
                });

                return _context.abrupt('return', promise);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'unregister',
    value: function () {
      var _ref2 = _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee2() {
        var _this3 = this;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var promise;
        return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.isSupported()) {
                  _context2.next = 2;
                  break;
                }

                throw new _kinveyJavascriptSdkCore.KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');

              case 2:
                promise = _es6Promise.Promise.resolve().then(function () {
                  var deviceIdFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, deviceIdFilename);
                  return JSON.parse(deviceIdFile.read().text);
                }).then(function (deviceId) {
                  if (!deviceId) {
                    throw new _kinveyJavascriptSdkCore.KinveyError('This device has not been registered for push notifications.');
                  }

                  var user = _kinveyJavascriptSdkCore.User.getActiveUser(_this3.client);
                  var request = new _kinveyJavascriptSdkCore.NetworkRequest({
                    method: _kinveyJavascriptSdkCore.RequestMethod.POST,
                    url: _url2.default.format({
                      protocol: _this3.client.protocol,
                      host: _this3.client.host,
                      pathname: _this3.pathname + '/unregister-device'
                    }),
                    properties: options.properties,
                    authType: user ? _kinveyJavascriptSdkCore.AuthType.Session : _kinveyJavascriptSdkCore.AuthType.Master,
                    data: {
                      platform: global.device.platform.toLowerCase(),
                      framework: 'phonegap',
                      deviceId: deviceId,
                      userId: user ? null : options.userId
                    },
                    timeout: options.timeout,
                    client: _this3.client
                  });
                  return request.execute();
                }).then(function (response) {
                  if (_device.Device.isAndroid()) {
                    CloudPush.removeEventListener('callback', notificationEventListener);
                  }

                  var deviceIdFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, deviceIdFilename);
                  deviceIdFile.deleteFile();

                  var pushSettingsFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, pushSettingsFilename);
                  pushSettingsFile.deleteFile();

                  return response.data;
                });
                return _context2.abrupt('return', promise);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregister(_x3) {
        return _ref2.apply(this, arguments);
      }

      return unregister;
    }()
  }, {
    key: 'pathname',
    get: function get() {
      return '/' + pushNamespace + '/' + this.client.appKey;
    }
  }, {
    key: 'client',
    get: function get() {
      return this.pushClient;
    },
    set: function set(client) {
      if (!client) {
        throw new _kinveyJavascriptSdkCore.KinveyError('Kinvey.Push much have a client defined.');
      }

      this.pushClient = client;
    }
  }]);

  return Push;
}(_events.EventEmitter);