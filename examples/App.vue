<template>
  <div id="app">
    <video-player src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" title="video-player"></video-player>
    <div class="app-version">{{appVersion}}</div>
  </div>
</template>

<script>
import vconsole from 'vconsole'
import 'normalize.css'
import VideoPlayer from '@pkg/video'
import { appVersion, isDev } from '@/utils'
isDev && new vconsole()

export default {
  name: 'app',
  components: { VideoPlayer },
  data() {
    return {
      appVersion
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
#app {
  .app-version {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
