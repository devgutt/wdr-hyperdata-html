const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV;

let version = 'master';
if (mode == 'prod') {
  version = require('./package.json').version;
}
console.log('version:', version);

module.exports = {
  mode: mode == 'prod' ? 'production' : 'development',
  devtool: mode == 'prod' ? false : 'eval-cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `hyperdata-html-${mode == 'prod' ? version : 'dev'}.js`
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      }
    ]
  }
}

