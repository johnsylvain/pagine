module.exports = {
  entry: './src/index.js',
  output: {
    filename: './lib/pagine.js',
    // export to AMD, CommonJS, or window
    libraryTarget: 'umd',
    // the name exported to window
    library: 'Pagine'
  }
};
