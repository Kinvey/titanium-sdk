'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _middleware = require('kinvey-javascript-sdk-core/dist/rack/middleware');

var _es6Promise = require('es6-promise');

var _device = require('./device');

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _parseHeaders = require('parse-headers');

var _parseHeaders2 = _interopRequireDefault(_parseHeaders);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _es6Promise.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _es6Promise.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * @private
 */
var HttpMiddleware = exports.HttpMiddleware = function (_KinveyMiddleware) {
  _inherits(HttpMiddleware, _KinveyMiddleware);

  function HttpMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Titanium Http Middleware' : arguments[0];

    _classCallCheck(this, HttpMiddleware);

    return _possibleConstructorReturn(this, (HttpMiddleware.__proto__ || Object.getPrototypeOf(HttpMiddleware)).call(this, name));
  }

  _createClass(HttpMiddleware, [{
    key: 'handle',
    value: function () {
      var _ref = _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee(request) {
        var url, method, headers, body, xhr;
        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(HttpMiddleware.prototype.__proto__ || Object.getPrototypeOf(HttpMiddleware.prototype), 'handle', this).call(this, request);

              case 2:
                url = request.url;
                method = request.method;
                headers = request.headers;
                body = request.body;
                xhr = void 0;
                return _context.abrupt('return', new _es6Promise.Promise(function (resolve, reject) {
                  if (_device.Device.isMobileWeb()) {
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

                  // Set request headers
                  var names = Object.keys(headers.toJSON());
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var name = _step.value;

                      xhr.setRequestHeader(name, headers.get(name));
                    }

                    // Set timeout
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  xhr.timeout = request.timeout || 0;

                  // Set success and failure callback
                  xhr.onload = xhr.onerror = function (e) {
                    var status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

                    if (e.error) {
                      return reject(e.error);
                    }

                    // Set the response for the request
                    request.response = {
                      statusCode: status,
                      headers: (0, _parseHeaders2.default)(xhr.allResponseHeaders),
                      data: xhr.responseText
                    };

                    // Resolve
                    return resolve(request);
                  };

                  // Open the request
                  xhr.open(method, url);

                  // Send request
                  xhr.send(body);
                }));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x2) {
        return _ref.apply(this, arguments);
      }

      return handle;
    }()
  }]);

  return HttpMiddleware;
}(_middleware.KinveyMiddleware);