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
  <video-player src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" :title="default controllers">
  <video-player src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" 
    @onPlay="onPlay" @onPause="onPause" @onTimeupdate="onTimeupdate">
    <!--  add custom controllers here to cover default controllers -->
  </video-player>
</template>

<script>
import VideoPlayer from 'v-plr'
Vue.use(VideoPlayer)
export default {
  //...
  methods:{
    onPlay(){},
    onPause(){}
    onTimeupdate({ duration, currentTime, buffered }){}
  }
}
</script>

```

# Documentation

## Props

| Props | Description                                 | Type   | Default | Required |
| ----- | ------------------------------------------- | ------ | ------- | -------- |
| src   | Ther  url of video.                         | String | ''      | true     |
| ratio | Ther ratio of the video's width and height. | Number | 16 / 9  | false    |
| title | Ther title of the default controllers.      | String | ''      | false    |

## Events

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


# Changelog
### Detailed changes for each release are documented in the [release notes](https://github.com/Nick742037091/v-plr/releases).