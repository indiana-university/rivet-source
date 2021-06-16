const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/examples--accordion-test`);
  /**
   * Use cypress aliases to share the context of the accordion trigger and panel
   * elements across different assertions.
   */
  cy.get('[data-rvt-accordion-panel="my-new-accordion-1"]').as('panel1');
  cy.get('[data-rvt-accordion-trigger="my-new-accordion-1"]').as('trigger1');
  cy.get('[data-rvt-accordion-panel="my-new-accordion-2"]').as('panel2');
  cy.get('[data-rvt-accordion-trigger="my-new-accordion-2"]').as('trigger2');
  cy.get('[data-rvt-accordion-panel="my-new-accordion-3"]').as('panel3');
  cy.get('[data-rvt-accordion-trigger="my-new-accordion-3"]').as('trigger3');
  cy.get('[data-rvt-accordion-panel="my-new-accordion-4"]').as('panel4');
  cy.get('[data-rvt-accordion-trigger="my-new-accordion-4"]').as('trigger4');
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
});
  
describe('Keyboard interactions', function () {
  it('Should be able to cycle through toggles using the Down key', function () {
    // Test cycling through each panel toggle using the Down key
    cy.get('@trigger1').type('{downarrow}');
    cy.get('@trigger2').should('to.have.focus');

    cy.get('@trigger2').type('{downarrow}');
    cy.get('@trigger3').should('to.have.focus');

    cy.get('@trigger3').type('{downarrow}');
    cy.get('@trigger4').should('to.have.focus');

    cy.get('@trigger4').type('{downarrow}');
    cy.get('@trigger1').should('to.have.focus');
  });
  
  it('Should be able to cycle through toggles using the Up key', function () {
    // Test cycling through each panel toggle using the Up key
    cy.get('@trigger4').type('{uparrow}');
    cy.get('@trigger3').should('to.have.focus');

    cy.get('@trigger3').type('{uparrow}');
    cy.get('@trigger2').should('to.have.focus');

    cy.get('@trigger2').type('{uparrow}');
    cy.get('@trigger1').should('to.have.focus');

    cy.get('@trigger1').type('{uparrow}');
    cy.get('@trigger4').should('to.have.focus');
  });
  
  it('Should be able to jump to the last toggle using the End key', function() {
    cy.get('@trigger1').type('{end}');
    cy.get('@trigger4').should('to.have.focus');
  });
  
  it('Should be able to jump to the first toggle using the Home key', function() {
    cy.get('@trigger4').type('{home}');
    cy.get('@trigger1').should('to.have.focus');
  });
});

describe('API methods', function () {
  it('Should be able to open a panel with the .open() method', function() {
    cy.window().then(win => {
      var accordion = win.document.querySelector('[data-rvt-accordion="my-new-accordion"]');
      accordion.open('my-new-accordion-1');
    });

    cy.get('[data-rvt-accordion-trigger="my-new-accordion-1"]').should('have.attr', 'aria-expanded', 'true');

    cy.get('[data-rvt-accordion-panel="my-new-accordion-1"]')
      .should('be.visible')
      .and('not.have.attr', 'hidden');
  });

  it('Should be able to close a panel with the .close() method', function() {
    cy.window().then(win => {
      var accordion = win.document.querySelector('[data-rvt-accordion="my-new-accordion"]');
      accordion.close('my-new-accordion-1');
    });

    cy.get('[data-rvt-accordion-trigger="my-new-accordion-1"]').should('have.attr', 'aria-expanded', 'false');

    cy.get('[data-rvt-accordion-panel="my-new-accordion-1"]')
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });
});

describe('Custom events', function () {
  it('Should fire a rvt:accordionOpened custom event with correct element references', function() {
    cy.window().then(win => {
      var accordion = win.document.querySelector('[data-rvt-accordion="my-new-accordion"]');
      var eventFired = false;
      var eventAccordionReference;
      var eventPanelReference;
      
      win.addEventListener('rvt:accordionOpened', event => {
        eventFired = true;
        eventAccordionReference = event.target == accordion;
        eventPanelReference = event.detail.panel.dataset.rvtAccordionPanel == 'my-new-accordion-1';
      });
      
      accordion.open('my-new-accordion-1');
      
      if (!eventFired) throw new Error('Did not fire accordionOpened event');
      if (!eventAccordionReference) throw new Error('Did not pass correct reference to emitting accordion component element');
      if (!eventPanelReference) throw new Error('Did not pass correct reference to opened panel element');
    });
  });

  it('Should fire a rvt:accordionClosed custom event with correct element references', function() {
    cy.window().then(win => {
      var accordion = win.document.querySelector('[data-rvt-accordion="my-new-accordion"]');
      var eventFired = false;
      var eventAccordionReference;
      var eventPanelReference;
      
      win.addEventListener('rvt:accordionClosed', event => {
        eventFired = true;
        eventAccordionReference = event.target == accordion;
        eventPanelReference = event.detail.panel.dataset.rvtAccordionPanel == 'my-new-accordion-1';
      });
      
      accordion.close('my-new-accordion-1');
      
      if (!eventFired) throw new Error('Did not fire accordionClosed event');
      if (!eventAccordionReference) throw new Error('Did not pass correct reference to emitting accordion component element');
      if (!eventPanelReference) throw new Error('Did not pass correct reference to closed panel element');
    });
  });
});