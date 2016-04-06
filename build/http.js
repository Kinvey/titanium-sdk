'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _middleware = require('kinvey-javascript-sdk-core/build/rack/middleware');

var _utils = require('./utils');

var _parseHeaders = require('parse-headers');

var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 */

var HttpMiddleware = exports.HttpMiddleware = function (_KinveyMiddleware) {
  _inherits(HttpMiddleware, _KinveyMiddleware);

  function HttpMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Titanium Http Middleware' : arguments[0];

    _classCallCheck(this, HttpMiddleware);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HttpMiddleware).call(this, name));
  }

  _createClass(HttpMiddleware, [{
    key: 'handle',
    value: function handle(request) {
      return _get(Object.getPrototypeOf(HttpMiddleware.prototype), 'handle', this).call(this, request).then(function () {
        var promise = new Promise(function (resolve, reject) {
          var xhr = void 0;

          if ((0, _utils.isMobileWeb)()) {
            xhr = new XMLHttpRequest();

            xhr.ontimeout = function () {
              reject(new Error('timeout'));
            };
          } else {
            xhr = Titanium.Network.createHTTPClient();
            xhr.autoRedirect = request.followRedirect || true;

            // Set the TLS version (iOS only)
            if ((0, _isFunction2.default)(xhr.setTlsVersion) && Titanium.Network.TLS_VERSION_1_2) {
              xhr.setTlsVersion(Titanium.Network.TLS_VERSION_1_2);
            }
          }

          // Set timeout
          // xhr.timeout = request.timeout || 0;

          // Set success and failure callback
          xhr.onload = xhr.onerror = function (e) {
            var status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

            if ((0, _isString2.default)(e.error) && e.error.toLowerCase().indexOf('timed out') !== -1) {
              e.type = 'timeout';
            }

            if (status >= 200 && status < 300 || status === 304) {
              request.response = {
                statusCode: status,
                headers: (0, _parseHeaders2.default)(xhr.allResponseHeaders),
                data: xhr.responseText
              };

              return resolve(request);
            }

            return reject(e.error);
          };

          // Open the request
          xhr.open(request.method, request.url);

          // Set request headers
          for (var name in request.headers) {
            if (request.headers.hasOwnProperty(name)) {
              xhr.setRequestHeader(name, request.headers[name]);
            }
          }

          // Send request
          xhr.send(request.data);
        });

        return promise;
      });
    }
  }]);

  return HttpMiddleware;
}(_middleware.KinveyMiddleware);