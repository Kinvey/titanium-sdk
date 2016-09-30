import pkg from '../package.json';

// export function isTitanium() {
//   return typeof Titanium !== 'undefined';
// }

// export function isiOS() {
//   if (isTitanium()) {
//     return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
//   }

//   return /iPad|iPhone|iPod/.test(global.navigator.userAgent) && !window.MSStream;
// }

// export function isAndroid() {
//   if (isTitanium()) {
//     return Titanium.Platform.osname === 'android';
//   }

//   return /Android/.test(global.navigator.userAgent);
// }

// export function isBrowser() {
//   if (isTitanium()) {
//     return Titanium.Platform.name === 'mobileweb';
//   }

//   return !isiOS() && !isAndroid();
// }

// Helper function to detect the browser name and version.
function browserDetect(ua) {
  // Cast arguments.
  ua = ua.toLowerCase();

  // User-Agent patterns.
  const rChrome = /(chrome)\/([\w]+)/;
  const rFirefox = /(firefox)\/([\w.]+)/;
  const rIE = /(msie) ([\w.]+)/i;
  const rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
  const rSafari = /(safari)\/([\w.]+)/;

  return rChrome.exec(ua) || rFirefox.exec(ua) || rIE.exec(ua) ||
    rOpera.exec(ua) || rSafari.exec(ua) || [];
}

function deviceInformation() {
  const id = global.Titanium.Platform.getId();
  let browser;
  let platform;
  let version;
  let manufacturer;
  const libraries = [];

  // Platforms.
  libraries.push(`titanium/${global.Titanium.getVersion()}`);

  // If mobileweb, extract browser information.
  if (global.Titanium.Platform.getName() === 'mobileweb') {
    browser = browserDetect(global.Titanium.Platform.getModel());
    platform = browser[1];
    version = browser[2];
    manufacturer = global.Titanium.Platform.getOstype();
  } else {
    platform = global.Titanium.Platform.getOsname();
    version = global.Titanium.Platform.getVersion();
    manufacturer = global.Titanium.Platform.getManufacturer();
  }

  // Return the device information string.
  const parts = [`js-${pkg.name}/${pkg.version}`];

  if (libraries.length !== 0) { // Add external library information.
    parts.push(`(${libraries.sort().join(', ')})`);
  }

  return parts.concat([platform, version, manufacturer, id]).map(part => {
    if (part) {
      return part.toString().replace(/\s/g, '_').toLowerCase();
    }

    return 'unknown';
  }).join(' ');
}

export default class Device {
  static toString() {
    return deviceInformation();
  }
}
