import { Storage as NodeStorage, isDefined } from 'kinvey-js-sdk/dist/export';
import { TitaniumDBAdapter } from './src/titaniumdb';

export default class Storage extends NodeStorage {
  loadAdapter() {
    return TitaniumDBAdapter.load(this.name)
      .then((adapter) => {
        if (isDefined(adapter) === false) {
          return super.loadAdapter();
        }

        return adapter;
      });
  }
}
