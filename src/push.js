import {
  AuthType,
  RequestMethod,
  CacheRequest,
  KinveyRequest,
  User,
  Client,
  isDefined,
  NotFoundError
} from 'kinvey-js-sdk/dist/export';
import Promise from 'es6-promise';
import { EventEmitter } from 'events';
import url from 'url';
import bind from 'lodash/bind';

import Device from './device';

const APP_DATA_NAMESPACE = process.env.KINVEY_DATASTORE_NAMESPACE || 'appdata';
const PUSH_NAMESPACE = process.env.KINVEY_PUSH_NAMESPACE || 'push';
const NOTIFICATION_EVENT = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
const DEVICE_COLLECTION = '__device';
let CloudPush;

if (Device.isAndroid()) {
  // eslint-disable-next-line
  CloudPush = require('./cloudpush');
}

class Push extends EventEmitter {
  get pathname() {
    return `/${PUSH_NAMESPACE}/${this.client.appKey}`;
  }

  get client() {
    if (!this._client) {
      return Client.sharedInstance();
    }

    return this._client;
  }

  set client(client) {
    if (!(client instanceof Client)) {
      throw new Error('client must be an instance of Client.');
    }

    this._client = client;
  }

  isSupported() {
    return Device.isiOS() || Device.isAndroid();
  }

  onNotification(listener) {
    return this.on(NOTIFICATION_EVENT, listener);
  }

  onceNotification(listener) {
    return this.once(NOTIFICATION_EVENT, listener);
  }

  register(options = {}) {
    if (this.isSupported() === false) {
      return Promise.reject(
        new Error('Kinvey currently only supports push notifications on iOS and Android platforms.')
      );
    }

    return new Promise((resolve, reject) => {
      const notificationListener = bind((data) => {
        this.emit(NOTIFICATION_EVENT, data);
      }, this);

      if (Device.isiOS()) {
        if (parseInt(Ti.Platform.version.split('.')[0], 10) >= 8) {
          Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
            Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
            Ti.Network.registerForPushNotifications({
              success(e) {
                resolve(e.deviceToken);
              },
              error(e) {
                reject(new Error('An error occurred registering this device'
                  + ' for push notifications.', e));
              },
              callback: notificationListener
            });
          });

          const types = [];

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
          const types = [];

          if (options.ios) {
            if (options.ios.alert) {
              types.push(Ti.Network.NOTIFICATION_TYPE_ALERT);
            }

            if (options.ios.badge) {
              types.push(Ti.Network.NOTIFICATION_TYPE_BADGE);
            }

            if (options.ios.sound) {
              types.push(Ti.Network.NOTIFICATION_TYPE_SOUND);
            }
          }

          Ti.Network.registerForPushNotifications({
            types: types,
            success(e) {
              resolve(e.deviceToken);
            },
            error(e) {
              reject(new Error('An error occurred registering this device for push notifications.', e));
            },
            callback: notificationListener
          });
        }
      } else if (Device.isAndroid()) {
        CloudPush.setShowTrayNotificationsWhenFocused(true);
        CloudPush.retrieveDeviceToken({
          success(e) {
            resolve(e.deviceToken);
          },
          error(e) {
            reject(new Error('An error occurred registering this device for'
              + ' push notifications.', e.error));
          }
        });

        CloudPush.addEventListener('callback', notificationListener);
      }
    })
      .then((deviceId) => {
        if (typeof deviceId === 'undefined') {
          throw new Error('Unable to retrieve the device id to register this device for push notifications.');
        }

        const user = User.getActiveUser(this.client);
        const request = new KinveyRequest({
          method: RequestMethod.POST,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this.pathname}/register-device`
          }),
          properties: options.properties,
          authType: user ? AuthType.Session : AuthType.Master,
          data: {
            platform: Device.isiOS() ? 'ios' : 'android',
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? undefined : options.userId
          },
          timeout: options.timeout,
          client: this.client
        });
        return request.execute()
          .then(() => deviceId);
      })
      .then((deviceId) => {
        const user = User.getActiveUser(this.client);
        let _id = options.userId;

        if (isDefined(user)) {
          _id = user._id;
        }

        const request = new CacheRequest({
          method: RequestMethod.PUT,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `/${APP_DATA_NAMESPACE}/${this.client.appKey}/${DEVICE_COLLECTION}`
          }),
          data: {
            _id: _id,
            deviceId: deviceId
          },
          client: this.client
        });
        return request.execute()
          .then(() => deviceId);
      });
  }

  unregister(options = {}) {
    if (this.isSupported() === false) {
      return Promise.reject(
        new Error('Kinvey currently only supports push notifications on iOS and Android platforms.')
      );
    }

    const request = new CacheRequest({
      method: RequestMethod.GET,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this.pathname}/device`
      }),
      client: this.client
    });
    return request.execute()
      .then(response => response.data)
      .then((device) => {
        const user = User.getActiveUser(this.client);
        let deviceId;

        if (isDefined(device)) {
          deviceId = device.deviceId;
        }

        if (isDefined(deviceId) === false) {
          return null;
        }

        const request = new KinveyRequest({
          method: RequestMethod.POST,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this.pathname}/unregister-device`
          }),
          properties: options.properties,
          authType: user ? AuthType.Session : AuthType.Master,
          data: {
            platform: Device.isiOS() ? 'ios' : 'android',
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout,
          client: this.client
        });
        return request.execute()
          .then(response => response.data);
      })
      .then(() => {
        const user = User.getActiveUser(this.client);
        let _id = options.userId;

        if (isDefined(user)) {
          _id = user._id;
        }

        const request = new CacheRequest({
          method: RequestMethod.DELETE,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `/${APP_DATA_NAMESPACE}/${this.client.appKey}/${DEVICE_COLLECTION}/${_id}`
          }),
          client: this.client
        });

        return request.execute()
          .catch((error) => {
            if (error instanceof NotFoundError) {
              return {};
            }

            throw error;
          })
          .then(() => null);
      });
  }
}

// Export
export { Push };
export default new Push();
