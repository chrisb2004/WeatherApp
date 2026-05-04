describe('CityMarker', () => {
    it('onSelect is called when a CityMarker is clicked', () => {
        cy.visit('http://localhost:5173');
        cy.get('.leaflet-marker-icon').eq(0).click();

        cy.get('.leaflet-marker-icon')
            .eq(0)
            .find('.teardrop')
            .should('have.class', 'teardrop-selected');
    });
});