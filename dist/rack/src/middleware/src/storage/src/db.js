'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB = exports.StorageAdapter = undefined;

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _titaniumdb = require('./titaniumdb');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Enum for Storage Adapters.
 */
var StorageAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(StorageAdapter);
exports.StorageAdapter = StorageAdapter;

/**
 * @private
 */

var DB = exports.DB = function (_Html5DB) {
  _inherits(DB, _Html5DB);

  function DB(name) {
    var adapters = arguments.length <= 1 || arguments[1] === undefined ? [StorageAdapter.TitaniumDB, StorageAdapter.Memory] : arguments[1];

    _classCallCheck(this, DB);

    var _this = _possibleConstructorReturn(this, (DB.__proto__ || Object.getPrototypeOf(DB)).call(this, name, adapters));

    if (!(0, _isArray2.default)(adapters)) {
      adapters = [adapters];
    }

    (0, _forEach2.default)(adapters, function (adapter) {
      switch (adapter) {
        case StorageAdapter.TitaniumDB:
          if (_titaniumdb.TitaniumDB.isSupported()) {
            _this.adapter = new _titaniumdb.TitaniumDB(name);
            return false;
          }

          break;
        case StorageAdapter.Memory:
          if (_kinveyHtml5Sdk.Memory.isSupported()) {
            _this.adapter = new _kinveyHtml5Sdk.Memory(name);
            return false;
          }

          break;
        default:
          _kinveyJavascriptSdkCore.Log.warn('The ' + adapter + ' adapter is is not recognized.');
      }

      return true;
    });
    return _this;
  }

  return DB;
}(_kinveyHtml5Sdk.DB);