const DISCLOSURE = '[data-rvt-disclosure]';
const DISCLOSURE_TOGGLE = '[data-rvt-disclosure-toggle]';
const DISCLOSURE_TARGET = '[data-rvt-disclosure-target]';
const DEV_SERVER = "http://localhost:3000";
const ENTER = 13;
const ESC = 27;

describe('Disclosure Interaction', function() {
  it('Visits the disclosure page', function() {
    cy.visit(DEV_SERVER + '/components/preview/disclosure');
  });

  it('Should see the disclosure toggle', function() {
    cy.get(DISCLOSURE_TOGGLE).first().should('have.attr', 'aria-expanded', 'false');

    cy.get(DISCLOSURE_TARGET).first()
      .should('not.be.visible')
      .and('have.attr', 'hidden');

  });

  it('Should be able to open the disclosure', function() {
    cy.get(DISCLOSURE_TOGGLE).first()
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get(DISCLOSURE_TARGET).first()
      .should('be.visible')
      .and('not.have.attr', 'hidden');
  });

  it('Should be able to close the disclosure', function() {
    cy.get(DISCLOSURE_TOGGLE).first()
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.get(DISCLOSURE_TARGET).first()
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });

  it('Should be able to close with esc key', function() {
    cy.get(DISCLOSURE_TOGGLE).first().click();

    cy.focused().trigger('keydown', { keyCode: ESC, which: ESC });

    cy.get(DISCLOSURE_TARGET).first().should('not.be.visible');
  });

  it('Should be able to open with .open() method', function() {
    cy.window().then(win => {
      var disclosure = win.document.querySelector(DISCLOSURE);
      disclosure.open();
    });

    cy.get(DISCLOSURE_TOGGLE).should('have.attr', 'aria-expanded', 'true');

    cy.get(DISCLOSURE_TARGET)
      .should('be.visible')
      .and('not.have.attr', 'hidden');
  });

  it('Should be able to close with .close() method', function() {
    cy.window().then(win => {
      var disclosure = win.document.querySelector(DISCLOSURE);
      disclosure.close();
    });

    cy.get(DISCLOSURE_TOGGLE).should('have.attr', 'aria-expanded', 'false');

    cy.get(DISCLOSURE_TARGET)
      .should('not.be.visible')
      .and('have.attr', 'hidden');
  });

  it('Should fire a rvtDisclosureOpened custom event with correct element references', function() {
    cy.window().then(win => {
      var disclosure = win.document.querySelector(DISCLOSURE);
      var eventFired = false;
      var eventDisclosureReference;

      win.addEventListener('rvtDisclosureOpened', event => {
        eventFired = true;
        eventDisclosureReference = event.target == disclosure;
      });

      disclosure.open();

      if (!eventFired) throw new Error('Did not fire disclosureOpened event');
      if (!eventDisclosureReference) throw new Error('Did not pass correct reference to emitting disclosure component element');
    });
  });

  it('Should fire a rvtDisclosureClosed custom event with correct element references', function() {
    cy.window().then(win => {
      var disclosure = win.document.querySelector(DISCLOSURE);
      var eventFired = false;
      var eventDisclosureReference;

      win.addEventListener('rvtDisclosureClosed', event => {
        eventFired = true;
        eventDisclosureReference = event.target == disclosure;
      });

      disclosure.close();

      if (!eventFired) throw new Error('Did not fire disclosureClosed event');
      if (!eventDisclosureReference) throw new Error('Did not pass correct reference to emitting disclosure component element');
    });
  });
});