'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_EventEmitter) {
  _inherits(Popup, _EventEmitter);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var eventListeners = void 0;
      var popupWindow = void 0;
      var titaniumWebView = void 0;
      var titaniumCloseButton = void 0;

      // loadStartCallback
      var loadStartCallback = function loadStartCallback(event) {
        _this2.emit('loadstart', event);
      };

      // loadStopCallback
      var loadStopCallback = function loadStopCallback(event) {
        _this2.emit('loadstop', event);
      };

      // loadErrorCallback
      var loadErrorCallback = function loadErrorCallback(event) {
        _this2.emit('error', event);
      };

      // exitCallback
      var exitCallback = function exitCallback() {
        // Close the popup
        popupWindow.close();
        _this2.popupWindow = null;

        // Remove event listeners
        if (popupWindow && (0, _isFunction2.default)(popupWindow.removeEventListener)) {
          popupWindow.removeEventListener('close', eventListeners.exitCallback);
          popupWindow.removeEventListener('androidback', eventListeners.exitCallback);
        }

        if (titaniumWebView && (0, _isFunction2.default)(titaniumWebView.removeEventListener)) {
          titaniumWebView.removeEventListener('load', eventListeners.loadStopCallback);
          titaniumWebView.removeEventListener('error', eventListeners.loadErrorCallback);
        }

        if (titaniumCloseButton && (0, _isFunction2.default)(titaniumCloseButton.removeEventListener)) {
          titaniumCloseButton.removeEventListener('click', eventListeners.closeHandler);
        }

        // Emit closed
        _this2.emit('exit');
      };

      // Bind event listeners
      eventListeners = {
        closeHandler: (0, _bind2.default)(this.close, this),
        loadStartCallback: (0, _bind2.default)(loadStartCallback, this),
        loadStopCallback: (0, _bind2.default)(loadStopCallback, this),
        loadErrorCallback: (0, _bind2.default)(loadErrorCallback, this),
        exitCallback: (0, _bind2.default)(exitCallback, this)
      };

      // Create popup window for Titanium
      titaniumWebView = Ti.UI.createWebView({
        width: '100%',
        height: '100%',
        url: url
      });
      titaniumWebView.addEventListener('load', eventListeners.loadStopCallback);
      titaniumWebView.addEventListener('error', eventListeners.loadErrorCallback);

      popupWindow = Ti.UI.createWindow({
        backgroundColor: 'white',
        barColor: '#000',
        title: options.title || 'Kinvey Mobile Identity Connect',
        modal: true
      });
      popupWindow.add(titaniumWebView);

      if (_device2.default.isiOS()) {
        var tiWindow = Ti.UI.createWindow({
          backgroundColor: 'white',
          barColor: '#e3e3e3',
          title: options.title || 'Kinvey Mobile Identity Connect'
        });
        tiWindow.add(titaniumWebView);

        titaniumCloseButton = Ti.UI.createButton({
          title: 'Close',
          style: Ti.UI.iOS !== 'undefined' ? Ti.UI.iOS.SystemButtonStyle.DONE : Ti.UI.iPhone.SystemButtonStyle.DONE
        });
        tiWindow.setLeftNavButton(titaniumCloseButton);
        titaniumCloseButton.addEventListener('click', eventListeners.closeHandler);

        popupWindow = Ti.UI.iOS.createNavigationWindow({
          backgroundColor: 'white',
          window: tiWindow,
          modal: true
        });
      } else if (_device2.default.isAndroid()) {
        popupWindow.addEventListener('androidback', eventListeners.exitCallback);
      }

      // Open the popup
      popupWindow.addEventListener('close', eventListeners.exitCallback);
      popupWindow.open();

      // Set the popupWindow instance
      this.popupWindow = popupWindow;

      // Return this
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.popupWindow) {
        this.popupWindow.close();
      }

      return this;
    }
  }]);

  return Popup;
}(_events.EventEmitter);

exports.default = Popup;