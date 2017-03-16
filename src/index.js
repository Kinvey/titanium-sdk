import Kinvey, { CacheRack, NetworkRack } from 'kinvey-js-sdk/dist/export';
import {
  CacheMiddleware,
  HttpMiddleware
} from './middleware';
import Push from './push';

// Setup racks
CacheRack.useCacheMiddleware(new CacheMiddleware());
NetworkRack.useHttpMiddleware(new HttpMiddleware());

// Add the Push module
Kinvey.Push = Push;

module.exports = Kinvey;
