var webpackConfig = require('@vue/cli-service/webpack.config.js')
module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      // 'test/init.js', // TODO 需要开启debug.html文件才能完成测试
      'modules/**/*.spec.js' //test目录下，所有.spec.js结尾的测试文件
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
    },
    browsers: ['ChromeHeadless'],
    logLevel: config.LOG_INFO,
    client: {
      // 不显示源代码的log
      captureConsole: false
    }
  })
}
