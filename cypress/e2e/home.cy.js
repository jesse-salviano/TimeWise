describe('TimeWise basic flow', () => {
  it('loads the homepage and shows the tip', () => {
    cy.visit('/index.html')
    cy.get('#dica-text').should('exist').and('not.be.empty')
  })

  it('can navigate to dashboard', () => {
    cy.visit('/index.html')
    cy.get('.nav-btn').contains('📊').click()
    cy.url().should('include', 'dashboard.html')
  })
})
