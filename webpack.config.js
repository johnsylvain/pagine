var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'pagine.js',
    // export to AMD, CommonJS, or window
    libraryTarget: 'umd',
    // the name exported to window
    library: 'Pagine'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
