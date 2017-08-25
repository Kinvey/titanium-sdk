import { isDefined } from 'kinvey-js-sdk/dist/export';
import { Storage as CoreStorage } from 'kinvey-js-sdk/dist/request/src/middleware/src/storage';
import { TitaniumDBAdapter } from './src/titaniumdb';

export default class Storage extends CoreStorage {
  loadAdapter() {
    return TitaniumDBAdapter.load(this.name)
      .then((adapter) => {
        if (!isDefined(adapter)) {
          return super.loadAdapter();
        }

        return adapter;
      });
  }
}
