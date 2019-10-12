/// <reference types="Cypress" />

const player = () => {
  return cy.get('.default-player-wrapper')
}

const checkPanelVisible = (isVisible = true) => {
  player()
    .find('.top-bar')
    .should(isVisible ? 'be.visible' : 'not.be.visible')
  player()
    .find('.bottom-bar')
    .should(isVisible ? 'be.visible' : 'not.be.visible')
}

describe('Test video example', () => {
  beforeEach(() => {
    cy.visit('/v-plr/')
  })

  it('测试交互效果', () => {
    // 检测slider的放大效果
    player()
      .find('.slider-button')
      .trigger('mouseenter')
    player()
      .find('.slider-button')
      .should('have.class', 'slider-button--hover')
    cy.wait(500)
    player()
      .find('.slider-button')
      .trigger('mouseleave')
    player()
      .find('.slider-button')
      .should('not.have.class', 'slider-button--hover')

    // 默认显示面板
    checkPanelVisible(true)

    // 点击，隐藏面板
    player().click()
    checkPanelVisible(false)

    // 点击，显示面板
    player().click()
    checkPanelVisible(true)
  })
  it('测试视频播放', () => {
    // 检测初始时间
    player()
      .find('#currentTime')
      .should('have.text', '00:00')
    player()
      .find('#duration')
      .should('have.text', '00:00')

    // 点击播放，1.2s后检测是否自动隐藏面板
    player()
      .find('.btn-play')
      .click()
    checkPanelVisible(false)

    // 2s后检测播放时间和总时长是否不为0
    player()
      .find('#currentTime')
      .should('not.have.text', '00:00')
    player()
      .find('#duration')
      .should('not.have.text', '00:00')

    // 显示面板，点击暂停
    player().click()
    player()
      .find('.btn-pause')
      .click()

    // 1.2s后检测暂停状态下面板是否不会自动隐藏
    checkPanelVisible(true)
  })
})
