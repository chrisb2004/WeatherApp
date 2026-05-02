describe('WeatherMap', () => {
  it('renders 60 canton markers', () => {
    cy.visit('http://localhost:5173')

    cy.get('.leaflet-marker-icon', { timeout: 10000 })
      .should('have.length', 26)
  })

  
})