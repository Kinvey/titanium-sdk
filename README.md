# Kinvey Titanium SDK
[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

## Installation

Download the [Kinvey Titanium SDK](https://download.kinvey.com/js/kinvey-titanium-sdk-3.5.0.min.js) from the Kinvey CDN and save the file to `app/lib`.

#### Using Alloy

Require the file in `app/alloy.js`. The library is globally available under `Alloy.Globals.Kinvey`.

```javascritpt
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-3.5.0');
```

#### Not Using Alloy

Require the file in `Resources/app.js`. The library is globally available under `Kinvey`.

```javascript
var Kinvey = require('kinvey-titanium-3.5.0');
```

## Titanium Compatibility

The Kinvey Titanium SDK supports the following Titanium versions:

- On Titanium: 4.x+

## Documentation

For more detailed documentation, see http://devcenter.kinvey.com/titanium

## License
See [LICENSE](LICENSE) for details.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on reporting bugs and making contributions.
