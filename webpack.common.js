const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const extractCss = new ExtractTextPlugin({
  filename: 'bundle.[contenthash].css',
})

module.exports = {
  // Startpunk och slutpunkt för all Javascript i vårt projekt.
  // Alltså börja i denna fil, hitta alla dependencies (imports)
  // och släng ihop allt till en fil, vanligtvis kallad bundle.js
  entry: [
    './src/js/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/', // Används av webpack-dev-server
  },
  // För de här vägarna kommer webpack leta efter filer när den stöter på imports.
  // Gör så att man kan skriva absoluta vägar istället för relativa,
  // tex 'import utils' istället för 'import ../utils'
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./src/css'),
      path.resolve('.'),
      path.resolve('./node_modules'),
    ],
  },
  // Moduler, körs när koden söks igenom.
  // Här kollar vi vilka filer som laddas in med ett regex-test,
  // sedan gör vi någon transformation på den filen.
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
              cacheDirectory: true,
            },
          },
        ],
      },
      // HTML-filer
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // CSS
      {
        test: /\.css$/,
        loader: extractCss.extract('css-loader'),
      },
      // Fonter
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  // Plugins - görs efter alla filer har körts igenom med modulerna.
  // Här händer saker som till exempel kopiering av bilder
  // och minifiering av kod
  plugins: [
    new CleanWebpackPlugin(['dist']), // Ta bort dist-mappen (resar bort gammla filer)
    extractCss, // Lägg all CSS du har hittat i en fil
    new CopyWebpackPlugin([ // Kopiera bilderna
      {
        from: 'src/images',
        to: 'images/',
      },
    ]),
    new HtmlWebpackPlugin({ // Stoppa in referencer till JS och CSS-filerna i vårt index.html
      template: 'src/index.html',
      favicon: 'src/images/favicon.ico',
    }),
  ],
  stats: {
    colors: true,
  },
}
