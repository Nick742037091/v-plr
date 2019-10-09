<template>
  <div ref="slider" class="slider" @click.stop="onClickSlider" :style="sliderStyle">
    <slider-button
      v-model="btnValue"
      :sliderSize="sliderSize"
      :min="min"
      :max="max"
      :border-width="btnBorderWidth"
      :border-color="btnBorderColor"
    />
    <div class="progress-seek" :style="seekStyle" />
    <div class="progress-played" :style="playedStyle" />
    <div class="progress-buffered" :style="bufferedStyle" />
  </div>
</template>

<script>
import SliderButton from './button'
import { on, off } from '@/utils'
export default {
  name: 'Slider',
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: [Number, String],
      default: 40
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    buffered: {
      type: Number,
      default: 0
    },
    seekColor: {
      type: String,
      default: '#eeeeee'
    },
    playedColor: {
      type: String,
      default: '#ffe411'
    },
    bufferedColor: {
      type: String,
      default: '#cfcfcf'
    },
    progerssHeight: {
      type: Number,
      default: 3
    },
    btnBorderWidth: {
      type: Number,
      default: 2
    },
    btnBorderColor: {
      type: String,
      default: 'grey'
    }
  },
  components: { SliderButton },
  computed: {
    sliderStyle() {
      const height =
        typeof this.height === 'number' ? `${this.height}px` : this.height
      const width =
        typeof this.width === 'number' ? `${this.width}px` : this.width
      return {
        height,
        width
      }
    },
    seekStyle() {
      const borderRadius = this.progerssHeight / 2 + 'px'
      const width =
        typeof this.width === 'number' ? `${this.width}px` : this.width
      return {
        backgroundColor: this.seekColor,
        height: this.progerssHeight + 'px',
        width,
        borderRadius
      }
    },
    playedStyle() {
      let borderRadius = this.progerssHeight / 2 + 'px'
      if (this.value !== 100) {
        borderRadius = `${borderRadius} 0 0 ${borderRadius}`
      }
      return {
        backgroundColor: this.playedColor,
        height: this.progerssHeight + 'px',
        width: (this.value / 100) * this.sliderSize + 'px',
        borderRadius
      }
    },
    bufferedStyle() {
      let borderRadius = this.progerssHeight / 2 + 'px'
      if (this.value !== 100) {
        borderRadius = `${borderRadius} 0 0 ${borderRadius}`
      }
      return {
        backgroundColor: this.bufferedColor,
        height: this.progerssHeight + 'px',
        width: (this.buffered / 100) * this.sliderSize + 'px',
        borderRadius
      }
    }
  },
  data() {
    return {
      slider: null,
      sliderSize: 0,
      btnValue: 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.btnValue = val
      }
    },
    // 拖动更新值
    btnValue(val) {
      if (val !== this.value) {
        this.$emit('input', val)
        this.changeValue(val)
      }
    }
  },
  mounted() {
    this.slider = this.$refs['slider']
    this.getSliderSize()
    on(window, 'resize', this.getSliderSize)
  },
  destroyed() {
    off(window, 'resize', this.getSliderSize)
  },
  methods: {
    getSliderSize() {
      if (!this.slider) return
      this.sliderSize = this.slider.clientWidth
    },
    onClickSlider(event) {
      const left = this.slider.getBoundingClientRect().left
      let value = ((event.clientX - left) / this.sliderSize) * 100
      if (value < 0) {
        value = 0
      } else if (value > 100) {
        value = 100
      }
      this.$emit('input', value)
      // 点击更新值
      this.changeValue(value)
    },
    changeValue(value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  .progress-played {
    position: absolute;
    z-index: 1002;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
  .progress-buffered {
    position: absolute;
    z-index: 1001;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .progress-seek {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>