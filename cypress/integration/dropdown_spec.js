const DROPDOWN_TOGGLE = '[data-rvt-dropdown-toggle="dropdownNavigation"]';
const DROPDOWN_MENU = '[data-rvt-dropdown-menu]';
const DEV_SERVER = "http://localhost:3000";
const DOWN = 40;
const UP = 38;
const ENTER = 13;
const ESC = 27;

describe('Dropdown Interaction', function() {
  it('Visits the dropdown page', function() {
    cy.visit(DEV_SERVER + '/components/preview/dropdown');
  });

  it('Should see the dropdown toggle', function() {
    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'hidden')
      .and('not.be.visible');
  });

  it('Should be able to open the dropdown', function() {
    cy.get(DROPDOWN_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get(DROPDOWN_MENU)
      .should('be.visible')
      .and('not.have.attr', 'hidden');
  });

  it('Should be able to close the dropdown', function() {
    cy.get(DROPDOWN_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });

  it('Should be able to open the dropdown with keys', function() {
    cy.get(DROPDOWN_TOGGLE).click();

    cy.focused().trigger('keydown', { keyCode: DOWN, which: DOWN });

    cy.focused().should('have.text', 'Item one');

    cy.focused().trigger('keydown', { keyCode: UP, which: UP });

    cy.focused().should('have.text', 'Related item two');
  });

  it('Should be able to close with esc key', function() {
    cy.get(DROPDOWN_TOGGLE).click();

    cy.focused().trigger('keydown', { keyCode: ESC, which: ESC });

    cy.get(DROPDOWN_MENU).should('not.be.visible');
  });

  it('Should be able to close with .close() method', function() {
    cy.window().then(win => {
      win.newdropdownNavigation.close();
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'hidden')
      .and('not.be.visible');
  });

  it('Should be able to open with .open() method', function() {
    cy.window().then(win => {
      win.newdropdownNavigation.open();
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'true');

    cy.get(DROPDOWN_MENU)
      .should('be.visible')
      .and('not.have.attr', 'hidden');
  });
});