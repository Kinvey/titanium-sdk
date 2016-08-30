'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheMiddleware = exports.DB = exports.DBAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cache = require('kinvey-javascript-sdk-core/dist/rack/cache');

var _errors = require('kinvey-javascript-sdk-core/dist/errors');

var _log = require('kinvey-javascript-sdk-core/dist/log');

var _titaniumdb = require('./titaniumdb');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbCache = {};

/**
 * Enum for DB Adapters.
 */
var DBAdapter = {
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(DBAdapter);
exports.DBAdapter = DBAdapter;

var DB = exports.DB = function (_CoreDB) {
  _inherits(DB, _CoreDB);

  function DB() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'kinvey' : arguments[0];
    var adapters = arguments.length <= 1 || arguments[1] === undefined ? [DBAdapter.TitaniumDB] : arguments[1];

    _classCallCheck(this, DB);

    var _this = _possibleConstructorReturn(this, (DB.__proto__ || Object.getPrototypeOf(DB)).call(this, name));

    if (!(0, _isArray2.default)(adapters)) {
      adapters = [adapters];
    }

    (0, _forEach2.default)(adapters, function (adapter) {
      switch (adapter) {
        case DBAdapter.TitaniumDB:
          if (_titaniumdb.TitaniumDB.isSupported()) {
            _this.adapter = new _titaniumdb.TitaniumDB(name);
            return false;
          }

          break;
        default:
          _log.Log.warn('The ' + adapter + ' adapter is is not recognized.');
      }

      return true;
    });
    return _this;
  }

  return DB;
}(_cache.DB);

var CacheMiddleware = exports.CacheMiddleware = function (_CoreCacheMiddelware) {
  _inherits(CacheMiddleware, _CoreCacheMiddelware);

  function CacheMiddleware() {
    _classCallCheck(this, CacheMiddleware);

    return _possibleConstructorReturn(this, (CacheMiddleware.__proto__ || Object.getPrototypeOf(CacheMiddleware)).apply(this, arguments));
  }

  _createClass(CacheMiddleware, [{
    key: 'openDatabase',
    value: function openDatabase(name) {
      if (!name) {
        throw new _errors.KinveyError('A name is required to open a database.');
      }

      var db = dbCache[name];

      if (!db) {
        db = new DB(name);
      }

      return db;
    }
  }]);

  return CacheMiddleware;
}(_cache.CacheMiddleware);