import packageJSON from '../package.json';

export function isTitanium() {
  return typeof Titanium !== 'undefined';
}

export function isiOS() {
  if (isTitanium()) {
    return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
  }

  return /iPad|iPhone|iPod/.test(global.navigator.userAgent) && !window.MSStream;
}

export function isAndroid() {
  if (isTitanium()) {
    return Titanium.Platform.osname === 'android';
  }

  return /Android/.test(global.navigator.userAgent);
}

export function isBrowser() {
  if (isTitanium()) {
    return Titanium.Platform.name === 'mobileweb';
  }

  return !isiOS() && !isAndroid();
}

/**
 * @private
 */
export class Device {
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
