const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/accordion`);
  /**
   * Use cypress aliases to share the context of the accordion trigger and panel
   * elements across different assertions.
   */
  cy.get('[data-accordion-panel="accordion-1"]').as('panel1');
  cy.get('[data-accordion-trigger="accordion-1"]').as('trigger1');
  cy.get('[data-accordion-panel="accordion-2"]').as('panel2');
  cy.get('[data-accordion-trigger="accordion-2"]').as('trigger2');
  cy.get('[data-accordion-trigger="accordion-2"]').parent().as('accordion2');
  cy.get('[data-accordion-panel="accordion-3"]').as('panel3');
  cy.get('[data-accordion-trigger="accordion-3"]').as('trigger3');
  cy.get('[data-accordion-trigger="accordion-3"]').parent().as('accordion3');
});

describe('Rivet accordion interactions', function () {
  it('Should see the info alert page', function () {
    cy.get('@panel3')
      .should('be.visible')
      .should('not.have.attr', 'hidden');

    cy.get('@panel1').should('not.be.visible');
    cy.get('@panel2').should('not.be.visible');
  });

  it('Should be able to open accordion panels', function () {
    // Close accordion-3
    cy.get('@trigger1').click();

    cy.get('@panel1').should('be.visible');
    cy.get('@panel2').should('not.be.visible');
    cy.get('@panel3').should('be.visible');
  });

  it('Should be able to close accordion panels', function () {
    // Close accordion-3
    cy.get('@trigger3').click();

    cy.get('@panel1').should('not.be.visible');
    cy.get('@panel2').should('not.be.visible');
    cy.get('@panel3').should('not.be.visible');
  });

  it('Should be able to navigate with the keyboard', function () {
    cy.get('@accordion3').trigger('keyup', { keyCode: 38 });
    cy.focused().should('be', '@accordion2');

    // Ensure that keydown from an open accordion (with focusable content) still moves to next accordion
    cy.get('@trigger2').click();
    cy.get('@accordion2').trigger('keydown', { keyCode: 40 });
    cy.focused().should('be', '@accordion3');

  });
});