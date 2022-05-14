const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  outputDir : 'C:/inetpub/stream-light-backend/dist',
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/utils/firebase-messaging-sw.js'),
        filename: 'firebase-messaging-sw.js'
      }),
    ]
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/css/main.scss";`
      },
    }
  },
}
