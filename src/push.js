import { KinveyError, NetworkRequest, AuthType, RequestMethod, User, Client } from 'kinvey-javascript-sdk-core';
import { EventEmitter } from 'events';
import { Device } from './device';
import { Promise } from 'es6-promise';
import url from 'url';
import bind from 'lodash/bind';
const pushNamespace = process.env.KINVEY_PUSH_NAMESPACE || 'push';
const notificationEvent = process.env.KINVEY_NOTIFICATION_EVENT || 'notification';
const pushSettingsFilename = process.env.KINVEY_PUSH_SETTINGS_FILE_NAME || 'kinvey_pushSettings.txt';
const deviceIdFilename = process.env.KINVEY_PUSH_SETTINGS_FILE_NAME || 'kinvey_deviceId.txt';
let notificationEventListener;

export class Push extends EventEmitter {
  constructor() {
    super();

    this.client = Client.sharedInstance();
    notificationEventListener = bind(this.notificationListener, this);

    try {
      const pushSettingsFile = Titanium.Filesystem.getFile(
        Titanium.Filesystem.applicationDataDirectory,
        pushSettingsFilename
      );
      const pushSettings = JSON.parse(pushSettingsFile.read().text);

      if (pushSettings) {
        this.register(pushSettings);
      }
    } catch (Error) {
      // Catch any errors
    }
  }

  get pathname() {
    return `/${pushNamespace}/${this.client.appKey}`;
  }

  get client() {
    return this.pushClient;
  }

  set client(client) {
    if (!client) {
      throw new KinveyError('Kinvey.Push much have a client defined.');
    }

    this.pushClient = client;
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

  notificationListener(data) {
    this.emit(notificationEvent, data);
  }

  async register(options = {}) {
    if (!this.isSupported()) {
      throw new KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');
    }

    let promise = this.unregister().catch(() => null);
    promise = promise.then(() => {
      const promise = new Promise((resolve, reject) => {
        if (Device.isiOS()) {
          const version = Titanium.Platfrom.version;
          if (version.split('.')[0] >= 8) {
            Titanium.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
              Titanium.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
              Titanium.Network.registerForPushNotifications({
                success(e) {
                  resolve(e.deviceToken);
                },
                error(e) {
                  reject(new KinveyError('An error occurred registering this device'
                    + ' for push notifications.', e));
                },
                callback: notificationEventListener
              });
            });

            const types = [];

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
            const types = [];

            if (options.ios) {
              if (options.ios.alert) {
                types.push(Titanium.Network.NOTIFICATION_TYPE_ALERT);
              }

              if (options.ios.badge) {
                types.push(Titanium.Network.NOTIFICATION_TYPE_BADGE);
              }

              if (options.ios.sound) {
                types.push(Titanium.Network.NOTIFICATION_TYPE_SOUND);
              }
            }

            Titanium.Network.registerForPushNotifications({
              types: types,
              success(e) {
                resolve(e.deviceToken);
              },
              error(e) {
                reject(new KinveyError('An error occurred registering this device for push notifications.', e));
              },
              callback: notificationEventListener
            });
          }
        } else if (Device.isAndroid()) {
          CloudPush.retrieveDeviceToken({
            success(e) {
              resolve(e.deviceToken);
            },
            error(e) {
              reject(new KinveyError('An error occurred registering this device for'
                + ' push notifications.', e));
            }
          });
        }
      });
      return promise;
    }).then(deviceId => {
      if (!deviceId) {
        throw new KinveyError('Unable to retrieve the device id to register this device for push notifications.');
      }

      const user = User.getActiveUser(this.client);
      const request = new NetworkRequest({
        method: RequestMethod.POST,
        url: url.format({
          protocol: this.client.protocol,
          host: this.client.host,
          pathname: `${this.pathname}/register-device`
        }),
        properties: options.properties,
        authType: user ? AuthType.Session : AuthType.Master,
        data: {
          platform: global.device.platform.toLowerCase(),
          framework: 'phonegap',
          deviceId: deviceId,
          userId: user ? undefined : options.userId
        },
        timeout: options.timeout,
        client: this.client
      });
      return request.execute()
        .then(response => {
          const deviceIdFile = Titanium.Filesystem.getFile(
            Titanium.Filesystem.applicationDataDirectory,
            deviceIdFilename
          );
          deviceIdFile.write(JSON.stringify(deviceId));

          const pushSettingsFile = Titanium.Filesystem.getFile(
            Titanium.Filesystem.applicationDataDirectory,
            pushSettingsFilename
          );
          pushSettingsFile.write(JSON.stringify(options));
          return response.data;
        });
    });

    return promise;
  }

  async unregister(options = {}) {
    if (!this.isSupported()) {
      throw new KinveyError('Kinvey currently only supports push notifications on iOS and Android platforms.');
    }

    const promise = Promise.resolve()
      .then(() => {
        const deviceIdFile = Titanium.Filesystem.getFile(
          Titanium.Filesystem.applicationDataDirectory,
          deviceIdFilename
        );
        return JSON.parse(deviceIdFile.read().text);
      })
      .then(deviceId => {
        if (!deviceId) {
          throw new KinveyError('This device has not been registered for push notifications.');
        }

        const user = User.getActiveUser(this.client);
        const request = new NetworkRequest({
          method: RequestMethod.POST,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this.pathname}/unregister-device`
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
        return request.execute();
      })
      .then(response => {
        if (Device.isAndroid()) {
          CloudPush.removeEventListener('callback', notificationEventListener);
        }

        const deviceIdFile = Titanium.Filesystem.getFile(
          Titanium.Filesystem.applicationDataDirectory,
          deviceIdFilename
        );
        deviceIdFile.deleteFile();

        const pushSettingsFile = Titanium.Filesystem.getFile(
          Titanium.Filesystem.applicationDataDirectory,
          pushSettingsFilename
        );
        pushSettingsFile.deleteFile();

        return response.data;
      });

    return promise;
  }
}
