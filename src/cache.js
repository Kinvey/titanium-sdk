import {
  CacheMiddleware as CoreCacheMiddelware,
  DB as CoreDB
} from 'kinvey-javascript-sdk-core/dist/rack/cache';
import { KinveyError } from 'kinvey-javascript-sdk-core/dist/errors';
import { Log } from 'kinvey-javascript-sdk-core/dist/log';
import { TitaniumDB } from './titaniumdb';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
const dbCache = {};

/**
 * Enum for DB Adapters.
 */
const DBAdapter = {
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(DBAdapter);
export { DBAdapter };

export class DB extends CoreDB {
  constructor(name = 'kinvey', adapters = [DBAdapter.TitaniumDB]) {
    super(name);

    if (!isArray(adapters)) {
      adapters = [adapters];
    }

    forEach(adapters, adapter => {
      switch (adapter) {
        case DBAdapter.TitaniumDB:
          if (TitaniumDB.isSupported()) {
            this.adapter = new TitaniumDB(name);
            return false;
          }

          break;
        default:
          Log.warn(`The ${adapter} adapter is is not recognized.`);
      }

      return true;
    });
  }
}

export class CacheMiddleware extends CoreCacheMiddelware {
  openDatabase(name, adapters = [
    DBAdapter.TitaniumDB
  ]) {
    if (!name) {
      throw new KinveyError('A name is required to open a database.');
    }

    let db = dbCache[name];

    if (!db) {
      db = new DB(name, adapters);
    }

    return db;
  }
}
