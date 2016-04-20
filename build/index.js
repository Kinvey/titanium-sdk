'use strict';

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _rack = require('kinvey-javascript-sdk-core/build/rack/rack');

var _cache = require('kinvey-javascript-sdk-core/build/rack/middleware/cache');

var _cache2 = require('./cache');

var _serialize = require('kinvey-javascript-sdk-core/build/rack/middleware/serialize');

var _http = require('./http');

var _push = require('./push');

// Swap Cache middleware
var cacheRack = _rack.CacheRack.sharedInstance();
cacheRack.swap(_cache.CacheMiddleware, new _cache2.CacheMiddleware());

// Add Http middleware
var networkRack = _rack.NetworkRack.sharedInstance();
networkRack.useAfter(_serialize.SerializeMiddleware, new _http.HttpMiddleware());

var _init = _kinveyJavascriptSdkCore.Kinvey.init;
_kinveyJavascriptSdkCore.Kinvey.init = function (options) {
  // Initialize Kinvey
  var client = _init(options);

  // Add Push module to Kinvey
  _kinveyJavascriptSdkCore.Kinvey.Push = new _push.Push();

  // Return the client
  return client;
};

// Export
module.exports = _kinveyJavascriptSdkCore.Kinvey;