import VVideo from '@pkg/video'
import VSlider from '@pkg/slider'
import pkg from '../package.json'

const install = function(Vue) {
  Vue.component(VSlider.name, VSlider)
  Vue.component(VVideo.name, VVideo)
}
const version = pkg.version
export default {
  install,
  version
}

export { VSlider, VVideo }
