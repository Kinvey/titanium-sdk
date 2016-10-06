import { AuthType, RequestMethod } from 'kinvey-node-sdk/dist/request';
import CacheReqeust from 'kinvey-node-sdk/dist/request/src/cacherequest';
import KinveyRequest from 'kinvey-node-sdk/dist/request/src/kinveyrequest';
import { Client } from 'kinvey-node-sdk/dist/client';
import { User } from 'kinvey-node-sdk/dist/entity';
import { EventEmitter } from 'events';
import Device from './device';
import Promise from 'es6-promise';
import url from 'url';
import bind from 'lodash/bind';
const pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
const notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';

export default class Push extends EventEmitter {
  constructor(options = {}) {
    super();
    this.client = options.client || Client.sharedInstance();
  }

  get pathname() {
    return `/${pushNamespace}/${this.client.appKey}`;
  }

  get client() {
    return this._client;
  }

  set client(client) {
    if (typeof client === 'undefined') {
      throw new Error('Kinvey.Push must have a client defined.');
    }

    this._client = client;
  }

  isSupported() {
    return Device.isiOS() || Device.isAndroid();
  }

  onNotification(listener) {
    return this.on(notificationEvent, listener);
  }

  onceNotification(listener) {
    return this.once(notificationEvent, listener);
  }

  register(options = {}) {
    if (this.isSupported() === false) {
      return Promise.reject(
        new Error('Kinvey currently only supports push notifications on iOS and Android platforms.')
      );
    }

    return this.unregister()
      .catch(() => null)
      .then(() => {
        return new Promise((resolve, reject) => {
          const notificationListener = bind((data) => {
            this.emit(notificationEvent, data);
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
            CloudPush.retrieveDeviceToken({
              success(e) {
                resolve(e.deviceToken);
              },
              error(e) {
                reject(new Error('An error occurred registering this device for'
                  + ' push notifications.', e));
              }
            });
          }
        });
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
          .then(response => response.data)
          .then((data) => {
            const request = new CacheReqeust({
              method: RequestMethod.PUT,
              url: url.format({
                protocol: this.client.protocol,
                host: this.client.host,
                pathname: `${this.pathname}/device`
              }),
              data: {
                deviceId: deviceId
              },
              client: this.client
            });
            return request.execute()
              .then(() => data);
          });
      });
  }

  unregister(options = {}) {
    if (this.isSupported() === false) {
      return Promise.reject(
        new Error('Kinvey currently only supports push notifications on iOS and Android platforms.')
      );
    }

    const request = new CacheReqeust({
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
      .then(({ deviceId }) => {
        if (typeof deviceId === 'undefined') {
          throw new Error('This device has not been registered for push notifications.');
        }

        const user = User.getActiveUser(this.client);
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
      .then((data) => {
        const request = new CacheReqeust({
          method: RequestMethod.DELETE,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this.pathname}/device`
          }),
          client: this.client
        });
        return request.execute()
          .then(() => data);
      });
  }
}
