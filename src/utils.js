export function isiOS() {
  return Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad';
}

export function isAndroid() {
  return Titanium.Platform.osname === 'android';
}

export function isMobileWeb() {
  return Titanium.Platform.name === 'mobileweb';
}
