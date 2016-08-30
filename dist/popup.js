'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _es6Promise = require('es6-promise');

var _device = require('./device');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _es6Promise.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _es6Promise.Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

/**
 * @private
 */
var Popup = exports.Popup = function (_EventEmitter) {
  _inherits(Popup, _EventEmitter);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'open',
    value: function () {
      var _ref = _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee() {
        var url = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
        return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.eventListeners = {
                  loadHandler: (0, _bind2.default)(this.loadHandler, this),
                  clickHandler: (0, _bind2.default)(this.clickHandler, this),
                  closeHandler: (0, _bind2.default)(this.closeHandler, this)
                };

                this.tiWebView = Titanium.UI.createWebView({
                  width: '100%',
                  height: '100%',
                  url: url
                });

                this.popup = Titanium.UI.createWindow({
                  backgroundColor: 'white',
                  barColor: '#000',
                  title: 'Mobile Identity Connect',
                  modal: true
                });
                this.popup.add(this.tiWebView);

                if ((0, _device.isiOS)()) {
                  this.tiWin = Titanium.UI.createWindow({
                    backgroundColor: 'white',
                    barColor: '#e3e3e3',
                    title: 'Mobile Identity Connect'
                  });
                  this.tiWin.add(this.tiWebView);

                  this.tiCloseButton = Titanium.UI.createButton({
                    title: 'Close',
                    style: Titanium.UI.iPhone.SystemButtonStyle.DONE
                  });
                  this.tiWin.setLeftNavButton(this.tiCloseButton);
                  this.tiCloseButton.addEventListener('click', this.eventListeners.clickHandler);

                  this.popup = Titanium.UI.iOS.createNavigationWindow({
                    backgroundColor: 'white',
                    window: this.tiWin,
                    modal: true
                  });
                } else if ((0, _device.isAndroid)()) {
                  this.popup.addEventListener('androidback', this.eventListeners.closeHandler);
                }

                this.tiWebView.addEventListener('load', this.eventListeners.loadHandler);
                this.tiWebView.addEventListener('error', this.eventListeners.loadHandler);
                this.popup.addEventListener('close', this.eventListeners.closeHandler);
                this.popup.open();
                return _context.abrupt('return', this);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open(_x) {
        return _ref.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var promise = new _es6Promise.Promise(function (resolve) {
        _this2.popup.close();
        resolve();
      });
      return promise;
    }
  }, {
    key: 'loadHandler',
    value: function loadHandler(event) {
      this.emit('loadstop', event.url);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.close();
    }
  }, {
    key: 'closeHandler',
    value: function closeHandler() {
      clearTimeout(this.interval);

      if ((0, _isFunction2.default)(this.popup.removeEventListener)) {
        this.popup.removeEventListener('close', this.eventListeners.closeHandler);
      }

      this.tiWebView.removeEventListener('load', this.eventListeners.loadHandler);
      this.tiWebView.removeEventListener('error', this.eventListeners.loadHandler);

      if ((0, _device.isiOS)()) {
        this.tiCloseButton.removeEventListener('click', this.eventListeners.clickHandler);
      } else if ((0, _device.isAndroid)()) {
        this.popup.close();

        if ((0, _isFunction2.default)(this.popup.removeEventListener)) {
          this.popup.removeEventListener('androidback', this.eventListeners.closeHandler);
        }
      }

      this.emit('closed');
    }
  }]);

  return Popup;
}(_events.EventEmitter);