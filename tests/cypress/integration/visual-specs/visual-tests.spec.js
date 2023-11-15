describe('APG Application visual regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/entries/list')
  })

  it('matches with navbar', () => {
    cy.get('.navbar-light').matchImageSnapshot()
  })

  it('matches with empty table', () => {
    cy.get('input[type=text]').eq(1).type('00000')
    cy.get('.ReactTable').matchImageSnapshot()
  })

  it('matches with default form view', () => {
    cy.visit('http://localhost:8000/entries/create')
    cy.get('.form-group').matchImageSnapshot()
  })
})
