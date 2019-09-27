const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: `/v-plr/`,
  outputDir: 'dist-example',
  css: { extract: false },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  devServer: {
    progress: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@pkg', resolve('packages'))
      .set('@example', resolve('examples'))
    // 使图片转为base64
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 99999 }))
  }
}
