import { XHRMiddleware } from 'kinvey-html5-sdk';
import { Promise } from 'es6-promise';
import { Device } from '../../../../device';
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import parseHeaders from 'parse-headers';
import isFunction from 'lodash/isFunction';

/**
 * @private
 */
export class HttpMiddleware extends XHRMiddleware {
  constructor(name = 'Titanium Http Middleware') {
    super(name);
  }

  async handle(request) {
    if (Device.isMobileWeb()) {
      return super.handle(request);
    }

    const { url, method, headers, body } = request;
    const xhr = Titanium.Network.createHTTPClient();
    xhr.autoRedirect = request.followRedirect || true;

    // Set the TLS version (iOS only)
    if (isFunction(xhr.setTlsVersion) && Titanium.Network.TLS_VERSION_1_2) {
      xhr.setTlsVersion(Titanium.Network.TLS_VERSION_1_2);
    }

    // Set request headers
    const names = Object.keys(headers);
    for (const name of names) {
      xhr.setRequestHeader(name, headers.get(name));
    }

    // Set timeout
    xhr.timeout = request.timeout || 0;

    return new Promise((resolve, reject) => {
      // Set success and failure callback
      xhr.onload = xhr.onerror = (e) => {
        const status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

        if (e.error) {
          return reject(e.error);
        }

        // Resolve
        return resolve({
          response: {
            statusCode: status,
            headers: parseHeaders(xhr.allResponseHeaders),
            data: xhr.responseText
          }
        });
      };

      // Open the request
      xhr.open(method, url);

      // Send request
      xhr.send(body);
    });
  }
}
