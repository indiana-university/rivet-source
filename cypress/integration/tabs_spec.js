const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/tabs--default`);
  /**
   * Use cypress aliases to share the context of the tab and panel
   * elements across different assertions.
   */
  cy.get('[data-rvt-tab="tab-1"]').as('tab1');
  cy.get('[data-rvt-tab-panel="tab-1"]').as('panel1');
  cy.get('[data-rvt-tab="tab-2"]').as('tab2');
  cy.get('[data-rvt-tab-panel="tab-2"]').as('panel2');
  cy.get('[data-rvt-tab="tab-3"]').as('tab3');
  cy.get('[data-rvt-tab-panel="tab-3"]').as('panel3');
  cy.get('[data-rvt-tab="tab-4"]').as('tab4');
  cy.get('[data-rvt-tab-panel="tab-4"]').as('panel4');
});

describe('Rivet tab interactions', function () {
  it('Should see the info alert page', function () {
    cy.get('@panel3')
      .should('be.visible')
      .should('not.have.attr', 'hidden');

    cy.get('@panel1').should('not.be.visible');
    cy.get('@panel2').should('not.be.visible');
    cy.get('@panel4').should('not.be.visible');
  });

  it('Should be able to navigate with the keyboard', function () {
    cy.get('@tab3').trigger('keydown', { keyCode: 39 });
    cy.focused().should('have.attr', 'data-rvt-tab', 'tab-4');

    cy.get('@tab4').trigger('keydown', { keyCode: 37 });
    cy.focused().should('have.attr', 'data-rvt-tab', 'tab-3');

    cy.get('@tab3').trigger('keydown', { keyCode: 36 });
    cy.focused().should('have.attr', 'data-rvt-tab', 'tab-1');

    cy.get('@tab1').trigger('keydown', { keyCode: 35 });
    cy.focused().should('have.attr', 'data-rvt-tab', 'tab-4');
  });

  it('Should be able to display a different tab', function () {
    cy.get('@tab3').trigger('keydown', { keyCode: 39 });
    cy.focused().click();

    cy.get('@panel4').should('be.visible').should('not.have.attr', 'hidden');
    cy.get('@panel1').should('not.be.visible');
    cy.get('@panel2').should('not.be.visible');
    cy.get('@panel3').should('not.be.visible');
  });

  it('Should be able to activate a tab with the .activateTab() method', function() {
    cy.window().then(win => {
      var tabs = win.document.querySelector('[data-rvt-tabs="tabset-1"]');
      tabs.activateTab('tab-2');
    });

    cy.get('[data-rvt-tab-panel="tab-2"]').should('be.visible').should('not.have.attr', 'hidden');
  });

  it('Should fire a rvt:tabActivated custom event with correct element references', function() {
    cy.window().then(win => {
      var tabs = win.document.querySelector('[data-rvt-tabs="tabset-1"]');
      var eventFired = false;
      var eventTabsReference;
      var eventTabPanelReference;
      
      win.addEventListener('rvt:tabActivated', event => {
        eventFired = true;
        eventTabsReference = event.target == tabs;
        eventTabPanelReference = event.detail.tab.dataset.rvtTabPanel == 'tab-1';
      });
      
      tabs.activateTab('tab-1');
      
      if (!eventFired) throw new Error('Did not fire tabActivated event');
      if (!eventTabsReference) throw new Error('Did not pass correct reference to emitting tabs component element');
      if (!eventTabPanelReference) throw new Error('Did not pass correct reference to activated tab element');
    });
  });
});