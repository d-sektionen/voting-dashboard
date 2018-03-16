const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Mappa den kod du faktist skrev till den kod som genereras.
  // Ett måste när man debuggar, finns olika 'lägen' som
  // väger snabbhet av webpack-kompliering mot hur bra kvalite man
  // får på sina error-meddelanden.
  // En komplett lista finns här https://webpack.js.org/configuration/devtool/
  // Tex är detta ett läge som är en relativt snabbt men som
  // bara visar den rad som erroret kom på.
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT,
  },
  plugins: [
    // Indikera för frontend om vi är i development eller production-mode.
    // Används i config-filen för att bestämma vilken url vi ska använda för API:t.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
})
