'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB = exports.DBAdapter = undefined;

var _db = require('kinvey-javascript-sdk-core/build/rack/persistence/db');

var _memory = require('kinvey-javascript-sdk-core/build/rack/persistence/adapters/memory');

var _titaniumdb = require('./titaniumdb');

var _log = require('kinvey-javascript-sdk-core/build/log');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 * Enum for DB Adapters.
 */
var DBAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(DBAdapter);
exports.DBAdapter = DBAdapter;

/**
 * @private
 */

var DB = exports.DB = function (_CoreDB) {
  _inherits(DB, _CoreDB);

  function DB() {
    var dbName = arguments.length <= 0 || arguments[0] === undefined ? 'kinvey' : arguments[0];
    var adapters = arguments.length <= 1 || arguments[1] === undefined ? [DBAdapter.TitaniumDB, DBAdapter.Memory] : arguments[1];

    _classCallCheck(this, DB);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DB).call(this, dbName, []));

    if (!(0, _isArray2.default)(adapters)) {
      adapters = [adapters];
    }

    (0, _forEach2.default)(adapters, function (adapter) {
      switch (adapter) {
        case DBAdapter.Memory:
          if (_memory.Memory.isSupported()) {
            _this.adapter = new _memory.Memory(dbName);
            return false;
          }

          break;
        case DBAdapter.TitaniumDB:
          if (_titaniumdb.TitaniumDB.isSupported()) {
            _this.adapter = new _titaniumdb.TitaniumDB(dbName);
            return false;
          }

          break;
        default:
          _log.Log.warn('The ' + adapter + ' adapter is is not recognized.');
      }

      return true;
    });

    if (!_this.adapter) {
      if (_memory.Memory.isSupported()) {
        _log.Log.error('Provided adapters are unsupported on this platform. ' + 'Defaulting to Memory adapter.', adapters);
        _this.adapter = new _memory.Memory(dbName);
      } else {
        _log.Log.error('Provided adapters are unsupported on this platform.', adapters);
      }
    }
    return _this;
  }

  return DB;
}(_db.DB);