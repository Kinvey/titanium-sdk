import { KinveyMiddleware } from 'kinvey-javascript-sdk-core/src/rack/middleware';
import { HttpMethod, StatusCode } from 'kinvey-javascript-sdk-core/src/enums';
import { DB, DBAdapter } from './db';

/**
 * @private
 */
export class CacheMiddleware extends KinveyMiddleware {
  constructor(name = 'Kinvey Titanium Cache Middleware', adapters = [DBAdapter.TitaniumDB, DBAdapter.Memory]) {
    super(name, adapters);
  }

  handle(request) {
    return super.handle(request).then(({ appKey, collection, id }) => {
      const method = request.method;
      const query = request.query;
      const data = request.data;
      const db = new DB(appKey, this.adapters);
      let promise;

      if (method === HttpMethod.GET) {
        if (id) {
          if (id === '_count') {
            promise = db.count(collection, query);
          } else if (id === '_group') {
            promise = db.group(collection, data);
          } else {
            promise = db.findById(collection, id);
          }
        } else {
          promise = db.find(collection, query);
        }
      } else if (method === HttpMethod.POST || method === HttpMethod.PUT) {
        promise = db.save(collection, data);
      } else if (method === HttpMethod.DELETE) {
        if (id) {
          promise = db.removeById(collection, id);
        } else {
          promise = db.remove(collection, query);
        }
      }

      return promise.then(result => {
        let statusCode = StatusCode.Ok;

        if (method === HttpMethod.POST) {
          statusCode = StatusCode.Created;
        }

        request.response = {
          statusCode: statusCode,
          headers: {},
          data: result
        };

        return request;
      });
    });
  }
}
