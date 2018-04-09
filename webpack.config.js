const path = require('path')

module.exports = {
  // Startpunk och slutpunkt för all Javascript i vårt projekt.
  // Alltså börja i denna fil, hitta alla dependencies (imports)
  // och släng ihop allt till en fil, vanligtvis kallad bundle.js
  entry: [
    './src/js/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js'
    // publicPath: './',
  },
  // De här vägarna kommer webpack leta efter filer när den stöter på imports.
  // Gör så att man kan skriva absoluta vägar istället för relativa,
  // tex 'import utils' istället för 'import ../../utils'
  resolve: {
    modules: [
      path.resolve('src', 'js'),
      'node_modules'
    ]
  },
  // Moduler, körs när koden söks igenom.
  // Här kollar vi vilka filer som laddas in med ett regex-test,
  // sedan gör vi någon typ av transformation på den filen.
  // Tex att kompilera alla JS-filer med babel
  module: {
    loaders: [
      // För JSX (react) och ES6 som kompileras ner till ES5.
      // Detta gör för att alla webbläsare inte stödjer ES6 än
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
}
