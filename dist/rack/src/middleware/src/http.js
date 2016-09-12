'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _es6Promise = require('es6-promise');

var _device = require('../../../../device');

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
var HttpMiddleware = exports.HttpMiddleware = function (_XHRMiddleware) {
  _inherits(HttpMiddleware, _XHRMiddleware);

  function HttpMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Titanium Http Middleware' : arguments[0];

    _classCallCheck(this, HttpMiddleware);

    return _possibleConstructorReturn(this, (HttpMiddleware.__proto__ || Object.getPrototypeOf(HttpMiddleware)).call(this, name));
  }

  _createClass(HttpMiddleware, [{
    key: 'handle',
    value: function () {
      var _ref = _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee(request) {
        var url, method, headers, body, xhr, names, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name;

        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_device.Device.isMobileWeb()) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _get(HttpMiddleware.prototype.__proto__ || Object.getPrototypeOf(HttpMiddleware.prototype), 'handle', this).call(this, request));

              case 2:
                url = request.url;
                method = request.method;
                headers = request.headers;
                body = request.body;
                xhr = Titanium.Network.createHTTPClient();

                xhr.autoRedirect = request.followRedirect || true;

                // Set the TLS version (iOS only)
                if ((0, _isFunction2.default)(xhr.setTlsVersion) && Titanium.Network.TLS_VERSION_1_2) {
                  xhr.setTlsVersion(Titanium.Network.TLS_VERSION_1_2);
                }

                // Set request headers
                names = Object.keys(headers);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 13;

                for (_iterator = names[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  name = _step.value;

                  xhr.setRequestHeader(name, headers.get(name));
                }

                // Set timeout
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](13);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:
                xhr.timeout = request.timeout || 0;

                return _context.abrupt('return', new _es6Promise.Promise(function (resolve, reject) {
                  // Set success and failure callback
                  xhr.onload = xhr.onerror = function (e) {
                    var status = e.type === 'timeout' || e.type === 'cancelled' ? 0 : xhr.status;

                    if (e.error) {
                      return reject(e.error);
                    }

                    // Resolve
                    return resolve({
                      response: {
                        statusCode: status,
                        headers: (0, _parseHeaders2.default)(xhr.allResponseHeaders),
                        data: xhr.responseText
                      }
                    });
                  };

                  // Open the request
                  xhr.open(method, url);

                  // Send request
                  xhr.send(body);
                }));

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 17, 21, 29], [22,, 24, 28]]);
      }));

      function handle(_x2) {
        return _ref.apply(this, arguments);
      }

      return handle;
    }()
  }]);

  return HttpMiddleware;
}(_kinveyHtml5Sdk.XHRMiddleware);