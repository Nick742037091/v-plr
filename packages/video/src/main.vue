<template>
  <div class="video-wrapper" :style="wrapperStyle">
    <div class="video-block">
      <video ref="player" :src="src" webkit-playsinline="true" playsinline="true" />
    </div>
    <div v-if="$slots.default" class="slot-block">
      <slot />
    </div>

    <controls
      v-if="!$slots.default &&  !nativeControls"
      :current-time="currentTime"
      :duration="duration"
      :buffered="buffered"
      :is-playing="isPlaying"
      :is-loading="isLoading"
      :is-fullscreen="isFullscreen"
      @togglePlay="togglePlay"
      @toggleFullScreen="toggleFullScreen"
      @changeTime="toggleChangeTime"
      :title="title"
    />
  </div>
</template>

<script>
import Controls from './controls'
import { on, off } from '@/utils'
import browser from '@/utils/browser'
import { mediaEvents, videoEvents } from '@/utils/event'
import fullscreen from '@/utils/fullscreen'

export default {
  name: 'VVideo',
  components: { Controls },
  props: {
    src: {
      type: String,
      default: ''
    },
    ratio: {
      type: Number,
      default: 16 / 9
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null,
      isReady: false,
      isPlaying: false,
      isLoading: false,
      isFullscreen: false,
      currentTime: 0,
      duration: 0,
      buffered: 0
    }
  },
  computed: {
    wrapperStyle() {
      return {
        paddingBottom: (1 / this.ratio) * 100 + '%'
      }
    },
    playProgerss() {
      if (this.duration === 0) return 0
      return this.currentTime / this.duration
    },
    nativeControls() {
      // 1.微信安卓video控件在播放之后会覆盖自定义控件，默认全屏播放
      // 2.微信iOS video播放之后才能切换全屏
      // 3.QQ浏览器video控件播放之后会覆盖自定义控件
      return browser.isAndroid && browser.isWechat
    }
  },
  mounted() {
    const player = this.$refs['player']
    this.player = player
    on(this.player, mediaEvents.loadstart, this.onLoadstart)
    on(this.player, mediaEvents.canplay, this.onCanplay)
    on(this.player, mediaEvents.play, this.onPlay)
    on(this.player, mediaEvents.playing, this.onPlaying)
    on(this.player, mediaEvents.pause, this.onPause)
    on(this.player, mediaEvents.timeupdate, this.onTimeupdate)
    on(this.player, mediaEvents.waiting, this.onWaiting)
    on(this.player, mediaEvents.ended, this.onEnded)
    on(this.player, mediaEvents.error, this.onError)
    fullscreen.onChange(this.player, this.onFullscreenChange)
  },
  destroyed() {
    off(this.player, mediaEvents.loadstart, this.onLoadstart)
    off(this.player, mediaEvents.play, this.onPlay)
    off(this.player, mediaEvents.playing, this.onPlaying)
    off(this.player, mediaEvents.pause, this.onPause)
    off(this.player, mediaEvents.timeupdate, this.onTimeupdate)
    off(this.player, mediaEvents.waiting, this.onWaiting)
    off(this.player, mediaEvents.ended, this.onEnded)
    off(this.player, mediaEvents.error, this.onError)
    fullscreen.offChange(this.player, this.onFullscreenChange)
  },
  methods: {
    /* 原生回调事件 */
    onLoadstart() {
      this.$emit(videoEvents.onLoadstart)
    },
    onCanplay() {
      this.isReady = true
      this.$emit(videoEvents.onCanplay)
    },
    onPlay() {
      this.isPlaying = true
      this.$emit(videoEvents.onPlay)
    },
    onPlaying() {
      this.isLoading = false
      this.$emit(videoEvents.onPlaying)
    },
    onPause() {
      this.isPlaying = false
      this.$emit(videoEvents.onPause)
    },
    onTimeupdate() {
      const duration = (this.duration = this.player.duration)
      const currentTime = (this.currentTime = this.player.currentTime)
      const buffered = (this.buffered = this.player.buffered.end(0))
      this.$emit(videoEvents.onTimeupdate, { duration, currentTime, buffered })
    },
    onWaiting() {
      this.isLoading = true
      this.$emit(videoEvents.onWaiting)
    },
    onEnded() {
      this.$emit(videoEvents.onEnded)
    },
    onError() {
      this.$emit(videoEvents.onError)
    },
    onFullscreenChange(event) {
      this.isFullscreen = event.isFullscreen
      this.$emit(videoEvents.onFullscreenChange, event)
    },
    /* 组件回调事件 */
    togglePlay() {
      if (!this.isPlaying) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    async toggleFullScreen() {
      fullscreen.toggle(this.player)
    },
    toggleChangeTime(time) {
      //TODO 节流
      this.player.currentTime = time
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  background-color: black;
  .video-block {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    video {
      width: 100%;
    }
  }
  .slot-block {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
}
</style>