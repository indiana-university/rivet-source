const DEV_SERVER = 'http://localhost:3000';

describe('Sidenav Interaction', function() {
  it('Visits the Sidenav page', function() {
    cy.visit(`${DEV_SERVER}/components/preview/sidenav`);
  });
  
  it('Should toggle visibility of a nested list', function() {
    cy.get('[data-sidenav-list="toggle-1"]')
      .as('list')
      .should('be.hidden');
      
    cy.get('[data-sidenav-toggle="toggle-1"]')
      .as('toggle')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'aria-haspopup', 'true')
      .click()
      .should('have.attr', 'aria-expanded', 'true');
      
    cy.get('@list')
      .should('be.visible');
      
    cy.get('@toggle')
      .should('have.attr', 'aria-expanded', 'true')
      .click()
      .should('have.attr', 'aria-expanded', 'false');
    
    cy.get('@list')
      .should('be.not.visible');
  });
});