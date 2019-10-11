/// <reference types="Cypress" />
describe('Test video demo', () => {
  it('test play', () => {
    cy.visit('/v-plr/')
    cy.get('.default-player-wrapper')
      .find('.btn-play')
      .click()
    cy.wait(2000)
    cy.get('.default-player-wrapper').click()
    cy.get('.default-player-wrapper')
      .find('.btn-pause')
      .click()

    // cy.get('.custom-player-wrapper')

    // cy.visit('https://example.cypress.io')

    // cy.contains('type').click()
    // // 应该存在一个包含'/commands/actions'的新URL
    // cy.url().should('include', '/commands/actions')

    // // 获取一个输入, 输入进去并且验证文本值已经更新了
    // cy.get('.action-email')
    //   .type('fake@email.com')
    //   .should('have.value', 'fake@email.com')
  })
})
