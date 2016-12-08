import NodeStorage from 'kinvey-node-sdk/dist/rack/src/storage';
import TitaniumDB from './src/titaniumdb';

export default class Storage extends NodeStorage {
  get adapter() {
    if (TitaniumDB.isSupported()) {
      return new TitaniumDB(this.name);
    }

    return super.adapter;
  }
}
