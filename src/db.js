import { DB as CoreDB } from 'kinvey-javascript-sdk-core/build/rack/persistence/db';
import { Memory } from 'kinvey-javascript-sdk-core/build/rack/persistence/adapters/memory';
import { TitaniumDB } from './titaniumdb';
import { Log } from 'kinvey-javascript-sdk-core/build/log';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

/**
 * @private
 * Enum for DB Adapters.
 */
const DBAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(DBAdapter);
export { DBAdapter };

/**
 * @private
 */
export class DB extends CoreDB {
  constructor(dbName = 'kinvey', adapters = [DBAdapter.TitaniumDB, DBAdapter.Memory]) {
    super(dbName, []);

    if (!isArray(adapters)) {
      adapters = [adapters];
    }

    forEach(adapters, adapter => {
      switch (adapter) {
        case DBAdapter.Memory:
          if (Memory.isSupported()) {
            this.adapter = new Memory(dbName);
            return false;
          }

          break;
        case DBAdapter.TitaniumDB:
          if (TitaniumDB.isSupported()) {
            this.adapter = new TitaniumDB(dbName);
            return false;
          }

          break;
        default:
          Log.warn(`The ${adapter} adapter is is not recognized.`);
      }

      return true;
    });

    if (!this.adapter) {
      if (Memory.isSupported()) {
        Log.error('Provided adapters are unsupported on this platform. ' +
          'Defaulting to Memory adapter.', adapters);
        this.adapter = new Memory(dbName);
      } else {
        Log.error('Provided adapters are unsupported on this platform.', adapters);
      }
    }
  }
}
