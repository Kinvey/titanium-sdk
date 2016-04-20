import Promise from 'babybird';
import { KinveyError, NotFoundError } from 'kinvey-javascript-sdk-core/build/errors';
import { EventEmitter } from 'events';
import { NetworkRequest } from 'kinvey-javascript-sdk-core/build/requests/network';
import { DataStore, DataStoreType } from 'kinvey-javascript-sdk-core/build/stores/datastore';
import { HttpMethod, AuthType } from 'kinvey-javascript-sdk-core/build/enums';
import { User } from 'kinvey-javascript-sdk-core/build/user';
import { Client } from 'kinvey-javascript-sdk-core/build/client';
import { Query } from 'kinvey-javascript-sdk-core/build/query';
import { isiOS, isAndroid } from './utils';
import assign from 'lodash/assign';
import url from 'url';
import bind from 'lodash/bind';
import map from 'lodash/map';
const pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
const notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
const deviceCollectionName = process.env.KINVEY_DEVICE_COLLECTION_NAME || 'kinvey_device';
const idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';
let notificationEventListener;

export class Push extends EventEmitter {
  constructor() {
    super();

    this.client = Client.sharedInstance();
    notificationEventListener = bind(this.notificationListener, this);
    const pushOptions = this.client.push;

    if (isiOS()) {
      const version = Titanium.Platfrom.version;
      if (version.split('.')[0] >= 8) {
        Titanium.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
          Titanium.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
          Titanium.Network.registerForPushNotifications({
            callback: notificationEventListener
          });
        });

        const types = [];

        if (pushOptions.ios.alert) {
          types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_ALERT);
        }

        if (pushOptions.ios.badge) {
          types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_BADGE);
        }

        if (pushOptions.ios.sound) {
          types.push(Titanium.App.iOS.USER_NOTIFICATION_TYPE_SOUND);
        }

        Titanium.App.iOS.registerUserNotificationSettings({
          types: types
        });
      } else {
        const types = [];

        if (pushOptions.ios.alert) {
          types.push(Titanium.Network.NOTIFICATION_TYPE_ALERT);
        }

        if (pushOptions.ios.badge) {
          types.push(Titanium.Network.NOTIFICATION_TYPE_BADGE);
        }

        if (pushOptions.ios.sound) {
          types.push(Titanium.Network.NOTIFICATION_TYPE_SOUND);
        }

        Titanium.Network.registerForPushNotifications({
          types: types,
          callback: notificationEventListener
        });
      }
    } else if (isAndroid()) {
      CloudPush.addEventListener('callback', notificationEventListener);
    }
  }

  get _pathname() {
    return `/${pushNamespace}/${this.client.appKey}`;
  }

  get client() {
    return this._client;
  }

  set client(client) {
    if (!client) {
      throw new KinveyError('Kinvey.Push much have a client defined.');
    }

    this._client = client;
  }

  isSupported() {
    return isiOS() || isAndroid();
  }

  onNotification(listener) {
    return this.on(notificationEvent, listener);
  }

  onceNotification(listener) {
    return this.once(notificationEvent, listener);
  }

  notificationListener(data) {
    this.emit(notificationEvent, data);
  }

  register(options = {}) {
    if (!this.isSupported()) {
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
              callback: notificationEventListener
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
            types: types,
            success(e) {
              resolve(e.deviceToken);
            },
            error(e) {
              reject(new KinveyError('An error occurred registering this device for ' +
                'push notifications.', e));
            },
            callback: notificationEventListener
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
      }
    }).then(deviceId => {
      if (!deviceId) {
        throw new KinveyError('Unable to retrieve the device id to register this device for push notifications.');
      }

      const store = DataStore.getInstance(deviceCollectionName, DataStoreType.Sync);
      store.client = this.client;
      store.disableSync();
      return store.findById(deviceId).catch(error => {
        if (error instanceof NotFoundError) {
          return undefined;
        }

        throw error;
      }).then(entity => {
        if (entity && options.force !== true) {
          return entity;
        }

        const user = User.getActiveUser(this.client);
        const request = new NetworkRequest({
          method: HttpMethod.POST,
          authType: user ? AuthType.Session : AuthType.Master,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this._pathname}/register-device`
          }),
          properties: options.properties,
          data: {
            platform: Titanium.Platfrom.osname.toLowerCase(),
            framework: 'titanium',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout,
          client: this.client
        });
        return request.execute();
      }).then(() => store.save({ _id: deviceId, registered: true }));
    }).then(() => {
      this.client.push = options;
    });

    return promise;
  }

  unregister(options = {}) {
    if (!this.isSupported()) {
      return Promise.reject(new KinveyError('Kinvey currently only supports ' +
        'push notifications on iOS and Android platforms.'));
    }

    const store = DataStore.getInstance(deviceCollectionName, DataStoreType.Sync);
    store.client = this.client;
    store.disableSync();
    const query = new Query();
    query.equalsTo('registered', true);
    const promise = store.find(query).then(entities => {
      if (!entities.length === 0) {
        throw new KinveyError('This device has not been registered for push notifications.');
      }

      const user = User.getActiveUser(this.client);
      const promises = map(entities, entity => {
        const deviceId = entity[idAttribute];
        const request = new NetworkRequest({
          method: HttpMethod.POST,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this._pathname}/unregister-device`
          }),
          properties: options.properties,
          authType: user ? AuthType.Session : AuthType.Master,
          data: {
            platform: global.device.platform.toLowerCase(),
            framework: 'phonegap',
            deviceId: deviceId,
            userId: user ? null : options.userId
          },
          timeout: options.timeout,
          client: this.client
        });
        return request.execute().then(() => store.removeById(deviceId));
      });
      return Promise.all(promises);
    }).then(() => {
      if (isAndroid()) {
        CloudPush.removeEventListener('callback', notificationEventListener);
      }

      this.client.push = null;
    });

    return promise;
  }
};
