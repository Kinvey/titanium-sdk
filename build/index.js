'use strict';

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _rack = require('kinvey-javascript-sdk-core/build/rack/rack');

var _cache = require('kinvey-javascript-sdk-core/build/rack/middleware/cache');

var _cache2 = require('./cache');

var _serialize = require('kinvey-javascript-sdk-core/build/rack/middleware/serialize');

var _http = require('./http');

var _device = require('kinvey-javascript-sdk-core/build/utils/device');

var _device2 = require('./device');

var _popup = require('kinvey-javascript-sdk-core/build/utils/popup');

var _popup2 = require('./popup');

var _push = require('./push');

// Swap Cache middleware
var cacheRack = _rack.CacheRack.sharedInstance();
cacheRack.swap(_cache.CacheMiddleware, new _cache2.CacheMiddleware());

// Add Http middleware
var networkRack = _rack.NetworkRack.sharedInstance();
networkRack.useAfter(_serialize.SerializeMiddleware, new _http.HttpMiddleware());

// Use Device Adapter
_device.Device.use(new _device2.DeviceAdapter());

// Use Popup Adapter
_popup.Popup.use(new _popup2.PopupAdapter());

// Add Push module
_kinveyJavascriptSdkCore.Kinvey.Push = _push.Push;

// Export
module.exports = _kinveyJavascriptSdkCore.Kinvey;