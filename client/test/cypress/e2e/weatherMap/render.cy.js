describe('WeatherMap', () => {
  it('renders 60 canton markers', () => {
    cy.visit('http://localhost:5173');

    cy.get('.leaflet-marker-icon', { timeout: 10000 })
      .should('have.length', 26);
  });

  it('clicking a marker selects it', () => {
    cy.visit('http://localhost:5173');
  
    cy.get('.leaflet-marker-icon').eq(0).click()

    cy.get('.leaflet-marker-icon')
      .eq(0)
      .find('.teardrop')
      .should('have.class', 'teardrop-selected')
  });

  it('clicking a marker twice deselects it', () => {
    cy.visit('http://localhost:5173');
  
    cy.get('.leaflet-marker-icon').first().click();

    cy.get('.leaflet-marker-icon')
      .first()
      .find('.teardrop')
      .should('have.class', 'teardrop-selected');
    
    cy.get('.leaflet-marker-icon').first().click();
    
    cy.get('.leaflet-marker-icon')
      .first()
      .find('.teardrop')
      .should('not.have.class', 'teardrop-selected');
  });

  it('calls flyTo when selecting a canton', () => {
    cy.visit('http://localhost:5173');
  
    cy.window()
      .its('__map__')
      .should('exist')   // wait until map is ready
      .then((map) => {
        cy.spy(map, 'flyTo').as('flyTo');
      });
  
    cy.get('.leaflet-marker-icon').first().click();
  
    cy.get('@flyTo').should('have.been.called');
  });

  it('renders the map container', () => {
    cy.visit('http://localhost:5173');
  
    cy.get('.leaflet-container').should('exist');
  });
})