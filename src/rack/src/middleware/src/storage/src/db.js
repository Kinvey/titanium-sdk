import { KinveyError, Log } from 'kinvey-javascript-sdk-core';
import { Memory, DB as Html5DB } from 'kinvey-html5-sdk';
import { TitaniumDB } from './titaniumdb';
import forEach from 'lodash/forEach';
import isString from 'lodash/isString';
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
    if (!name) {
      throw new KinveyError('Unable to create a DB instance without a name.');
    }

    if (!isString(name)) {
      throw new KinveyError('The name is not a string. A name must be a string to create a DB instance.');
    }

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
