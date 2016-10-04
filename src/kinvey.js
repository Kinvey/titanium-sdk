import NodeKinvey from 'kinvey-node-sdk';
import { CacheRack, NetworkRack } from './rack';
import Device from './device';
import Popup from './popup';
import Push from './push';

export default class Kinvey extends NodeKinvey {
  static init(options) {
    options.cacheRack = new CacheRack();
    options.networkRack = new NetworkRack();
    options.deviceClass = Device;
    options.popupClass = Popup;

    // Initialize Kinvey
    const client = super.init(options);

    // // Add Push module to Kinvey
    this.Push = new Push({ client: client });

    // Return the client
    return client;
  }
}
