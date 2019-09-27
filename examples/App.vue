<template>
  <div id="app">
    <div class="default-player-wrapper">
      <video-player src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" title="默认组件"></video-player>
    </div>

    <div class="custom-player-wrapper">
      <video-player
        ref="custom-player"
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        @onLoadstart="onLoadstart"
        @onLoadedmetadata="onLoadedmetadata"
        @onPlay="onPlay"
        @onPause="onPause"
        @onPlaying="onPlaying"
        @onTimeupdate="onTimeupdate"
        @onWaiting="onWaiting"
        @onFullscreenChange="onFullscreenChange"
      >
        <div class="custom-controller" @click="onTogglePanel">
          <template v-if="showControls">
            <div class="top-bar">自定义组件</div>
            <img
              v-if="isPlaying"
              class="btn-pause"
              src="@example/assets/img/pause.png"
              @click.stop="onTogglePlay"
            />
            <img
              v-else
              class="btn-play"
              src="@example/assets/img/play.png"
              @click.stop="onTogglePlay"
            />
            <div class="bottom-bar">
              <span>{{currentTime | mediaTime}}</span>
              <slider
                class="slider"
                v-model="progress"
                :buffered="bufferProgress"
                @changeValue="onChangeValue"
              />
              <span>{{duration | mediaTime}}</span>
            </div>
          </template>
        </div>
      </video-player>
    </div>

    <div class="app-version">{{appVersion}}</div>
  </div>
</template>

<script>
import vconsole from 'vconsole'
import 'normalize.css'
import VideoPlayer from '@pkg/video'
import Slider from '@pkg/slider'
import { appVersion, isDev, mediaTime } from '@/utils'

const HIDE_TIME = 1000
isDev && new vconsole()

export default {
  name: 'app',
  components: { VideoPlayer, Slider },
  data() {
    return {
      appVersion,
      isReady: false,
      isPlaying: false,
      isFullscreen: false,
      duration: 0,
      currentTime: 0,
      buffered: 0,
      progress: 0,
      player: null,
      hideTimer: null,
      showControls: true
    }
  },
  computed: {
    bufferProgress() {
      if (this.duration === 0) return 0
      return (this.buffered / this.duration) * 100
    }
  },
  watch: {
    currentTime(val) {
      if (this.duration === 0) return
      this.progress = (val / this.duration) * 100
    },
    isPlaying(val) {
      this.clearHideTimer()
      if (val) {
        this.startHideTimer()
      }
    }
  },
  mounted() {
    this.player = this.$refs['custom-player']
  },
  filters: {
    mediaTime
  },
  methods: {
    startHideTimer() {
      this.hideTimer = setTimeout(() => {
        this.showControls = false
      }, HIDE_TIME)
    },
    clearHideTimer() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer)
        this.hideTimer = null
      }
    },
    //vido-player 组件回调
    onLoadstart() {},
    onLoadedmetadata() {
      this.isReady = true
    },
    onPlay() {
      this.isPlaying = true
    },
    onPause() {
      this.isPlaying = false
    },
    onPlaying() {
      this.isLoading = false
    },
    onTimeupdate(event) {
      const { duration, currentTime, buffered } = event
      this.duration = duration
      this.currentTime = currentTime
      this.buffered = buffered
    },
    onWaiting() {
      this.isLoading = true
    },
    onFullscreenChange(event) {
      this.isFullscreen = event.isFullscreen
    },
    // 自定义组件回调
    async onTogglePanel() {
      this.clearHideTimer()
      this.showControls = !this.showControls
      await this.$nextTick()
      // 播放状态点击面板，自动延时隐藏
      if (this.showControls && this.isPlaying) {
        this.startHideTimer()
      }
    },
    onTogglePlay() {
      this.player.togglePlay()
    },
    onChangeValue(value) {
      if (this.duration === 0) return
      this.player.toggleChangeTime((value / 100) * this.duration)
      this.clearHideTimer()
      if (this.isPlaying) {
        this.startHideTimer()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/flex.scss';

@media (max-width: 500px) {
  #app {
    .custom-player-wrapper {
      margin-top: 20px;
    }
  }
}

@media (min-width: 500px) {
  #app {
    @include flex-row;
    @include align-start;
    @include justify-around;
    .default-player-wrapper,
    .custom-player-wrapper {
      margin-top: 20px;
      width: 40%;
    }
  }
}

#app {
  .custom-player-wrapper {
    .custom-controller {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 14px;
      color: white;
      .btn-play,
      .btn-pause {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .top-bar {
        text-align: center;
        line-height: 30px;
      }
      .bottom-bar {
        @include flex-row;
        @include align-center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 10px;
        .slider {
          margin: 0 12px;
        }
      }
    }
  }
  .app-version {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
