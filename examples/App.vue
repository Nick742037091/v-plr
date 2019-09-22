<template>
  <div id="app">
    <video-player src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" title="example"></video-player>
  </div>
</template>

<script>
import vconsole from 'vconsole'
import 'normalize.css'
import VideoPlayer from '@pkg/video'
new vconsole()
export default {
  name: 'app',
  components: { VideoPlayer },
  mounted() {}
}
</script>

<style>
#app {
}
</style>
