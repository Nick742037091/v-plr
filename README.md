# v-plr

[![Build Status](https://travis-ci.org/Nick742037091/v-plr.svg?branch=master)](https://travis-ci.org/Nick742037091/v-plr) [![Coverage Status](https://coveralls.io/repos/github/Nick742037091/v-plr/badge.svg)](https://coveralls.io/github/Nick742037091/v-plr?branch=master) [![Version](https://img.shields.io/npm/v/v-plr.svg)](https://www.npmjs.com/package/v-plr) [![Downloads](https://img.shields.io/npm/dm/v-plr.svg)](https://www.npmjs.com/package/v-plr)

# Introduction
## A easy-to-use vue video plugin

- [Preview](http://www.nick-h.cn/v-plr/)
# Install

## Using npm:
> $ npm install v-plr
## Using yarn:
> $ yarn add v-plr

# Quick Start

```
<template>
  <v-video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" title="default controllers">
  <v-video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" 
    @onPlay="onPlay" @onPause="onPause" @onTimeupdate="onTimeupdate">
    <!--  add custom controllers here to cover default controllers -->
  </v-video>
</template>

<script>
import VVideo from 'v-plr'
Vue.use(VVideo)
export default {
  //...
  methods:{
    onPlay(){},
    onPause(){},
    onTimeupdate({ duration, currentTime, buffered }){}
  }
}
</script>

```

# Use Component
## Slider
```
<template>
  <v-slider v-model="curVal" width="400px" />
</template>

<script>
import { VSlider } from 'v-plr'
export default {
  //...
  data() {
    return { curVal: 50 }
  },
  components: { VSlider },
  methods: {}
}
</script>

```

# Documentation
## VVideo
### Props

| Props | Description                                | Type   | Default | Required |
| ----- | ------------------------------------------ | ------ | ------- | -------- |
| src   | The  url of video.                         | String | ''      | true     |
| ratio | The ratio of the video's width and height. | Number | 16 / 9  | false    |
| title | The title of the default controllers.      | String | ''      | false    |

### Events

| Events             | Description                                      | Params                              |
| ------------------ | ------------------------------------------------ | ----------------------------------- |
| onLoadstart        | Fires when media start to load.                  | None                                |
| onLoadedmetadata   | Fires when media meta data is loaded.            | None                                |
| onPlay             | Fires when media play after last pause.          | None                                |
| onPause            | Fires when media pause                           | None                                |
| onPlaying          | Fires when media start to play                   | None                                |
| onTimeupdate       | Fires when media currentTime changed             | { duration, currentTime, buffered } |
| onWaiting          | Fires when media is waiting for another opeation | None                                |
| onEnded            | Fires when media is ended                        | None                                |
| onError            | Fires when a error happen                        | None                                |
| onFullscreenChange | Fires when the fullscreen status changed         | { isFullscreen }                    |

## VSlider
### Props

| Props          | Description                                                      | Type          | Default    | Required |
| -------------- | ---------------------------------------------------------------- | ------------- | ---------- | -------- |
| min            | The minimun value of slider.                                     | Number        | 0          | false    |
| max            | The maximum value of slider.                                     | Number        | 100        | false    |
| value          | The current value of slider.                                     | Number        | 50         | false    |
| height         | The height of slider block.                                      | Number/String | 40(px)     | false    |
| width          | The width of slider block.                                       | Number/String | 100%       | false    |
| buffered       | The value of slider buffered.                                    | Number        | 0(min~max) | false    |
| seekColor      | The background color of dragging block.                          | String        | #eeeeee    | false    |
| playedColor    | The background color of the area between min and current value.  | String        | #ffe411    | false    |
| bufferedColor  | The background color of the area between min and buffered value. | String        | #cfcfcf    | false    |
| progerssHeight | The height of the slider display block.                          | Number        | 3(px)      | false    |
| btnBorderWidth | The border width of the slider button                            | Number        | 2(px)      | false    |
| btnBorderColor | The border color of the slider button                            | String        | grey       | false    |

### Events

| Events      | Description                                                  | Params |
| ----------- | ------------------------------------------------------------ | ------ |
| changeValue | Fires when the current value changed by manual manipulation. | value  |


# Changelog
### Detailed changes for each release are documented in the [release notes](https://github.com/Nick742037091/v-plr/releases).