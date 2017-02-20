import { Storage as NodeStorage, isDefined } from 'kinvey-node-sdk/dist/export';
import TitaniumDB from './src/titaniumdb';

export default class Storage extends NodeStorage {
  loadAdapter() {
    return TitaniumDB.load(this.name)
      .then((adapter) => {
        if (isDefined(adapter) === false) {
          return super.loadAdapter();
        }

        return adapter;
      });
  }
}
