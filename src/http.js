/* global Titanium:false */
import { KinveyMiddleware } from 'kinvey-sdk-core/src/rack/middleware';
import { HttpMethod } from 'kinvey-sdk-core/src/enums';
import { NetworkConnectionError } from 'kinvey-sdk-core/src/errors';
import { Device } from 'kinvey-sdk-core/src/device';
import http from 'request';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

/**
 * @private
 */
export class HttpMiddleware extends KinveyMiddleware {
  constructor(name = 'Kinvey Titanium Http Middleware') {
    super(name);
  }

  isMobileWeb() {
    const device = new Device();
    return device.os.name === 'mobileweb';
  }

  handle(request) {
    return super.handle(request).then(() => {
      const options = {
        url: request.url,
        method: request.method,
        headers: request.headers,
        qs: {},
        followRedirect: request.followRedirect
      };

      if (request.query) {
        const query = result(request.query, 'toJSON', request.query);
        options.qs.query = query.filter;

        if (!isEmpty(query.fields)) {
          options.qs.fields = query.fields.join(',');
        }

        if (query.limit) {
          options.qs.limit = query.limit;
        }

        if (query.skip > 0) {
          options.qs.skip = query.skip;
        }

        if (!isEmpty(query.sort)) {
          options.qs.sort = query.sort;
        }
      }

      for (const key in options.qs) {
        if (options.qs.hasOwnProperty(key)) {
          options.qs[key] = isString(options.qs[key]) ? options.qs[key] : JSON.stringify(options.qs[key]);
        }
      }

      if (request.data && (request.method === HttpMethod.PATCH ||
                           request.method === HttpMethod.POST ||
                           request.method === HttpMethod.PUT)) {
        options.body = request.data;
      }

      if (this.isMobileWeb()) {
        return new Promise((resolve, reject) => {
          http(options, (err, response, body) => {
            if (err) {
              if (err.code === 'ENOTFOUND') {
                return reject(new NetworkConnectionError('It looks like you do not have a network connection. ' +
                  'Please check that you are connected to a network and try again.'));
              }

              return reject(err);
            }

            request.response = {
              statusCode: response.statusCode,
              headers: response.headers,
              data: body
            };

            return resolve(request);
          });
        });
      }

      return new Promise((resolve, reject) => {
        const httpClient = Titanium.Network.createHTTPClient();

        // Set the TLS version (iOS only)
        if (isFunction(httpClient.setTlsVersion) && Titanium.Network.TLS_VERSION_1_2) {
          httpClient.setTlsVersion(Titanium.Network.TLS_VERSION_1_2);
        }

        // Set success and failure callback
        httpClient.onLoad = httpClient.onError = (e) => {
          const status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : httpClient.status;

          if (isString(e.error) && e.error.toLowerCase().indexOf('timed out') !== -1) {
            e.type = 'timeout';
          }

          if ((status >= 200 && status < 300) || status === 304) {
            request.response = {
              statusCode: status,
              headers: httpClient.allResponseHeaders,
              data: httpClient.responseText
            };

            return resolve(request);
          }

          return reject(e.error);
        };

        // Open the request
        httpClient.open(request.method, request.url);

        // Set request headers
        for (const name in request.headers) {
          if (request.headers.hasOwnProperty(name)) {
            httpClient.setRequestHeader(name, request.headers[name]);
          }
        }

        // Send request data
        if (request.data && (request.method === HttpMethod.PATCH ||
                           request.method === HttpMethod.POST ||
                           request.method === HttpMethod.PUT)) {
          httpClient.send(request.data);
        }
      });
    });
  }
}
