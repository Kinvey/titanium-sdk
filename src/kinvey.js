import { Kinvey as CoreKinvey } from 'kinvey-javascript-sdk-core';
import { Push } from './push';
import { Promise } from 'es6-promise';

// Extend the CoreKinvey class
export class Kinvey extends CoreKinvey {
  /**
   * Returns the Promise class.
   *
   * @return {Promise} The Promise class.
   *
   * @example
   * var Promise = Kinvey.Promise;
   */
  static get Promise() {
    return Promise;
  }

  static init(options) {
    // Initialize Kinvey
    const client = super.init(options);

    // Add Push module to Kinvey
    this.Push = new Push();

    // Return the client
    return client;
  }
}
