import { KinveyError } from 'kinvey-javascript-sdk-core/src/errors';
import { EventEmitter } from 'events';
import { NetworkRequest } from 'kinvey-javascript-sdk-core/src/requests/network';
import { DataStore, DataStoreType } from 'kinvey-javascript-sdk-core/src/stores/datastore';
import { HttpMethod, AuthType } from 'kinvey-javascript-sdk-core/src/enums';
import { User } from 'kinvey-javascript-sdk-core/src/user';
import { Client } from 'kinvey-javascript-sdk-core/src/client';
import { Query } from 'kinvey-javascript-sdk-core/src/query';
import { isiOS, isAndroid } from './utils';
import assign from 'lodash/assign';
import url from 'url';
const pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
const notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
const deviceCollectionName = process.env.KINVEY_DEVICE_COLLECTION_NAME || 'kinvey_device';
const emitter = new EventEmitter();

export const Push = {
  listeners() {
    return emitter.listeners(notificationEvent);
  },

  onNotification(listener) {
    return emitter.on(notificationEvent, listener);
  },

  onceNotification(listener) {
    return emitter.once(notificationEvent, listener);
  },

  removeListener(listener) {
    return emitter.removeListener(notificationEvent, listener);
  },

  removeAllListeners() {
    return emitter.removeAllListeners(notificationEvent);
  },

  init(options = {}) {
    if (!isiOS() || !isAndroid()) {
      return Promise.reject(new KinveyError('Kinvey currently only supports ' +
        'push notifications on iOS and Android platforms.'));
    }

    options = assign({
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

    const promise = new Promise((resolve, reject) => {
      if (isiOS()) {
        const version = Titanium.Platfrom.version;
        if (version.split('.')[0] >= 8) {
          Titanium.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
            Titanium.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
            Titanium.Network.registerForPushNotifications({
              success(e) {
                resolve(e.deviceToken);
              },
              error(e) {
                reject(new KinveyError('An error occurred registering this device ' +
                  'for push notifications.', e));
              },
              callback(data) {
                Push.emit(notificationEvent, data);
              }
            });
          });

          const types = [];

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
          const types = [];

          if (options.ios.alert) {
            types.push(Titanium.Network.NOTIFICATION_TYPE_ALERT);
          }

          if (options.ios.badge) {
            types.push(Titanium.Network.NOTIFICATION_TYPE_BADGE);
          }

          if (options.ios.sound) {
            types.push(Titanium.Network.NOTIFICATION_TYPE_SOUND);
          }

          Titanium.Network.registerForPushNotifications({
            types: [
              Titanium.Network.NOTIFICATION_TYPE_ALERT,
              Titanium.Network.NOTIFICATION_TYPE_SOUND,
              Titanium.Network.NOTIFICATION_TYPE_BADGE
            ],
            success(e) {
              resolve(e.deviceToken);
            },
            error(e) {
              reject(new KinveyError('An error occurred registering this device for ' +
                'push notifications.', e));
            },
            callback(data) {
              Push.emit(notificationEvent, data);
            }
          });
        }
      } else if (isAndroid()) {
        CloudPush.retrieveDeviceToken({
          success(e) {
            resolve(e.deviceToken);
          },
          error(e) {
            reject(new KinveyError('An error occurred registering this device for ' +
              'push notifications.', e));
          }
        });

        CloudPush.addEventListener('callback', data => {
          Push.emit(notificationEvent, data);
        });
      }
    }).then(deviceId => {
      if (!deviceId) {
        throw new KinveyError('Unable to retrieve the device id to register this device for push notifications.');
      }

      const store = DataStore.getInstance(deviceCollectionName, DataStoreType.Sync);
      return store.findById(deviceId).then(entity => {
        if (options.force !== true && entity.registered) {
          throw new KinveyError('Device is already registered. To force registration ' +
            'please set options.force to true.');
        }
      }).then(() => {
        const user = User.getActiveUser();
        const client = Client.sharedInstance();
        const request = new NetworkRequest({
          method: HttpMethod.POST,
          authType: user ? AuthType.Session : AuthType.Master,
          url: url.format({
            protocol: client.protocol,
            host: client.host,
            pathname: `/${pushNamespace}/${client.appKey}/register-device`
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
      }).then(response => store.save({ _id: deviceId, registered: true }).then(() => response.data));
    });

    return promise;
  },

  unregister(options = {}) {
    if (!isiOS() || !isAndroid()) {
      return Promise.reject(new KinveyError('Kinvey currently only supports ' +
        'push notifications on iOS and Android platforms.'));
    }

    const store = DataStore.getInstance(deviceCollectionName, DataStoreType.Sync);
    const query = new Query();
    query.equalsTo('registered', true);
    const promise = store.find(query).then(data => {
      if (data.length === 1) {
        return data[0]._id;
      }

      return undefined;
    }).then(deviceId => {
      if (!deviceId) {
        throw new KinveyError('This device has not been registered.');
      }

      const user = User.getActiveUser();
      const client = Client.sharedInstance();
      const request = new NetworkRequest({
        method: HttpMethod.POST,
        authType: user ? AuthType.Session : AuthType.Master,
        url: url.format({
          protocol: client.protocol,
          host: client.host,
          pathname: `/${pushNamespace}/${client.appKey}/unregister-device`
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
      return request.execute().then(response => store.removeById(deviceId).then(() => response.data));
    });

    return promise;
  }
};
