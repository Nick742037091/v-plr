// 原生事件
export const mediaEvents = {
  abort: 'abort', //在播放被终止时触发,例如, 当播放中的视频重新开始播放时会触发这个事件。
  canplay: 'canplay', //在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发。这个事件对应CAN_PLAY的readyState。
  canplaythrough: 'canplaythrough', //在媒体的readyState变为CAN_PLAY_THROUGH时触发，表明媒体可以在保持当前的下载速度的情况下不被中断地播放完毕。注意：手动设置currentTime会使得firefox触发一次canplaythrough事件，其他浏览器或许不会如此。
  durationchange: 'durationchange', //元信息已载入或已改变，表明媒体的长度发生了改变。例如，在媒体已被加载足够的长度从而得知总长度时会触发这个事件。
  emptied: 'emptied', //媒体被清空（初始化）时触发。
  ended: 'ended', //播放结束时触发。
  error: 'error', //在发生错误时触发。元素的error属性会包含更多信息。
  loadeddata: 'loadeddata', //媒体的第一帧已经加载完毕。
  loadedmetadata: 'loadedmetadata', //媒体的元数据已经加载完毕，现在所有的属性包含了它们应有的有效信息。
  loadstart: 'loadstart', //在媒体开始加载时触发。
  mozaudioavailable: 'mozaudioavailable', //当音频数据缓存并交给音频层处理时
  pause: 'pause', //播放暂停时触发。
  play: 'play', //在媒体回放被暂停后再次开始时触发。即，在一次暂停事件后恢复媒体回放。
  playing: 'playing', //在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始）。
  progress: 'progress', //告知媒体相关部分的下载进度时周期性地触发。有关媒体当前已下载总计的信息可以在元素的buffered属性中获取到。
  ratechange: 'ratechange', //在回放速率变化时触发。
  seeked: 'seeked', //在跳跃操作完成时触发。
  seeking: 'seeking', //在跳跃操作开始时触发。
  stalled: 'stalled', //在尝试获取媒体数据，但数据不可用时触发。
  suspend: 'suspend', //在媒体资源加载终止时触发，这可能是因为下载已完成或因为其他原因暂停。
  timeupdate: 'timeupdate', //元素的currentTime属性表示的时间已经改变。
  volumechange: 'volumechange', //在音频音量改变时触发（既可以是volume属性改变，也可以是muted属性改变）.。
  waiting: 'waiting' //在一个待执行的操作（如回放）因等待另一个操作（如跳跃或下载）被延迟时触发。
}

// 视频组件事件
export const videoEvents = {
  onLoadstart: 'onLoadstart',
  onCanplay: 'onCanplay',
  onPlay: 'onPlay',
  onPause: 'onPause',
  onPlaying: 'onPlaying',
  onTimeupdate: 'onTimeupdate',
  onWaiting: 'onWaiting',
  onEnded: 'onEnded',
  onError: 'onError',
  onFullscreenChange: 'onFullscreenChange'
}
