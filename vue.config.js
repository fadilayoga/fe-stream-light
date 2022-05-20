const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const path = require('path')

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/',
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/utils/firebase-messaging-sw.js'),
        filename: 'firebase-messaging-sw.js',
      }),
    ],
    resolve: {
      alias: {
        moment: 'moment/src/moment',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Lightstream'
      return args
    })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/css/main.scss";`,
      },
    },
  },
}
