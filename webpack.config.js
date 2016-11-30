/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var BANNER = '/**\n'
  + ' * @preserve\n'
  + ' * ' + pkg.name + ' v' + pkg.version + '\n'
  + ' * ' + pkg.description + '\n'
  + ' * ' + pkg.homepage + '\n'
  + ' *\n'
  + ' * Copyright (c) 2016, ' + pkg.author + '.\n'
  + ' * All rights reserved.\n'
  + ' *\n'
  + ' * Released under the ' + pkg.license + ' license.\n'
  + ' */\n';

module.exports = {
  context: path.join(__dirname, 'dist'),
  entry: ['core-js/es6/symbol', './webpack.js'],
  externals: {
    'ti.cloudpush': 'ti.cloudpush'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  output: {
    filename: pkg.name + '.js',
    libraryTarget: 'umd',
    library: 'Kinvey',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.BannerPlugin(BANNER, { raw: true })
  ]
};
