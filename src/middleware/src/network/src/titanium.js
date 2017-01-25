import Promise from 'es6-promise';
import parseHeaders from 'parse-headers';
import isFunction from 'lodash/isFunction';
const defaultTimeout = process.env.KINVEY_TITANIUM_DEFAULT_TIMEOUT || 10000;

export default class TitaniumHttp {
  handle(request) {
    const promise = new Promise((resolve, reject) => {
      const { url, method, headers, body, autoRedirect } = request;

      // Create an HTTP Client
      const client = Ti.Network.createHTTPClient();

      // Open the request
      client.open(method, url);

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

  static isSupported() {
    return typeof Ti !== 'undefined' && typeof Ti.Network !== 'undefined';
  }
}
