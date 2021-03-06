'use strict'

const path = require('path')

module.exports = {
  dev: {

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wx': {
      	target: 'https://qyapi.weixin.qq.com',
        changeOrigin: true,
      	pathRewrite: {"^/wx": ""} // 将/api重写为""空字符串
      }
    },

    host: 'localhost',
    port: 9000,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    useEslint: true,
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    devtool: 'cheap-module-eval-source-map',

    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
