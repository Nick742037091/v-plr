import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import SliderButton from '@pkg/slider/src/button'
import Slider from '@pkg/slider'

describe('Slider Button', () => {
  Vue.use(Slider)

  const slider = mount(Slider)
  slider.setProps({ value: 30 })
  slider.setProps({ buffered: 50 })

  slider.trigger('click', { clientX: 200 })
  const buttonWrapper = slider.find(SliderButton)
  const sliderButton = buttonWrapper.find('.slider-button')
  it('slider button mouse enter', () => {
    sliderButton.trigger('mouseenter')
    expect(sliderButton.classes()).to.contain('slider-button--hover')
  })

  it('slider button mouse leave', () => {
    sliderButton.trigger('mouseleave')
    expect(sliderButton.classes()).to.not.contain('slider-button--hover')
  })

  it('slider button mouse down', () => {
    sliderButton.trigger('mousedown', { clientX: 100, clientY: 20 })
    expect(buttonWrapper.vm.hovering).to.be.true
    expect(buttonWrapper.vm.dragging).to.be.true
    expect(buttonWrapper.vm.startX).to.be.equal(100)
  })

  it('slider button mouse dragging', () => {
    buttonWrapper.vm.onDraging({ clientX: 120, clientY: 20 })
    buttonWrapper.vm.onDraging({ clientX: 140, clientY: 20 })
    buttonWrapper.vm.onDraging({ clientX: 160, clientY: 20 })
  })

  it('slider button mouse drag end', () => {
    buttonWrapper.vm.onDragEnd()
    expect(buttonWrapper.vm.hovering).to.be.false
    expect(buttonWrapper.vm.dragging).to.be.false
  })
})
