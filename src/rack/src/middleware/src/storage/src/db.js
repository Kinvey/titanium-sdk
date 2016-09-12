import { Log } from 'kinvey-javascript-sdk-core';
import { Memory, DB as Html5DB } from 'kinvey-html5-sdk';
import { TitaniumDB } from './titaniumdb';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

/**
 * Enum for Storage Adapters.
 */
const StorageAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(StorageAdapter);
export { StorageAdapter };

/**
 * @private
 */
export class DB extends Html5DB {
  constructor(name, adapters = [
    StorageAdapter.TitaniumDB,
    StorageAdapter.Memory
  ]) {
    super(name, adapters);

    if (!isArray(adapters)) {
      adapters = [adapters];
    }

    forEach(adapters, adapter => {
      switch (adapter) {
        case StorageAdapter.TitaniumDB:
          if (TitaniumDB.isSupported()) {
            this.adapter = new TitaniumDB(name);
            return false;
          }

          break;
        case StorageAdapter.Memory:
          if (Memory.isSupported()) {
            this.adapter = new Memory(name);
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
