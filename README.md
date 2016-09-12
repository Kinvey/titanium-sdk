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
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-sdk.min');
```

If you are not using the Alloy framework, add the snippet below to `Resources/app.js`. The SDK is globally available under Kinvey.

```javascript
var Kinvey = require('kinvey-titanium-sdk.min');
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
The simplest way to build the sdk is by running `gulp`. More advanced tasks are available.

* `gulp build`: build the sdk
* `gulp bump`: bump the pacakge version. Please see [Flags](#Flags).
* `gulp bundle`: bundle the sdk for dist
* `gulp clean`: remove files created by the build process
* `gulp lint`: lint the src files
* `gulp tag`: create a git tag for the version
* `gulp upload`: upload dist files to AWS S3

#### Flags
The following flags are available when running `gulp bump`:

* `--type <major|minor|patch|prerelease>`: Bumps the package version using the [Semantic Version 2.0.0](http://semver.org/) spec. Defaults to `patch`.
* `--version <version>`: Sets the package version to the provided version.

## Test

You can run the tests using `npm test`.

## Release
The workflow for releasing a new version of the sdk is as follows:

1. Commit all changes on the develop branch.
2. Checkout the master branch and merge the develop branch.
3. Update the [Changelog](CHANGELOG.md).
4. Run `gulp bump --type <type>` replacing `<type>` with major, minor, patch, or prerelease. See [Flags](#Flags) above.
5. Run `gulp bundle` and commit file changes.
6. Make sure all changes are committed on the master branch and push.
7. Checkout the develop branch and merge the master branch.
8. Tag the version with git.
9. Update Dev Center and Sample apps.

*Note: The [Titanium Release Job](https://build.kinvey.com/jenkins/view/Libraries/job/titanium-sdk-release/) will upload the build to [AWS S3](https://aws.amazon.com/s3/) and publish the [pacakge](https://www.npmjs.com/package/kinvey-html5-sdk) on NPM.*

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
