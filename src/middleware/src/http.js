import Middleware from 'kinvey-node-sdk/dist/request/src/middleware';
import Http from './network';

export default class HttpMiddleware extends Middleware {
  constructor(name = 'Http Middleware') {
    super(name);
  }

  handle(request, response) {
    const http = new Http();
    return http.handle(request, response);
  }
}
