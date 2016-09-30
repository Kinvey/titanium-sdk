'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('kinvey-node-sdk/dist/rack/src/middleware/src/storage');

var _storage2 = _interopRequireDefault(_storage);

var _memory = require('kinvey-node-sdk/dist/rack/src/middleware/src/storage/src/memory');

var _memory2 = _interopRequireDefault(_memory);

var _titaniumdb = require('./src/titaniumdb');

var _titaniumdb2 = _interopRequireDefault(_titaniumdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StorageAdapter = {
  Memory: 'Memory',
  TitaniumDB: 'TitaniumDB'
};
Object.freeze(StorageAdapter);

var Storage = function (_NodeStorage) {
  _inherits(Storage, _NodeStorage);

  function Storage() {
    _classCallCheck(this, Storage);

    return _possibleConstructorReturn(this, (Storage.__proto__ || Object.getPrototypeOf(Storage)).apply(this, arguments));
  }

  _createClass(Storage, [{
    key: 'adapter',
    get: function get() {
      var name = this.name;
      var adapter = void 0;

      [StorageAdapter.TitaniumDB, StorageAdapter.Memory].some(function (adapter) {
        switch (adapter) {
          case StorageAdapter.TitaniumDB:
            if (_titaniumdb2.default.isSupported()) {
              adapter = new _titaniumdb2.default(name);
              return true;
            }

            break;
          case StorageAdapter.Memory:
            if (_memory2.default.isSupported()) {
              adapter = new _memory2.default(name);
              return true;
            }

            break;
          default:
        }

        return false;
      });

      return adapter;
    }
  }]);

  return Storage;
}(_storage2.default);

exports.default = Storage;