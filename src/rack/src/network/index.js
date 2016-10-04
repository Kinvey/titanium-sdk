import Promise from 'es6-promise';
import TitaniumHttp from './src/titanium';

export default class Http {
  get adapter() {
    if (TitaniumHttp.isSupported()) {
      return new TitaniumHttp();
    }

    return null;
  }

  handle(request, response) {
    if (!this.adapter) {
      return Promise.reject(new Error('Unable to handle the request. An adapter is not specified.'));
    }

    return this.adapter.handle(request, response);
  }
}
