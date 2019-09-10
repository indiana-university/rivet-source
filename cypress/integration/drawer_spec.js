const DRAWER_TOGGLE = '[data-drawer-toggle="mobile-drawer"]';
const DRAWER_MENU = '#mobile-drawer';
const DRAWER_CLOSE = '.rvt-drawer__bottom-close';
const DEV_SERVER = "http://localhost:3000";
const DOWN = 40;
const UP = 38;
const ENTER = 13;
const ESC = 27;

describe('Rivet drawer interactions', function() {
  it('Visits the drawer page', function() {
    cy.visit(DEV_SERVER + '/components/preview/header--persistent');
  });

  it('Should see a button', function() {
    cy.get(DRAWER_TOGGLE).should(
      'have.attr',
      'data-drawer-toggle',
      'mobile-drawer'
    );
  });

  it('Should not see a drawer menu', function() {
    cy.get(DRAWER_MENU).should('not.be.visible');
  });

  it('Should be able to open the drawer', function() {
    cy.get(DRAWER_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get(DRAWER_MENU)
      .should('have.attr', 'aria-hidden', 'false')
      .and('be.visible');
  });

  it('Should be able to use arrow keys', function() {
    cy.focused().trigger('keydown', { keyCode: DOWN, which: DOWN });

    cy.focused()
      .should('have.attr', 'aria-expanded', 'false')
      .click();

    cy.focused()
      .trigger('keydown', { keyCode: ENTER, which: ENTER })
      .trigger('keydown', { keyCode: DOWN, which: DOWN });

    cy.focused().should('have.text', 'Account settings');
  });

  it('Should be able to use esc key', function() {
    cy.focused().trigger('keyup', { keyCode: ESC, which: ESC });

    cy.get(DRAWER_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.get(DRAWER_MENU)
      .should('have.attr', 'aria-hidden', 'true')
      .and('not.be.visible');
  });

  it('Should be able to close with close button', function() {
    cy.get(DRAWER_TOGGLE).click();

    cy.focused().trigger('keydown', { keyCode: DOWN, which: DOWN });
    cy.focused().trigger('keydown', { keyCode: UP, which: UP });
    cy.focused().click();

    cy.get(DRAWER_MENU)
      .should('have.attr', 'aria-hidden', 'true')
      .and('not.be.visible');
  });

  it('Should be able to open with .open() method', function() {
    cy.window().then(win => {
      win.Drawer.open('mobile-drawer');
    });

    cy.get(DRAWER_MENU).should('have.attr', 'aria-hidden', 'false');

    cy.get(DRAWER_TOGGLE).should('have.attr', 'aria-expanded', 'true');
  });

  it('Should be able to close with .close() method', function() {
    cy.window().then(win => {
      win.Drawer.close('mobile-drawer');
    });

    cy.get(DRAWER_MENU).should('have.attr', 'aria-hidden', 'true');

    cy.get(DRAWER_TOGGLE).should('have.attr', 'aria-expanded', 'false');
  });
});
