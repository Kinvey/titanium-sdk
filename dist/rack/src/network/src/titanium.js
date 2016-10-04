'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _parseHeaders = require('parse-headers');

var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultTimeout = process.env.KINVEY_TITANIUM_DEFAULT_TIMEOUT || 10000;

var TitaniumHttp = function () {
  function TitaniumHttp() {
    _classCallCheck(this, TitaniumHttp);
  }

  _createClass(TitaniumHttp, [{
    key: 'handle',
    value: function handle(request) {
      var promise = new _es6Promise2.default(function (resolve, reject) {
        var url = request.url;
        var method = request.method;
        var headers = request.headers;
        var body = request.body;
        var autoRedirect = request.autoRedirect;

        // Create an HTTP Client

        var client = Ti.Network.createHTTPClient();

        // Open the request
        client.open(method, url);

        // Set request headers
        var keys = Object.keys(headers);
        for (var i = 0, len = keys.length; i < len; i += 1) {
          var key = keys[i];
          client.setRequestHeader(key, headers[key]);
        }

        // Set autoRedirect flag
        client.autoRedirect = autoRedirect || true;

        // Set the TLS version (iOS only)
        if ((0, _isFunction2.default)(client.setTlsVersion) && Ti.Network.TLS_VERSION_1_2) {
          client.setTlsVersion(Ti.Network.TLS_VERSION_1_2);
        }

        // Set timeout
        client.timeout = request.timeout || defaultTimeout;

        // onload listener
        client.onload = function onLoad() {
          resolve({
            response: {
              statusCode: this.status,
              headers: (0, _parseHeaders2.default)(this.allResponseHeaders),
              data: this.responseText
            }
          });
        };

        // onerror listener
        client.onerror = function onError(e) {
          reject(e.error);
        };

        // Send request
        client.send(body);
      });

      // Return the promise
      return promise;
    }
  }], [{
    key: 'isSupported',
    value: function isSupported() {
      return typeof Ti !== 'undefined' && typeof Ti.Network !== 'undefined';
    }
  }]);

  return TitaniumHttp;
}();

exports.default = TitaniumHttp;