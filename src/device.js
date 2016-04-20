import packageJSON from 'json-loader!../package.json';

/**
 * @private
 */
export class DeviceAdapter {
  toJSON() {
    return {
      device: {
        manufacturer: Titanium.Platform.manufacturer,
        model: Titanium.Platfrom.model
      },
      environment: 'titanium',
      library: {
        name: 'titanium',
        version: Titanium.getVersion()
      },
      os: {
        name: Titanium.Platfrom.osname,
        version: Titanium.Platfrom.version
      },
      sdk: {
        name: packageJSON.name,
        version: packageJSON.version
      }
    };
  }
}
