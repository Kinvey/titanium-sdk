import packageJSON from '../package.json';

export class Device {
  static isiOS() {
    return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
  }

  static isAndroid() {
    return Titanium.Platform.osname === 'android';
  }

  static isMobileWeb() {
    return Titanium.Platform.name === 'mobileweb';
  }

  static toJSON() {
    return {
      device: {
        manufacturer: Titanium.Platform.manufacturer,
        model: Titanium.Platfrom.model
      },
      platform: {
        name: 'titanium',
        version: Titanium.getVersion()
      },
      os: {
        name: Titanium.Platfrom.osname,
        version: Titanium.Platfrom.version
      },
      kinveySDK: {
        name: packageJSON.name,
        version: packageJSON.version
      }
    };
  }
}
