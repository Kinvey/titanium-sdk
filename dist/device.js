'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// export function isTitanium() {
//   return typeof Titanium !== 'undefined';
// }

// export function isiOS() {
//   if (isTitanium()) {
//     return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
//   }

//   return /iPad|iPhone|iPod/.test(global.navigator.userAgent) && !window.MSStream;
// }

// export function isAndroid() {
//   if (isTitanium()) {
//     return Titanium.Platform.osname === 'android';
//   }

//   return /Android/.test(global.navigator.userAgent);
// }

// export function isBrowser() {
//   if (isTitanium()) {
//     return Titanium.Platform.name === 'mobileweb';
//   }

//   return !isiOS() && !isAndroid();
// }

// Helper function to detect the browser name and version.
function browserDetect(ua) {
  // Cast arguments.
  ua = ua.toLowerCase();

  // User-Agent patterns.
  var rChrome = /(chrome)\/([\w]+)/;
  var rFirefox = /(firefox)\/([\w.]+)/;
  var rIE = /(msie) ([\w.]+)/i;
  var rOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
  var rSafari = /(safari)\/([\w.]+)/;

  return rChrome.exec(ua) || rFirefox.exec(ua) || rIE.exec(ua) || rOpera.exec(ua) || rSafari.exec(ua) || [];
}

function deviceInformation() {
  var id = global.Titanium.Platform.getId();
  var browser = void 0;
  var platform = void 0;
  var version = void 0;
  var manufacturer = void 0;
  var libraries = [];

  // Platforms.
  libraries.push('titanium/' + global.Titanium.getVersion());

  // If mobileweb, extract browser information.
  if (global.Titanium.Platform.getName() === 'mobileweb') {
    browser = browserDetect(global.Titanium.Platform.getModel());
    platform = browser[1];
    version = browser[2];
    manufacturer = global.Titanium.Platform.getOstype();
  } else {
    platform = global.Titanium.Platform.getOsname();
    version = global.Titanium.Platform.getVersion();
    manufacturer = global.Titanium.Platform.getManufacturer();
  }

  // Return the device information string.
  var parts = ['js-' + _package2.default.name + '/' + _package2.default.version];

  if (libraries.length !== 0) {
    // Add external library information.
    parts.push('(' + libraries.sort().join(', ') + ')');
  }

  return parts.concat([platform, version, manufacturer, id]).map(function (part) {
    if (part) {
      return part.toString().replace(/\s/g, '_').toLowerCase();
    }

    return 'unknown';
  }).join(' ');
}

var Device = function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  _createClass(Device, null, [{
    key: 'toString',
    value: function toString() {
      return deviceInformation();
    }
  }]);

  return Device;
}();

exports.default = Device;