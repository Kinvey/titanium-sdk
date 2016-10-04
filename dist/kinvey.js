'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _kinveyNodeSdk = require('kinvey-node-sdk');

var _kinveyNodeSdk2 = _interopRequireDefault(_kinveyNodeSdk);

var _rack = require('./rack');

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kinvey = function (_NodeKinvey) {
  _inherits(Kinvey, _NodeKinvey);

  function Kinvey() {
    _classCallCheck(this, Kinvey);

    return _possibleConstructorReturn(this, (Kinvey.__proto__ || Object.getPrototypeOf(Kinvey)).apply(this, arguments));
  }

  _createClass(Kinvey, null, [{
    key: 'init',
    value: function init(options) {
      options.cacheRack = new _rack.CacheRack();
      options.networkRack = new _rack.NetworkRack();
      options.deviceClass = _device2.default;
      options.popupClass = _popup2.default;

      // Initialize Kinvey
      var client = _get(Kinvey.__proto__ || Object.getPrototypeOf(Kinvey), 'init', this).call(this, options);

      // // Add Push module to Kinvey
      this.Push = new _push2.default({ client: client });

      // Return the client
      return client;
    }
  }]);

  return Kinvey;
}(_kinveyNodeSdk2.default);

exports.default = Kinvey;