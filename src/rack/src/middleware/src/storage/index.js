import NodeStorage from 'kinvey-node-sdk/dist/rack/src/middleware/src/storage';
import Memory from 'kinvey-node-sdk/dist/rack/src/middleware/src/storage/src/memory'
import TitaniumDB from './src/titaniumdb';

const StorageAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(StorageAdapter);

export default class Storage extends NodeStorage {
  get adapter() {
    const name = this.name;
    let adapter;

    [
      StorageAdapter.TitaniumDB,
      StorageAdapter.Memory
    ].some((adapter) => {
      switch (adapter) {
        case StorageAdapter.TitaniumDB:
          if (TitaniumDB.isSupported()) {
            adapter = new TitaniumDB(name);
            return true;
          }

          break;
        case StorageAdapter.Memory:
          if (Memory.isSupported()) {
            adapter = new Memory(name);
            return true;
          }

          break;
        default:
      }

      return false;
    });

    return adapter;
  }
}
