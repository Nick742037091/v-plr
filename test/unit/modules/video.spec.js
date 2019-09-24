import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Video from '@pkg/video'
import VideoControls from '@pkg/video/src/controls'
import { HalfCircleSpinner as Spinner } from 'epic-spinners'
import { setAsyncTimeout } from '@/utils'

describe('Video', () => {
  Vue.use(Video)
  const video = mount(Video, {
    propsData: {
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      title: 'test-video',
      ratio: 16 / 9
    }
  })
  const videoControls = video.find(VideoControls)

  it('video on load start', async function() {
    video.vm.onLoadstart()
  })

  it('video toggle play', async function() {
    video.vm.togglePlay()
  })
  it('video toggle fullscreen', async function() {
    video.vm.toggleFullScreen()
  })

  it('video toggle on fullscreenChange', async function() {
    video.vm.onFullscreenChange({ isFullscreen: true })
    expect(video.vm.isFullscreen).to.be.true
  })

  // it('video on time update', async function() {
  //   video.vm.onTimeupdate()
  // })

  it('video on play', async function() {
    video.vm.onPlay()
    expect(video.vm.isPlaying).to.be.true
  })

  it('video on waiting', async function() {
    video.vm.onWaiting()
    expect(videoControls.contains(Spinner)).to.be.true
  })

  it('video on playing', async function() {
    video.vm.onPlaying()
    expect(videoControls.contains(Spinner)).to.be.false
  })

  it('video on pause', async function() {
    video.vm.onPause()
    expect(video.vm.isPlaying).to.be.false
  })

  it('video click panel', function() {
    videoControls.trigger('click')
    if (videoControls.vm.showControls) {
      expect(videoControls.contains('.top-bar')).to.be.true
      expect(videoControls.contains('.bottom-bar')).to.be.true
    } else {
      expect(videoControls.contains('.top-bar')).to.be.false
      expect(videoControls.contains('.bottom-bar')).to.be.false
    }
  })

  video.setData({ duration: 100 })
  it('video change value', function() {
    videoControls.vm.onChangeValue(30)
    expect(video.vm.player.currentTime).to.be.equal(30)
  })
})
