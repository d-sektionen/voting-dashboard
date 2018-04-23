const path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
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