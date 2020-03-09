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
  
  describe('Keyboard interactions', function () {
    it('Should be able to cycle through toggles using the Down key', function () {
      // Test cycling through each panel toggle using the Down key
      cy.get('@trigger1').trigger('keyup', { keyCode: 40 });
      cy.focused().should('be', '@trigger2');
      
      cy.get('@trigger2').trigger('keyup', { keyCode: 40 });
      cy.focused().should('be', '@trigger3');
      
      cy.get('@trigger3').trigger('keyup', { keyCode: 40 });
      cy.focused().should('be', '@trigger4');
      
      cy.get('@trigger4').trigger('keyup', { keyCode: 40 });
      cy.focused().should('be', '@trigger1');
    });
    
    it('Should be able to cycle through toggles using the Up key', function () {
      // Test cycling through each panel toggle using the Up key
      cy.get('@trigger4').trigger('keyup', { keyCode: 38 });
      cy.focused().should('be', '@trigger3');
      
      cy.get('@trigger3').trigger('keyup', { keyCode: 38 });
      cy.focused().should('be', '@trigger2');
      
      cy.get('@trigger2').trigger('keyup', { keyCode: 38 });
      cy.focused().should('be', '@trigger1');
      
      cy.get('@trigger1').trigger('keyup', { keyCode: 38 });
      cy.focused().should('be', '@trigger4');
    });
    
    it('Should be able to cycle from the first toggle to last using the Up key', function() {
      // Test that using the up key on the first panel cycles focus back to the last panel toggle
      cy.get('@trigger1').trigger('keyup', { keyCode: 38 });
      cy.focused().should('be', '@trigger4');
    });
    
    it('Should be able to jump to the last toggle using the End key', function() {
      cy.get('@trigger1').trigger('keyup', { keyCode: 35 });
      cy.focused().should('be', '@trigger4');
    });
    
    it('Should be able to jump to the first toggle using the Home key', function() {
      cy.get('@trigger4').trigger('keyup', { keyCode: 36 });
      cy.focused().should('be', '@trigger1');
    });
  });
});
