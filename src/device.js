import pkg from '../package.json';

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
  const id = Ti.Platform.getId();
  let browser;
  let platform;
  let version;
  let manufacturer;
  const libraries = [];

  // Platforms.
  libraries.push(`titanium/${Ti.getVersion()}`);

  // If mobileweb, extract browser information.
  if (Ti.Platform.getName() === 'mobileweb') {
    browser = browserDetect(Ti.Platform.getModel());
    platform = browser[1];
    version = browser[2];
    manufacturer = Ti.Platform.getOstype();
  } else {
    platform = Ti.Platform.getOsname();
    version = Ti.Platform.getVersion();
    manufacturer = Ti.Platform.getManufacturer();
  }

  // Return the device information string.
  const parts = [`js-${pkg.name}/${pkg.version}`];

  if (libraries.length !== 0) { // Add external library information.
    parts.push(`(${libraries.sort().join(', ')})`);
  }

  return parts.concat([platform, version, manufacturer, id]).map((part) => {
    if (part) {
      return part.toString().replace(/\s/g, '_').toLowerCase();
    }

    return 'unknown';
  }).join(' ');
}

export default class Device {
  static isAndroid() {
    return Ti.Platform.osname === 'android';
  }

  static isiOS() {
    return Device.isiPhone() || Device.isiPad();
  }

  static isiPhone() {
    return Ti.Platform.osname === 'iphone';
  }

  static isiPad() {
    return Ti.Platform.osname === 'ipad';
  }

  static toString() {
    return deviceInformation();
  }
}
