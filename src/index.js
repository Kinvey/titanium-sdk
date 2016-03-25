import { Kinvey } from 'kinvey-sdk-core';
import { CacheRack, NetworkRack } from 'kinvey-sdk-core/src/rack/rack';
import { CacheMiddleware } from 'kinvey-sdk-core/src/rack/middleware/cache';
import { TitaniumCacheMiddleware } from './cache';
import { SerializeMiddleware } from 'kinvey-sdk-core/src/rack/middleware/serialize';
import { TitaniumHttpMiddleware } from './http';
import { Push } from './push';

// Replace Cache middleware
const cacheRack = CacheRack.sharedInstance();
cacheRack.swap(CacheMiddleware, new TitaniumCacheMiddleware());

// Replace Http middleware
const networkRack = NetworkRack.sharedInstance();
networkRack.useAfter(SerializeMiddleware, new TitaniumHttpMiddleware());

// Add Push module
Kinvey.Push = Push;

// Export
module.exports = Kinvey;
