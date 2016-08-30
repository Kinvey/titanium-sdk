import { KinveyMiddleware } from 'kinvey-javascript-sdk-core/dist/rack/middleware';
import { Promise } from 'es6-promise';
import { Device } from './device';
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import parseHeaders from 'parse-headers';
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

      // Set request headers
      const names = Object.keys(headers.toJSON());
      for (const name of names) {
        xhr.setRequestHeader(name, headers.get(name));
      }

      // Set timeout
      xhr.timeout = request.timeout || 0;

      // Set success and failure callback
      xhr.onload = xhr.onerror = (e) => {
        const status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

        if (e.error) {
          return reject(e.error);
        }

        // Set the response for the request
        request.response = {
          statusCode: status,
          headers: parseHeaders(xhr.allResponseHeaders),
          data: xhr.responseText
        };

        // Resolve
        return resolve(request);
      };

      // Open the request
      xhr.open(method, url);

      // Send request
      xhr.send(body);
    });
  }
}
