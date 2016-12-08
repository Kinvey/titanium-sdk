import CacheMiddleware from './src/cache';
import HttpMiddleware from './src/http';
import { Middleware, ParseMiddleware, SerializeMiddleware } from 'kinvey-node-sdk/dist/request/src/middleware';

// Export
export {
  CacheMiddleware,
  HttpMiddleware,
  Middleware,
  ParseMiddleware,
  SerializeMiddleware
};

// Export default
export default Middleware;
