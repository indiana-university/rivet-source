const MODAL_TOGGLE = '[data-modal-trigger="modal-example"]';
const MODAL = '#modal-example';
const MODAL_CLOSE = '[data-modal-close="modal-example"]:first';
const DEV_SERVER = "http://localhost:3000";
const DOWN = 40;
const UP = 38;
const ENTER = 13;
const ESC = 27;

describe('Rivet modal interactions', function() {
  it('Visits the modal page', function() {
    cy.visit(DEV_SERVER + '/components/preview/modal');
  });

  it('Should see a modal button', function() {
    cy.get(MODAL_TOGGLE).should(
      'have.attr',
      'data-modal-trigger',
      'modal-example'
    );
  });

  it('Should not see a modal', function() {
    cy.get(MODAL)
      .should('not.be.visible')
      .and('have.attr', 'aria-hidden', 'true');
  });

  it('Should be able to open the modal', function() {
    cy.get(MODAL_TOGGLE).click();

    cy.get(MODAL)
      .should('have.attr', 'aria-hidden', 'false')
      .and('have.attr', 'tabindex', '-1')
      .and('be.visible');
  });

  it('Should be able to close the modal', function() {
    cy.get(MODAL_CLOSE).click();

    cy.get(MODAL).and('not.be.visible');
  });

  it('Should be able to close modal with esc key', function() {
    cy.get(MODAL_TOGGLE).click();

    cy.get('body').trigger('keydown', { keyCode: ESC, which: ESC });

    cy.get(MODAL).should('not.be.visible');
  });

  it('Should be able to click outside modal to close', function() {
    cy.get(MODAL_TOGGLE).click();

    cy.get('body').click();

    cy.get(MODAL).should('not.be.visible');
  });

  it('Should be able to open with .open() method', function() {
    cy.window().then(win => {
      win.Modal.open('modal-example');
    });

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'false');
  });

  it('Should be able to close with .close() method', function() {
    cy.window().then(win => {
      win.Modal.close('modal-example');
    });

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'true');
  });

  it('Should be able to open with .open() method with DOM element', function() {
    cy.window().then(win => {
      var modal = win.document.querySelector('.rvt-modal');
      win.Modal.open(modal);
    });

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'false');
  });

  it('Should execute a callback function after the modal is opened', function() {
    var myValue = 1;

    function sum(value) {
      myValue += value;
    }

    cy.window().then(win => {
      var modal = win.document.querySelector('.rvt-modal');
      win.Modal.open('modal-example', sum(2));
      assert.equal(typeof sum, 'function');
      assert.equal(myValue, 3);
    });

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'false');
  });

  it('Should execute a callback function after the modal is closed', function() {
    var myValue = 2;

    function sum(value) {
      myValue += value;
    }

    cy.window().then(win => {
      var modal = win.document.querySelector('.rvt-modal');
      win.Modal.close('modal-example', sum(2));
      assert.equal(typeof sum, 'function');
      assert.equal(myValue, 4);
    });

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'true');
  });

  it('Should be able to close with data-trigger-close="close"', function() {
    cy.get(MODAL_TOGGLE).click();

    cy.get('[data-modal-close="close"]').click();

    cy.get(MODAL).should('have.attr', 'aria-hidden', 'true');
  });

  it('Should not throw an error if removed then opened with .open() method', function() {
    cy.get(MODAL).then(modal => modal.remove());

    cy.window().then(win => {
      win.Modal.open('modal-example');
    });
  });

  // Modal does not exist in test DOM beyond this point

  it('Should not throw an error if removed then closed with .close() method', function() {
    cy.window().then(win => {
      win.Modal.close('modal-example');
    });
  });
});
