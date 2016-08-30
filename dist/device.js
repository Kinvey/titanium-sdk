'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Device = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isTitanium = isTitanium;
exports.isiOS = isiOS;
exports.isAndroid = isAndroid;
exports.isBrowser = isBrowser;

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isTitanium() {
  return typeof Titanium !== 'undefined';
}

function isiOS() {
  if (isTitanium()) {
    return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
  }

  return (/iPad|iPhone|iPod/.test(global.navigator.userAgent) && !window.MSStream
  );
}

function isAndroid() {
  if (isTitanium()) {
    return Titanium.Platform.osname === 'android';
  }

  return (/Android/.test(global.navigator.userAgent)
  );
}

function isBrowser() {
  if (isTitanium()) {
    return Titanium.Platform.name === 'mobileweb';
  }

  return !isiOS() && !isAndroid();
}

/**
 * @private
 */

var Device = exports.Device = function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  _createClass(Device, null, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        device: {
          manufacturer: Titanium.Platform.manufacturer,
          model: Titanium.Platfrom.model
        },
        platform: {
          name: 'titanium',
          version: Titanium.getVersion()
        },
        os: {
          name: Titanium.Platfrom.osname,
          version: Titanium.Platfrom.version
        },
        kinveySDK: {
          name: _package2.default.name,
          version: _package2.default.version
        }
      };
    }
  }]);

  return Device;
}();