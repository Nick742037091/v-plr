import Video from '@pkg/video'
import pkg from '../package.json'

const install = function(Vue) {
  Vue.component(Video.name, Video)
}
const version = pkg.version
export default {
  install,
  version,
  // 支持通过babel-plugin-component 进行单独导出
  Video
}
