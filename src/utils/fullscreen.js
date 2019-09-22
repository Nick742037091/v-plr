const document =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
    ? window.document
    : {}

//参考api https://blog.csdn.net/Lee_0220/article/details/82187905
// https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/%E6%8C%87%E5%8D%97

const BROWER_TYPE = {
  STANDARD: 'standand',
  WEBKIT: 'webkit', //Safari/Chrome/Opera/Edge
  NEW_WEBKIT: 'newWebkit', //mobile ios webkit
  FIREFOX: 'firfox',
  IE: 'ie'
}

const API_TARGET = {
  DOCUMENT: 'document',
  VIDEO: 'video'
}

const API_MAP = {
  standand: {
    enter: { api: 'requestFullscreen', target: API_TARGET.VIDEO },
    exit: { api: 'exitFullscreen', target: API_TARGET.DOCUMENT },
    onChange: { api: 'onfullscreenchange', target: API_TARGET.DOCUMENT },
    element: { api: 'fullscreenElement', target: API_TARGET.DOCUMENT }
  },
  webkit: {
    enter: { api: 'webkitRequestFullscreen', target: API_TARGET.VIDEO },
    exit: { api: 'webkitExitFullscreen', target: API_TARGET.DOCUMENT },
    onChange: { api: 'onwebkitfullscreenchange', target: API_TARGET.DOCUMENT },
    element: { api: 'webkitFullscreenElement', target: API_TARGET.DOCUMENT }
  },
  newWebkit: {
    enter: { api: 'webkitEnterFullscreen', target: API_TARGET.VIDEO },
    exit: { api: 'webkitExitFullscreen', target: API_TARGET.VIDEO },
    onEnter: { api: 'webkitbeginfullscreen', target: API_TARGET.VIDEO },
    onExit: { api: 'webkitendfullscreen', target: API_TARGET.VIDEO },
    active: { api: 'webkitDisplayingFullscreen', target: API_TARGET.VIDEO }
  },
  firfox: {
    enter: { api: 'mozRequestFullScreen', target: API_TARGET.VIDEO },
    exit: { api: 'mozCancelFullScreen', target: API_TARGET.DOCUMENT },
    onChange: { api: 'onmozfullscreenchange', target: API_TARGET.DOCUMENT },
    element: { api: 'mozFullScreenElement', target: API_TARGET.DOCUMENT }
  },
  ie: {
    enter: { api: 'msRequestFullscreen', target: API_TARGET.VIDEO },
    exit: { api: 'msExitFullscreen', target: API_TARGET.DOCUMENT },
    onChange: { api: 'onMSFullscreenChange', target: API_TARGET.DOCUMENT },
    element: { api: 'msFullscreenElement', target: API_TARGET.DOCUMENT }
  }
}

class Fullscreen {
  constructor() {
    this.changeHandlers = null
    this.newWebkitChangeHanlders = new Map()
    this.preChangeHandler = null
  }

  get browerType() {
    if ('fullscreenEnabled' in document) {
      return BROWER_TYPE.STANDARD
    }

    if ('webkitFullscreenEnabled' in document) {
      return BROWER_TYPE.WEBKIT
    }

    if ('mozFullScreenEnabled' in document) {
      return BROWER_TYPE.FIREFOX
    }

    if ('msFullscreenEnabled' in document) {
      return BROWER_TYPE.IE
    }

    return BROWER_TYPE.NEW_WEBKIT
  }

  isActive(video) {
    console.log(this.browerType)
    if (this.browerType === BROWER_TYPE.NEW_WEBKIT) {
      // 通过webkitDisplayingFullscreen 判断全屏状态
      const { element, api } = this.getApi(video, 'active')
      return element[api]
    } else {
      // fullScreenElement 元素是视频元素，处于全屏状态
      const { element, api } = this.getApi(video, 'element')
      return element[api] === video
    }
  }

  getApi(video, key) {
    const { target, api } = API_MAP[this.browerType][key]
    const element = target === API_TARGET.DOCUMENT ? document : video
    return { element, api }
  }

  async enter(video) {
    const { element, api } = this.getApi(video, 'enter')
    element[api]()
  }

  async exit(video) {
    const { element, api } = this.getApi(video, 'exit')
    element[api]()
  }

  toggle(video) {
    if (this.isActive(video)) {
      console.log('exitFullScreen')
      this.exit(video)
    } else {
      console.log('enterFullScreen')
      this.enter(video)
    }
  }

  onChange(video, callback) {
    if (this.browerType === BROWER_TYPE.NEW_WEBKIT) {
      const changeEvent = () => callback({ isFullscreen: this.isActive(video) })
      this.newWebkitChangeHanlders.set(callback, changeEvent)
      const enter = this.getApi(video, 'onEnter')
      const exit = this.getApi(video, 'onExit')
      enter.element.addEventListener(enter.api, changeEvent)
      enter.element.addEventListener(exit.api, changeEvent)
    } else {
      const { element, api } = this.getApi(video, 'onChange')
      if (!this.changeHandlers) {
        this.preChangeHandler = element[api]
        this.changeHandlers = new Set()
      }
      this.changeHandlers.add(callback)
      element[api] = () => {
        this.preChangeHandler &&
          this.preChangeHandler({ isFullscreen: this.isActive(video) })
        for (let handler of this.changeHandlers) {
          handler && handler({ isFullscreen: this.isActive(video) })
        }
      }
    }
  }

  offChange(video, callback) {
    if (this.browerType === BROWER_TYPE.NEW_WEBKIT) {
      const changeEvent = this.newWebkitChangeHanlders.get(callback)
      const enter = this.getApi(video, 'onEnter')
      const exit = this.getApi(video, 'onExit')
      enter.element.removeEventListener(enter.api, changeEvent)
      exit.element.removeEventListener(exit.api, changeEvent)
      this.newWebkitChangeHanlders.delete(callback)
    } else {
      if (this.changeHandlers && this.changeHandlers.has(callback)) {
        this.changeHandlers.delete(callback)
      }
    }
  }
}

export default new Fullscreen()
