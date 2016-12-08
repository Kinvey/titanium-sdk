import NodeKinvey from 'kinvey-node-sdk';
import { CacheRack, NetworkRack } from './rack';
import Device from './device';
import Popup from './popup';
import Push from './push';
import assign from 'lodash/assign';

export default class Kinvey extends NodeKinvey {
  static init(options = {}) {
    options = assign({
      cacheRack: new CacheRack(),
      networkRack: new NetworkRack(),
      deviceClass: Device,
      popupClass: Popup
    }, options);

    // Initialize Kinvey
    const client = super.init(options);

    // // Add Push module to Kinvey
    this.Push = new Push({ client: client });

    // Return the client
    return client;
  }
}
