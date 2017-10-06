var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: /\.(scss|css)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        contentBase: './'
    },
    plugins: (() => {
      let prodArr = []
      if (process.argv.indexOf('-p') !== -1) {
        prodArr = [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production'),
            },
          }),
          new webpack.optimize.UglifyJsPlugin({
            output: {
              comments: false,
            },
          }),
        ];
      }
      return prodArr

    })()
}