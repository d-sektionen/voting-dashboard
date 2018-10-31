const path = require('path')

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
