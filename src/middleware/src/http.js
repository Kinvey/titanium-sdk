import { Middleware } from 'kinvey-node-sdk/dist/export';
import parseHeaders from 'parse-headers';
import isFunction from 'lodash/isFunction';
import pkg from 'package.json';
const defaultTimeout = process.env.KINVEY_TITANIUM_DEFAULT_TIMEOUT || 10000;

// Helper function to detect the browser name and version.
function browserDetect(ua) {
  // Cast arguments.
  ua = ua.toLowerCase();

  // User-Agent patterns.
  const rChrome = /(chrome)\/([\w]+)/;
  const rFirefox = /(firefox)\/([\w.]+)/;
  const rIE = /(msie) ([\w.]+)/i;
  const rOpera = /(opera)(?:.*version)?[/]([\w.]+)/;
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

export default class HttpMiddleware extends Middleware {
  constructor(name = 'Http Middleware') {
    super(name);
  }

  get deviceInformation() {
    return deviceInformation();
  }

  handle(request) {
    const promise = new Promise((resolve) => {
      const { url, method, headers, body, autoRedirect } = request;

      // Create an HTTP Client
      const client = Ti.Network.createHTTPClient();

      // Open the request
      client.open(method, url);

      // Add the X-Kinvey-Device-Information header
      headers['X-Kinvey-Device-Information'] = this.deviceInformation;

      // Set request headers
      const keys = Object.keys(headers);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        const key = keys[i];
        client.setRequestHeader(key, headers[key]);
      }

      // Set autoRedirect flag
      client.autoRedirect = autoRedirect || true;

      // Set the TLS version (iOS only)
      if (isFunction(client.setTlsVersion) && Ti.Network.TLS_VERSION_1_2) {
        client.setTlsVersion(Ti.Network.TLS_VERSION_1_2);
      }

      // Set timeout
      client.timeout = request.timeout || defaultTimeout;

      // onload listener
      client.onload = function onLoad() {
        resolve({
          response: {
            statusCode: this.status,
            headers: parseHeaders(this.allResponseHeaders),
            data: this.responseText
          }
        });
      };

      // onerror listener
      client.onerror = function onError() {
        resolve({
          response: {
            statusCode: this.status,
            headers: parseHeaders(this.allResponseHeaders),
            data: this.responseText
          }
        });
      };

      // Send request
      client.send(body);
    });

    // Return the promise
    return promise;
  }
}
