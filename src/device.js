export default class Device {
  static isAndroid() {
    return Ti.Platform.osname === 'android';
  }

  static isiOS() {
    return Device.isiPhone() || Device.isiPad();
  }

  static isiPhone() {
    return Ti.Platform.osname === 'iphone';
  }

  static isiPad() {
    return Ti.Platform.osname === 'ipad';
  }
}
