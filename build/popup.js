'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @private
 */

var PopupAdapter = exports.PopupAdapter = function () {
  function PopupAdapter() {
    _classCallCheck(this, PopupAdapter);
  }

  _createClass(PopupAdapter, [{
    key: 'open',
    value: function open() {
      var _this = this;

      this.eventListeners = {
        loadHandler: (0, _bind2.default)(this.loadHandler, this),
        clickHandler: (0, _bind2.default)(this.clickHandler, this),
        closeHandler: (0, _bind2.default)(this.closeHandler, this)
      };

      var promise = new Promise(function (resolve) {
        _this.tiWebView = Titanium.UI.createWebView({
          width: '100%',
          height: '100%',
          url: _this.url
        });

        _this.popup = Titanium.UI.createWindow({
          backgroundColor: 'white',
          barColor: '#000',
          title: 'Mobile Identity Connect',
          modal: true
        });
        _this.popup.add(_this.tiWebView);

        if ((0, _utils.isiOS)()) {
          _this.tiWin = Titanium.UI.createWindow({
            backgroundColor: 'white',
            barColor: '#e3e3e3',
            title: 'Mobile Identity Connect'
          });
          _this.tiWin.add(_this.tiWebView);

          _this.tiCloseButton = Titanium.UI.createButton({
            title: 'Close',
            style: Titanium.UI.iPhone.SystemButtonStyle.DONE
          });
          _this.tiWin.setLeftNavButton(_this.tiCloseButton);
          _this.tiCloseButton.addEventListener('click', _this.eventListeners.clickHandler);

          _this.popup = Titanium.UI.iOS.createNavigationWindow({
            backgroundColor: 'white',
            window: _this.tiWin,
            modal: true
          });
        } else if ((0, _utils.isAndroid)()) {
          _this.popup.addEventListener('androidback', _this.eventListeners.closeHandler);
        }

        _this.tiWebView.addEventListener('load', _this.eventListeners.loadHandler);
        _this.tiWebView.addEventListener('error', _this.eventListeners.loadHandler);
        _this.popup.addEventListener('close', _this.eventListeners.closeHandler);
        _this.popup.open();
        resolve(_this);
      });
      return promise;
    }
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var promise = new Promise(function (resolve) {
        _this2.popup.close();
        resolve();
      });
      return promise;
    }
  }, {
    key: 'loadHandler',
    value: function loadHandler(event) {
      this.emit('loaded', event.url);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.close();
    }
  }, {
    key: 'closeHandler',
    value: function closeHandler() {
      this.tiWebView.removeEventListener('load', this.eventListeners.loadHandler);
      this.tiWebView.removeEventListener('error', this.eventListeners.loadHandler);
      this.popup.removeEventListener('close', this.eventListeners.closeHandler);

      if ((0, _utils.isiOS)()) {
        this.tiCloseButton.removeEventListener('click', this.eventListeners.clickHandler);
      } else if ((0, _utils.isAndroid)()) {
        this.popup.close();
        this.popup.removeEventListener('androidback', this.eventListeners.closeHandler);
      }

      this.emit('closed');
    }
  }]);

  return PopupAdapter;
}();