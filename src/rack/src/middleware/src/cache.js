import { CacheMiddleware as Html5CacheMiddleware } from 'kinvey-html5-sdk';
import { DB } from './storage';
import { KinveyError } from 'kinvey-javascript-sdk-core';
const dbCache = {};

export class CacheMiddleware extends Html5CacheMiddleware {
  constructor(name = 'Titanium Cache Middleware') {
    super(name);
  }

  openDatabase(name) {
    if (!name) {
      throw new KinveyError('A name is required to open a database.');
    }

    let db = dbCache[name];

    if (!db) {
      db = new DB(name);
    }

    return db;
  }
}
