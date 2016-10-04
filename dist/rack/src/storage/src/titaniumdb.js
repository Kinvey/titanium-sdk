'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('./errors');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';

var TitaniumDB = function () {
  function TitaniumDB() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'kinvey';

    _classCallCheck(this, TitaniumDB);

    this.name = name;
  }

  _createClass(TitaniumDB, [{
    key: 'execute',
    value: function execute(collection, query, parameters) {
      var _this = this;

      var escapedCollection = '"' + collection + '"';
      var isMulti = (0, _isArray2.default)(query);
      query = isMulti ? query : [[query, parameters]];

      try {
        if (!this.db) {
          this.db = Ti.Database.open(this.name);
        }

        // Start a transaction
        this.db.execute('BEGIN TRANSACTION');

        // Create the table if it does not exist yet
        this.db.execute('CREATE TABLE IF NOT EXISTS ' + escapedCollection + ' ' + '(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)');

        // Execute queries
        var response = (0, _map2.default)(query, function (parts) {
          var sql = parts[0].replace('#{collection}', escapedCollection);
          var cursor = _this.db.execute(sql, parts[1]);
          var response = { rowCount: _this.db.getRowsAffected(), result: null };

          if (cursor) {
            response.result = [];

            while (cursor.isValidRow()) {
              var entity = JSON.parse(cursor.fieldByName('value'));
              response.result.push(entity);
              cursor.next();
            }

            cursor.close();
          }

          return response;
        });

        // Commit the transaction
        this.db.execute('COMMIT TRANSACTION');

        return _es6Promise2.default.resolve(isMulti ? response : response.shift());
      } catch (error) {
        return _es6Promise2.default.reject(error);
      }
    }
  }, {
    key: 'find',
    value: function find(collection) {
      var sql = 'SELECT value FROM #{collection}';
      var promise = this.execute(collection, sql, []).then(function (response) {
        return response.result;
      }).catch(function (error) {
        if (error instanceof _errors.NotFoundError) {
          return [];
        }

        throw error;
      });
      return promise;
    }
  }, {
    key: 'findById',
    value: function findById(collection, id) {
      var _this2 = this;

      var sql = 'SELECT value FROM #{collection} WHERE key = ?';
      var promise = this.execute(collection, sql, [id]).then(function (response) {
        var entities = response.result;

        if (entities.length === 0) {
          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + ' ' + ('collection on the ' + _this2.name + ' webSQL database.'));
        }

        return entities[0];
      });
      return promise;
    }
  }, {
    key: 'save',
    value: function save(collection, entities) {
      var queries = [];
      entities = (0, _map2.default)(entities, function (entity) {
        queries.push(['INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)', [entity[idAttribute], JSON.stringify(entity)]]);

        return entity;
      });

      var promise = this.execute(collection, queries, null).then(function () {
        return entities;
      });
      return promise;
    }
  }, {
    key: 'removeById',
    value: function removeById(collection, id) {
      var _this3 = this;

      var promise = this.execute(collection, [['SELECT value FROM #{collection} WHERE key = ?', [id]], ['DELETE FROM #{collection} WHERE key = ?', [id]]], null).then(function (response) {
        var entities = response[0].result;
        var count = response[1].rowCount || entities.length;

        if (count === 0) {
          throw new _errors.NotFoundError('An entity with _id = ' + id + ' was not found in the ' + collection + ' ' + ('collection on the ' + _this3.name + ' webSQL database.'));
        }

        return {
          count: 1,
          entities: entities
        };
      });

      return promise;
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (!this.db) {
        this.db = Ti.Database.open(this.name);
      }

      if ((0, _isFunction2.default)(this.db.remove)) {
        // Android
        this.db.remove();
        return _es6Promise2.default.resolve(null);
      }

      if (this.db.file && this.db.file.deleteFile()) {
        // iOS
        return _es6Promise2.default.resolve(null);
      }

      return _es6Promise2.default.reject(new Error('The ability to delete the database is not implemented for this platform.'));
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return typeof Ti !== 'undefined' && typeof Ti.Database !== 'undefined';
    }
  }]);

  return TitaniumDB;
}();

exports.default = TitaniumDB;