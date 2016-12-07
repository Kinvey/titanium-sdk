# Kinvey Titanium SDK
[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

This node and bower module makes it very easy to connect your Titanium app with Kinvey.

## How to use

#### 1. Sign up for Kinvey
To use the SDK, sign up for Kinvey if you have not already done so. Go to the [sign up](https://console.kinvey.com/#signup) page, and follow the steps provided.

#### 2. Install the SDK
Download the sdk by visiting the [Titanium Downloads Page](http://devcenter.kinvey.com/titanium-v3.0/downloads) and add it to your project. Preferably, put it in a directoy named `app/lib`. Make sure the `lib` directory is located inside your `app` directory otherwise you might receive an error that the Kinvey SDK is not build for arm64.

#### 3. Configure the SDK
If you are using the Alloy framework, add the snippet below to `app/alloy.js`. The SDK is now globally available under `Alloy.Globals.Kinvey`.

```javascript
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-sdk');
```

If you are not using the Alloy framework, add the snippet below to `Resources/app.js`. The SDK is globally available under Kinvey.

```javascript
var Kinvey = require('kinvey-titanium-sdk');
```

Next, use `Kinvey.init` to configure your app. Replace `<appKey>` and `<appSecret>` with your apps app key and secret. You can find these for your app using the [Kinvey Console App](https://console.kinvey.com).

```javascript
Kinvey.init({
    appKey: '<appKey>',
    appSecret: '<appSecret>'
});
```

#### 4. Verify Set Up
You can use the following snippet to verify the app credentials were entered correctly. This function will contact the backend and verify that the SDK can communicate with your app.

```javascript
Kinvey.ping().then(function(response) {
  console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
}).catch(function(error) {
  console.log('Kinvey Ping Failed. Response: ' + error.message);
});
```

## What’s next?
You are now ready to start building your awesome apps! Next we recommend diving into the [User guide](http://devcenter.kinvey.com/titanium-v3.0/guides/users) or [Data store guide](http://devcenter.kinvey.com/titanium-v3.0/guides/datastore) to learn more about our service, or explore the [sample apps](http://devcenter.kinvey.com/titanium-v3.0/samples) to go straight to working projects.

## Build
`npm run build`

## Release
[TravisCI](https://travis-ci.org/Kinvey/titanium-sdk) will deploy the pacakge to [NPM](https://www.npmjs.com/package/kinvey-titanium-sdk).

1. Checkout the master branch.
2. Update the CHANGELOG.md.
3. Execute `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]`. See [Version Management](#version-management) for more info on incrementing the version.

### Version Management
Updating the package version should follow [Semantic Version 2.0.0](http://semver.org/):

* Major (x.0.0): when making an incompatible API changes.
* Minor (3.x.0): when adding functionality in a backwards-compatible manner.
* Patch (3.0.x): when making backwards-compatible bug fixes or enhancements.

## Test
_Note: Before running any tests you will need to run `npm install` to install any dependencies required._

### Unit Tests
`npm test`

## License

    Copyright 2016 Kinvey, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
