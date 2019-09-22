const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const outputDir = 'v-plr'
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: `/${outputDir}/`,
  outputDir,
  // 支持真机调试
  devServer: {
    proxy: 'http://localhost:8081',
    public: '192.168.0.121:8081' // 本地ip
  },
  css: { extract: false },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@pkg', resolve('packages'))
      .set('@examples', resolve('examples'))
    // 使图片转为base64
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 99999 }))
  }
}
