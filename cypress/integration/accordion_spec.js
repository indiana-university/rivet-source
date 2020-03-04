const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/example-layouts--accordion-test`);
  /**
   * Use cypress aliases to share the context of the accordion trigger and panel
   * elements across different assertions.
   */
  cy.get('[data-accordion-panel="my-new-accordion-1"]').as('panel1');
  cy.get('[data-accordion-trigger="my-new-accordion-1"]').as('trigger1');
  cy.get('[data-accordion-panel="my-new-accordion-2"]').as('panel2');
  cy.get('[data-accordion-trigger="my-new-accordion-2"]').as('trigger2');
  cy.get('[data-accordion-panel="my-new-accordion-3"]').as('panel3');
  cy.get('[data-accordion-trigger="my-new-accordion-3"]').as('trigger3');
  cy.get('[data-accordion-panel="my-new-accordion-4"]').as('panel4');
  cy.get('[data-accordion-trigger="my-new-accordion-4"]').as('trigger4');
});

describe('Rivet accordion interactions', function () {
  it('Should see the accordion page', function () {
    cy.get('@panel1')
      .should('be.visible')
      .should('not.have.attr', 'hidden');

    cy.get('@panel2').should('not.be.visible');
    cy.get('@panel3').should('not.be.visible');
    cy.get('@panel4').should('not.be.visible');
  });

  it('Should be able to open accordion panels', function () {
    cy.get('@trigger2').click();
    cy.get('@panel1').should('be.visible');
    cy.get('@panel2').should('be.visible');
    cy.get('@panel3').should('not.be.visible');
  });

  it('Should be able to close accordion panels', function () {
    // Close first that was opened via data attribute
    cy.get('@trigger1').click();
    cy.get('@panel1').should('not.be.visible');
  });
  
