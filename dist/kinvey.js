'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kinvey = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _push = require('./push');

var _es6Promise = require('es6-promise');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Extend the CoreKinvey class
var Kinvey = exports.Kinvey = function (_CoreKinvey) {
  _inherits(Kinvey, _CoreKinvey);

  function Kinvey() {
    _classCallCheck(this, Kinvey);

    return _possibleConstructorReturn(this, (Kinvey.__proto__ || Object.getPrototypeOf(Kinvey)).apply(this, arguments));
  }

  _createClass(Kinvey, null, [{
    key: 'init',
    value: function init(options) {
      // Initialize Kinvey
      var client = _get(Kinvey.__proto__ || Object.getPrototypeOf(Kinvey), 'init', this).call(this, options);

      // Add Push module to Kinvey
      this.Push = new _push.Push();

      // Return the client
      return client;
    }
  }, {
    key: 'Promise',

    /**
     * Returns the Promise class.
     *
     * @return {Promise} The Promise class.
     *
     * @example
     * var Promise = Kinvey.Promise;
     */
    get: function get() {
      return _es6Promise.Promise;
    }
  }]);

  return Kinvey;
}(_kinveyJavascriptSdkCore.Kinvey);