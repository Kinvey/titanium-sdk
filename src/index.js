import { Kinvey } from 'kinvey-javascript-sdk-core';
import { CacheRack, NetworkRack } from 'kinvey-javascript-sdk-core/build/rack/rack';
import { CacheMiddleware as CoreCacheMiddleware } from 'kinvey-javascript-sdk-core/build/rack/middleware/cache';
import { CacheMiddleware } from './cache';
import { SerializeMiddleware } from 'kinvey-javascript-sdk-core/build/rack/middleware/serialize';
import { HttpMiddleware } from './http';
import { Push } from './push';

// Swap Cache middleware
const cacheRack = CacheRack.sharedInstance();
cacheRack.swap(CoreCacheMiddleware, new CacheMiddleware());

// Add Http middleware
const networkRack = NetworkRack.sharedInstance();
networkRack.useAfter(SerializeMiddleware, new HttpMiddleware());

const _init = Kinvey.init;
Kinvey.init = (options) => {
  // Initialize Kinvey
  const client = _init(options);

  // Add Push module to Kinvey
  Kinvey.Push = new Push();

  // Return the client
  return client;
};

// Export
module.exports = Kinvey;
