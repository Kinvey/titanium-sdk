# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.8.1](https://github.com/Kinvey/titanium-sdk/tree/v3.8.1) (2017-08-25)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.8.0...v3.8.1)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
- Updated [kinvey-js-sdk](https://github.com/Kinvey/js-sdk) dependency to [3.8.1](https://github.com/Kinvey/js-sdk/tree/v3.8.1)

### Merged Pull Requests
- Fix Initialize [#13](https://github.com/Kinvey/titanium-sdk/pull/13)

### Closed Issues
_None_

## [3.8.0](https://github.com/Kinvey/titanium-sdk/tree/v3.8.0) (2017-08-23)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.7.2...v3.8.0)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
- Updated [kinvey-js-sdk](https://github.com/Kinvey/js-sdk) dependency to [3.8.0](https://github.com/Kinvey/js-sdk/tree/v3.8.0)

### Merged Pull Requests
- Active User Storage [#12](https://github.com/Kinvey/titanium-sdk/pull/12)

### Closed Issues
_None_

## [3.5.2](https://github.com/Kinvey/titanium-sdk/tree/v3.5.2) (2017-07-08)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.5.1...v3.5.2)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
- Fixed bug caused by database connections left open.
- Updated [kinvey-js-sdk](https://github.com/Kinvey/js-sdk) dependency to [3.5.2](https://github.com/Kinvey/js-sdk/tree/v3.5.2)

### Merged Pull Requests
- Fix DB Bug [#11](https://github.com/Kinvey/titanium-sdk/pull/11)

### Closed Issues
- KInvey User Sign Up throws a 500 error [#10](https://github.com/Kinvey/titanium-sdk/issues/10)

## [3.5.0](https://github.com/Kinvey/titanium-sdk/tree/v3.5.0) (2017-04-24)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.4.5...v3.5.0)<br/>

### Added
_None_

### Removed
_None_

### Changed
- Registered `Popup` class using new `usePopupClass()` static function on `User` class. Removed config in `webpack.config` used to replace the `Popup` class when a bundle is generated. This makes it easier for other people to utilize the SDK with their own `Webpack` and `Browserify` bundles.
- Update [kinvey-js-sdk](https://www.npmjs.com/package/kinvey-js-sdk) dependency to [v3.5.0](https://github.com/Kinvey/js-sdk/tree/v3.5.0).

### Merged Pull Requests
- Register Popup [#8](https://github.com/Kinvey/titanium-sdk/pull/8)
- Update Storage Adapters [#9](https://github.com/Kinvey/titanium-sdk/pull/9)

### Closed Issues
_None_

## [v3.4.5](https://github.com/Kinvey/titanium-sdk/tree/v3.4.5) (2017-04-13)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.4.4...v3.4.5)<br/>

**Changes:**
- Updated package dependencies.

## [v3.4.4](https://github.com/Kinvey/titanium-sdk/tree/v3.4.4) (2017-03-27)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.4.3...v3.4.4)<br/>

**Changes:**
- Bumping version to keep the same as other Kinvey SDKs.

## [v3.4.3](https://github.com/Kinvey/titanium-sdk/tree/v3.4.3) (2017-03-27)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.4.2...v3.4.3)<br/>

**Changes:**
- Updated package dependencies.

## [v3.4.2](https://github.com/Kinvey/titanium-sdk/tree/v3.4.2) (2017-03-16)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.4.1...v3.4.2)<br/>

**Changes:**
- Updated package dependencies.

## [v3.3.5](https://github.com/Kinvey/titanium-sdk/tree/v3.3.5) (2016-01-25)
[Full Changelog](https://github.com/Kinvey/titanium-sdk/compare/v3.2.5...v3.3.5)<br/>

**Updated Dependencies:**
- Updated `kinvey-node-sdk` to `v3.3.5`.

## [v3.2.5](https://github.com/Kinvey/kinvey-nodejs/tree/v3.2.5) (2016-12-14)

**Bug fixes:**
- Do not require `ti.cloudpush` module on the iOS platform.

## [v3.2.4](https://github.com/Kinvey/kinvey-nodejs/tree/v3.2.4) (2016-12-13)

**Bug fixes:**
- Require `ti.cloudpush` modules properly to receive push notifications on the Android platform.

## [v3.2.3](https://github.com/Kinvey/kinvey-nodejs/tree/v3.2.3) (2016-10-26)

**Bug fixes:**
- Fix typo of `CacheRequest` in `Push` module.

## [v3.2.2](https://github.com/Kinvey/kinvey-nodejs/tree/v3.2.2) (2016-10-12)

**Bug fixes:**
- Return entity that was removed with `removeById` rather then the object `{ count: 1, entities: <entity> }`.

### 3.2.1 (2016-10-06)
* Fix push notifications and add interactive notifications.

### 3.1.0 (2016-09-12)
* Enhancement: Restructure files.
* Enhancement: Export files.
