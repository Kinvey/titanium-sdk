import Kinvey, { CacheRack, NetworkRack, User } from 'kinvey-js-sdk/dist/export';
import { CacheMiddleware, HttpMiddleware } from './middleware';
import Popup from './popup';
import Push from './push';

// Setup racks
CacheRack.useCacheMiddleware(new CacheMiddleware());
NetworkRack.useHttpMiddleware(new HttpMiddleware());

// Setup popup
User.usePopupClass(Popup);

// Add the Push module
Kinvey.Push = Push;

module.exports = Kinvey;
