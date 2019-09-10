const TAB_ONE_TOGGLE = '[data-tab="tab-1"]';
const TAB_ONE_CONTENT = '#tab-1';
const TAB_TWO_TOGGLE = '[data-tab="tab-2"]';
const TAB_TWO_CONTENT = '#tab-2';
const DEV_SERVER = "http://localhost:3000";
const DOWN = 40;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const ENTER = 13;
const ESC = 27;

describe('Rivet tabs interactions', function() {
  it('Visits the tabs page', function() {
    cy.visit(DEV_SERVER + '/components/preview/tab--default');
  });

  it('Should see the tabs with first tab selected', function() {
    cy.get(TAB_ONE_TOGGLE).should('have.attr', 'aria-selected', 'true');
    cy.get(TAB_TWO_TOGGLE).should('have.attr', 'aria-selected', 'false');

    cy.get(TAB_ONE_CONTENT).and('be.visible');

    cy.get(TAB_TWO_CONTENT)
      .should('have.attr', 'hidden')
      .and('not.be.visible');
  });

  it('Should be able to select the second tab', function() {
    cy.get(TAB_TWO_TOGGLE)
      .click()
      .should('have.attr', 'aria-selected', 'true');

    cy.get(TAB_ONE_TOGGLE).should('have.attr', 'aria-selected', 'false');

    cy.get(TAB_TWO_CONTENT).should('be.visible');

    cy.get(TAB_ONE_CONTENT)
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });

  it('Should be able to go back with left arrow', function() {
    cy.focused().trigger('keydown', { keyCode: LEFT, which: LEFT });

    cy.focused().should('contain', 'Tab one');
  });

  it('Should be able to activate tab', function() {
    cy.focused().click();

    cy.get(TAB_ONE_TOGGLE).should('have.attr', 'aria-selected', 'true');
    cy.get(TAB_TWO_TOGGLE).should('have.attr', 'aria-selected', 'false');

    cy.get(TAB_ONE_CONTENT).and('be.visible');

    cy.get(TAB_TWO_CONTENT)
      .should('have.attr', 'hidden')
      .and('not.be.visible');
  });

  it('Should be able to loop around going left', function() {
    cy.focused().trigger('keydown', { keyCode: LEFT, which: LEFT });

    cy.focused().should('contain', 'Tab four');
  });

  it('Should be able to switch tabs with .activateTab() method', function() {
    cy.window().then(win => {
      win.Tabs.activateTab('tab-2');
    });

    cy.get(TAB_TWO_TOGGLE)
      .click()
      .should('have.attr', 'aria-selected', 'true');

    cy.get(TAB_ONE_TOGGLE).should('have.attr', 'aria-selected', 'false');

    cy.get(TAB_TWO_CONTENT).should('be.visible');

    cy.get(TAB_ONE_CONTENT)
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });
});
