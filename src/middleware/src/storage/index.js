import CoreStorage from 'kinvey-node-sdk/dist/request/src/middleware/src/storage';
import TitaniumDB from './src/titaniumdb';

export default class Storage extends CoreStorage {
  get adapter() {
    if (TitaniumDB.isSupported()) {
      return new TitaniumDB(this.name);
    }

    return super.adapter;
  }
}
