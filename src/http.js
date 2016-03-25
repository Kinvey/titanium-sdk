/* global Titanium:false */
import Promise from 'kinvey-sdk-core/src/utils/promise';
import { KinveyMiddleware } from 'kinvey-sdk-core/src/rack/middleware';
import { Device } from 'kinvey-sdk-core/src/device';
import parseHeaders from 'parse-headers';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

/**
 * @private
 */
export class TitaniumHttpMiddleware extends KinveyMiddleware {
  constructor(name = 'Kinvey Titanium Http Middleware') {
    super(name);
  }

  isMobileWeb() {
    const device = new Device();
    return device.os.name === 'mobileweb';
  }

  handle(request) {
    return super.handle(request).then(() => {
      const promise = new Promise((resolve, reject) => {
        let xhr;

        if (this.isMobileWeb()) {
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

          if ((status >= 200 && status < 300) || status === 304) {
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
        xhr.open(request.method, request.url);

        // Set request headers
        for (const name in request.headers) {
          if (request.headers.hasOwnProperty(name)) {
            xhr.setRequestHeader(name, request.headers[name]);
          }
        }

        // Send request
        xhr.send(request.data);
      });

      return promise;
    });
  }
}
