import { KinveyMiddleware } from 'kinvey-javascript-sdk-core/dist/rack/middleware';
import { Promise } from 'es6-promise';
import { Device } from './device';
import parseHeaders from 'parse-headers';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

/**
 * @private
 */
export class HttpMiddleware extends KinveyMiddleware {
  constructor(name = 'Kinvey Titanium Http Middleware') {
    super(name);
  }

  async handle(request) {
    // Call super
    await super.handle(request);

    const { url, method, headers, body } = request;
    let xhr;

    return new Promise((resolve, reject) => {
      if (Device.isMobileWeb()) {
        xhr = new XMLHttpRequest();

        xhr.ontimeout = function() {
          reject(new Error('timeout'));
        };
      } else {
        xhr = Titanium.Network.createHTTPClient();
        xhr.autoRedirect = request.followRedirect || true;

        // Set the TLS version (iOS only)
        if (isFunction(xhr.setTlsVersion) && Titanium.Network.TLS_VERSION_1_2) {
          xhr.setTlsVersion(Titanium.Network.TLS_VERSION_1_2);
        }
      }

      // Set timeout
      // xhr.timeout = request.timeout || 0;

      // Set success and failure callback
      xhr.onload = xhr.onerror = (e) => {
        const status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

        if (isString(e.error) && e.error.toLowerCase().indexOf('timed out') !== -1) {
          e.type = 'timeout';
        }

        if ((status >= 200 && status < 300)
          || status === 302
          || status === 304) {
          request.response = {
            statusCode: status,
            headers: parseHeaders(xhr.allResponseHeaders),
            data: xhr.responseText
          };

          return resolve(request);
        }

        return reject(e.error);
      };

      // Open the request
      xhr.open(method, url);

      // Set request headers
      const names = Object.keys(headers.toJSON());
      for (const name of names) {
        xhr.setRequestHeader(name, headers.get(name));
      }

      // Send request
      xhr.send(body);
    });
  }
}
