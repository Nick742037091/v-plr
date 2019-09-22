<template>
  <div class="slider-button-wrapper" :style="buttonWrapperStyle">
    <div
      ref="slider-button"
      class="slider-button"
      :style="buttonStyle"
      :class="{'slider-button--hover':hovering}"
      @mouseenter.stop="onMouseEnter"
      @mouseleave.stop="onMouseLeave"
      @mousedown.stop="onButtonDown"
      @touchstart.stop="onButtonDown"
    ></div>
  </div>
</template>

<script>
import { on, off } from '@/utils'

export default {
  name: 'SliderButton',
  props: {
    color: {
      type: String,
      default: '#ffe411'
    },
    size: {
      type: [Number, String],
      default: 12
    },
    sliderSize: {
      type: Number,
      default: 0
    },
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
    }
  },
  data() {
    return {
      button: null,
      isClick: false,
      hovering: false,
      dragging: false,
      startY: 0,
      startX: 0,
      startPosition: 0,
      newPosition: 0
    }
  },
  computed: {
    buttonWrapperStyle() {
      let top = 0,
        left = 0
      left = this.currentPosition
      top = '50%'
      return {
        top,
        left
      }
    },
    buttonStyle() {
      let width, height
      if (typeof this.size === 'string') {
        width = height = this.size
      } else {
        width = height = `${this.size}px`
      }
      return {
        width,
        height,
        backgroundColor: this.color
      }
    },
    currentPosition() {
      return `${((this.value - this.min) / (this.max - this.min)) * 100}%`
    }
  },
  mounted() {
    this.button = this.$refs['slider-button']
  },
  methods: {
    onMouseEnter() {
      this.hovering = true
    },
    onMouseLeave() {
      if (!this.dragging) {
        this.hovering = false
      }
    },
    onButtonDown(event) {
      this.hovering = true
      this.onDragStart(event)
      on(window, 'mousemove', this.onDraging)
      on(window, 'touchmove', this.onDraging)
      on(window, 'mouseup', this.onDragEnd)
      on(window, 'touchend', this.onDragEnd)
    },
    onDragStart(event) {
      this.dragging = true
      this.isClick = true
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }
      this.startX = event.clientX
      this.startPosition = Number.parseFloat(this.currentPosition)
    },
    onDragEnd() {
      this.hovering = false
      this.dragging = false
      this.isClick = false
      off(window, 'mousemove', this.onDraging)
      off(window, 'touchmove', this.onDraging)
      off(window, 'mouseup', this.onDragEnd)
      off(window, 'touchend', this.onDragEnd)
    },
    onDraging(event) {
      this.isClick = false
      if (event.type === 'touchmove') {
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }
      let diff = 0
      diff = ((event.clientX - this.startX) / this.sliderSize) * 100
      this.newPosition = this.startPosition + diff
      this.setPosition(this.newPosition)
    },
    setPosition(position) {
      if (position < 0) {
        position = 0
      } else if (position > 100) {
        position = 100
      }
      this.$emit('input', position)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-button-wrapper {
  position: absolute;
  z-index: 1003;
  transform: translate(-50%, -50%);
  transition: scale ease-in 500ms;
  padding: 10px 10px;
  .slider-button {
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: white;
  }
  .slider-button--hover {
    transform: scale(1.4);
  }
}
</style>