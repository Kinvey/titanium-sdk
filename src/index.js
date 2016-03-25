import { Kinvey } from 'kinvey-sdk-core';
import { CacheRack, NetworkRack } from 'kinvey-sdk-core/src/rack/rack';
import { CacheMiddleware as CoreCacheMiddleware } from 'kinvey-sdk-core/src/rack/middleware/cache';
import { CacheMiddleware } from './cache';
import { HttpMiddleware as CoreHttpMiddleware } from 'kinvey-sdk-core/src/rack/middleware/http';
import { HttpMiddleware } from './http';
import { Push } from './push';

// Replace Cache middleware
const cacheRack = CacheRack.sharedInstance();
cacheRack.swap(CoreCacheMiddleware, new CacheMiddleware());

// Replace Http middleware
const networkRack = NetworkRack.sharedInstance();
networkRack.swap(CoreHttpMiddleware, new HttpMiddleware());

// Add Push module
Kinvey.Push = Push;

// Export
module.exports = Kinvey;
