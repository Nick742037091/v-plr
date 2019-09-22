import Video from './src/main.vue'

Video.install = function(Vue) {
  Vue.component(Video.name, Video)
}

export default Video
