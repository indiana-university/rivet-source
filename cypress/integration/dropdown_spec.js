const DROPDOWN_TOGGLE = '[data-dropdown-toggle="dropdown-navigation"]';
const DROPDOWN_MENU = '#dropdown-navigation';
const DEV_SERVER = "http://localhost:3000";
const DOWN = 40;
const UP = 38;
const ENTER = 13;
const ESC = 27;

describe('Rivet dropdown interactions', function() {
  it('Visits the dropdown page', function() {
    cy.visit(DEV_SERVER + '/components/preview/dropdown');
  });

  it('Should see the dropdown toggle', function() {
    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'aria-hidden', 'true')
      .and('not.be.visible');
  });

  it('Should be able to open the dropdown', function() {
    cy.get(DROPDOWN_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get(DROPDOWN_MENU)
      .should('be.visible')
      .and('have.attr', 'aria-hidden', 'false');
  });

  it('Should be able to close the dropdown', function() {
    cy.get(DROPDOWN_TOGGLE)
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('not.be.visible')
      .and('have.attr', 'aria-hidden', 'true');
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
      win.Dropdown.close('dropdown-navigation');
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'aria-hidden', 'true')
      .and('not.be.visible');
  });

  it('Should be able to open with .open() method', function() {
    cy.window().then(win => {
      win.Dropdown.open('dropdown-navigation');
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'true');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'aria-hidden', 'false')
      .and('be.visible');
  });

  it('Should be able to close with .closeAll() method', function() {
    cy.window().then(win => {
      win.Dropdown.closeAll();
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'aria-hidden', 'true')
      .and('not.be.visible');
  });

  it('Should be able to toggle with .toggle() method', function() {
    cy.window().then(win => {
      win.Dropdown.toggle('dropdown-navigation');
    });

    cy.get(DROPDOWN_TOGGLE).should('have.attr', 'aria-expanded', 'true');

    cy.get(DROPDOWN_MENU)
      .should('have.attr', 'aria-hidden', 'false')
      .and('be.visible');
  });

  it('Should not throw an error if removed then opened with .open() method', function() {
    cy.get(DROPDOWN_TOGGLE).then(dropdown => dropdown.remove());

    cy.window().then(win => {
      win.Dropdown.open('dropdown-navigation');
    });
  });

  it('Should not throw an error if removed then closed with .close() method', function() {
    cy.window().then(win => {
      win.Dropdown.close('dropdown-navigation');
    });
  });

  it('Should not throw an error if removed then toggled with .toggle() method', function() {
    cy.window().then(win => {
      win.Dropdown.toggle('dropdown-navigation');
    });
  });
});
