const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // Används för single page apps (SPA).
  // Förmodligen inte relevant i detta projekt.
  devServer: {
    historyApiFallback: true,
  },
  // Mappa den kod du faktist skrev till den kod som genereras.
  // Ett måste när man debuggar, finns olika 'lägen' som
  // väger snabbhet av webpack-kompliering mot hur bra kvalite man
  // får på sina error-meddelanden.
  // En komplett lista finns här https://webpack.js.org/configuration/devtool/
  // Tex är detta ett läge som är en relativt snabbt men som
  // bara visar den rad som erroret kom på.
  devtool: 'cheap-module-eval-source-map',
})
