import { CacheRequest, NetworkRequest } from 'kinvey-javascript-sdk-core';
import { Kinvey as Html5Kinvey } from 'kinvey-html5-sdk';
import {
  CacheRack,
  NetworkRack,
  CacheMiddleware,
  HttpMiddleware
} from './rack';
import { Device } from './device';
import { Popup } from './popup';
import { Push } from './push';
import { Promise } from 'es6-promise';

// Extend the Html5Kinvey class
export class Kinvey extends Html5Kinvey {
  static init(options) {
    // Initialize Kinvey
    const client = super.init(options);

    // Add Push module to Kinvey
    this.Push = new Push();

    // Return the client
    return client;
  }
}

// Set CacheRequest rack
CacheRequest.rack = new CacheRack();

// Set NetworkRequest rack
NetworkRequest.rack = new NetworkRack();

// Add modules
Kinvey.Device = Device;
Kinvey.Popup = Popup;
Kinvey.Promise = Promise;
Kinvey.CacheMiddleware = CacheMiddleware;
Kinvey.HttpMiddleware = HttpMiddleware;
