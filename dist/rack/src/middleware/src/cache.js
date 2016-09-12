'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _storage = require('./storage');

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbCache = {};

var CacheMiddleware = exports.CacheMiddleware = function (_Html5CacheMiddleware) {
  _inherits(CacheMiddleware, _Html5CacheMiddleware);

  function CacheMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Titanium Cache Middleware' : arguments[0];

    _classCallCheck(this, CacheMiddleware);

    return _possibleConstructorReturn(this, (CacheMiddleware.__proto__ || Object.getPrototypeOf(CacheMiddleware)).call(this, name));
  }

  _createClass(CacheMiddleware, [{
    key: 'openDatabase',
    value: function openDatabase(name) {
      if (!name) {
        throw new _kinveyJavascriptSdkCore.KinveyError('A name is required to open a database.');
      }

      var db = dbCache[name];

      if (!db) {
        db = new _storage.DB(name);
      }

      return db;
    }
  }]);

  return CacheMiddleware;
}(_kinveyHtml5Sdk.CacheMiddleware);