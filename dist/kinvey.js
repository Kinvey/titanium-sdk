'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kinveyNodeSdk = require('kinvey-node-sdk');

var _kinveyNodeSdk2 = _interopRequireDefault(_kinveyNodeSdk);

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add the Push module
_kinveyNodeSdk2.default.Push = _push2.default;

exports.default = _kinveyNodeSdk2.default;