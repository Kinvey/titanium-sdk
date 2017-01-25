import KinveyStorage from 'kinvey-node-sdk/dist/request/src/middleware/src/storage';
import { isDefined } from 'kinvey-node-sdk/dist/utils';
import TitaniumDB from './src/titaniumdb';

export default class Storage extends KinveyStorage {
  getAdapter() {
    return TitaniumDB.loadAdapter(this.name)
      .then((adapter) => {
        if (isDefined(adapter) === false) {
          return super.getAdapter();
        }

        return adapter;
      });
  }
}
