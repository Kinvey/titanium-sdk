import { DB as CoreDB } from 'kinvey-sdk-core/src/rack/persistence/db';
import { Memory } from 'kinvey-sdk-core/src/rack/persistence/adapters/memory';
import { TitaniumDB } from './titaniumdb';
import log from 'kinvey-sdk-core/src/log';
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
          log.warn(`The ${adapter} adapter is is not recognized.`);
      }

      return true;
    });

    if (!this.adapter) {
      if (Memory.isSupported()) {
        log.error('Provided adapters are unsupported on this platform. ' +
          'Defaulting to DBAdapter.Memory adapter.', adapters);
        this.adapter = new Memory(dbName);
      } else {
        log.error('Provided adapters are unsupported on this platform.', adapters);
      }
    }
  }
}
