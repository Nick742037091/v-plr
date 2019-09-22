import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import App from '@examples/App.vue'
import Video from '@pkg/video'
import VideoControls from '@pkg/video/src/controls'
import { setAsyncTimeout } from '@/utils'

const TIME_OUT = 30 * 1000
const CHECK_PLAY_TIME = 5 * 1000
const FULLSCREEN_TIME = 5 * 1000

const toggleControlPanel = videoControls => {
  const controlPanel = videoControls.find('.video-control-panel')
  it('click panel', function() {
    // trigger 必须放置it之中
    controlPanel.trigger('click')
    if (videoControls.vm.showControls) {
      expect(videoControls.contains('.top-bar')).to.be.true
      expect(videoControls.contains('.bottom-bar')).to.be.true
    } else {
      expect(videoControls.contains('.top-bar')).to.be.false
      expect(videoControls.contains('.bottom-bar')).to.be.false
    }
  })
}

const toggleFullscreen = (videoPlayer, videoControls) => {
  //TODO 不支持触发全屏
  it('click fullscreen button', async function() {
    this.timeout(TIME_OUT)
    const btnFullscreen = videoControls.find('.btn-fullscreen')
    const isFullscreen = videoPlayer.vm.isFullscreen

    await setAsyncTimeout(1000)
    btnFullscreen.trigger('click')
    await setAsyncTimeout(2000)
    if (isFullscreen) {
      expect(videoPlayer.vm.isFullscreen).to.be.false
    } else {
      expect(videoPlayer.vm.isFullscreen).to.be.true
    }
  })
}

const togglePlayBtn = (videoPlayer, videoControls) => {
  it('click play or pause button', async function() {
    this.timeout(TIME_OUT)
    const isPlaying = videoPlayer.vm.isPlaying
    const button = isPlaying
      ? videoControls.find('.btn-pause')
      : videoControls.find('.btn-play')
    await setAsyncTimeout(1000)
    button.trigger('click')
    await setAsyncTimeout(2000)
    if (isPlaying) {
      expect(videoPlayer.vm.isPlaying).to.be.false
    } else {
      expect(videoPlayer.vm.isPlaying).to.be.true
    }
  })
}

describe('App.vue', () => {
  const wrapper = mount(App)
  it('App contains video-player', () => {
    expect(wrapper.contains(Video)).to.be.true
  })
  const videoPlayer = wrapper.find(Video)
  it('video-player contains video-controls', () => {
    expect(videoPlayer.contains(VideoControls)).to.be.true
  })
  const videoControls = videoPlayer.find(VideoControls)
  it('video controls contains control panel', () => {
    expect(videoControls.contains('.video-control-panel')).to.be.true
  })

  toggleControlPanel(videoControls)
  toggleControlPanel(videoControls)

  //TODO 如何测试视频
  // toggleFullscreen(videoPlayer, videoControls)

  // togglePlayBtn(videoPlayer, videoControls)
})
