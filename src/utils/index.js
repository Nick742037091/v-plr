import pkg from '../../package.json'
export const appVersion = pkg.version
export const isDev = process.env.NODE_ENV === 'development'

export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

export const setAsyncTimeout = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })

const addZero = number => {
  if (number < 10) {
    return '0' + number
  } else {
    return '' + number
  }
}

export const mediaTime = time => {
  time = Math.ceil(time)
  const aHour = 60 * 60
  const aMinute = 60
  const hour = addZero(Math.floor(time / aHour))
  const minute = addZero(Math.floor((time % aHour) / aMinute))
  const second = addZero(Math.floor(time % aMinute))
  if (Math.floor(time / aHour) > 0) {
    return `${hour}:${minute}:${second}`
  } else if (Math.floor(time / aMinute) > 0) {
    return `${minute}:${second}`
  } else {
    return '00:' + addZero(time)
  }
}
