import Rack from 'kinvey-node-sdk/dist/rack';
import SerializeMiddleware from 'kinvey-node-sdk/dist/rack/src/serialize';
import ParseMiddleware from 'kinvey-node-sdk/dist/rack/src/parse';
import CacheMiddleware from './cache';
import HttpMiddleware from './http';

export class CacheRack extends Rack {
  constructor(name = 'Cache Rack') {
    super(name);
    this.use(new CacheMiddleware());
  }
}

export class NetworkRack extends Rack {
  constructor(name = 'Network Rack') {
    super(name);
    this.use(new SerializeMiddleware());
    this.use(new HttpMiddleware());
    this.use(new ParseMiddleware());
  }
}
