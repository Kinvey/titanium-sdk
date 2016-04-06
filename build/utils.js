'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isiOS = isiOS;
exports.isAndroid = isAndroid;
exports.isMobileWeb = isMobileWeb;
function isiOS() {
  return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
}

function isAndroid() {
  return Titanium.Platform.osname === 'android';
}

function isMobileWeb() {
  return Titanium.Platform.name === 'mobileweb';
}