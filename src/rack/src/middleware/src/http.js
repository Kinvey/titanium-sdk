import Middleware from 'kinvey-node-sdk/dist/rack/src/middleware/src/middleware';
import Http from './network';

export default class HttpMiddleware extends Middleware {
  constructor(name = 'Http Middleware') {
    super(name);
  }

  openHttp() {
    return new Http();
  }

  handle(request, response) {
    const http = this.openHttp();
    return http.handle(request, response);
  }
}
