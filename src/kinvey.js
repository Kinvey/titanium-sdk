import Kinvey, { ParseMiddleware, SerializeMiddleware } from 'kinvey-js-sdk/dist/export';
import {
  CacheMiddleware,
  HttpMiddleware
} from './middleware';
import Push from './push';

// Setup racks
Kinvey.CacheRack.reset();
Kinvey.CacheRack.use(new CacheMiddleware());
Kinvey.NetworkRack.reset();
Kinvey.NetworkRack.use(new SerializeMiddleware());
Kinvey.NetworkRack.use(new HttpMiddleware());
Kinvey.NetworkRack.use(new ParseMiddleware());

// Add the Push module
Kinvey.Push = Push;

export default Kinvey;
