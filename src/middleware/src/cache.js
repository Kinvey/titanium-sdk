import CoreCacheMiddleware from 'kinvey-node-sdk/dist/request/src/middleware/src/cache';
import Storage from './storage';

export default class CacheMiddleware extends CoreCacheMiddleware {
  openStorage(name) {
    return new Storage(name);
  }
}
