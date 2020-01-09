const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/modal`);
  /**
   * Use cypress aliases to share the context of the modal, trigger, and close
   * elements across different assertions.
   */
  cy.get('[data-modal="modalExample"]').as('modal');
  cy.get('[data-modal-close="modalExample"].rvt-modal__close').as('modalClose');
  cy.get('[data-modal-trigger="modalExample"]').as('modalTrigger');
  cy.get('[data-modal="modalDialogExample"]').as('modalDialog');
  cy.get('[data-modal-close="modalDialogExample"]').as('modalDialogClose');
  cy.get('[data-modal-trigger="modalDialogExample"]').as('modalDialogTrigger');

});

describe('Rivet basic modal interactions', function () {
  it('Should see the modal page', function () {
    cy.get('@modalTrigger')
      .should('have.attr', 'data-modal-trigger', 'modalExample')
      .and('be.visible');

    cy.get('@modal').should('not.be.visible');
  });

  it('Should be able to open the modal', function () {
    cy.get('@modal').should('not.be.visible');

    cy.get('@modalTrigger').click();

    cy.get('@modal').should('be.visible');
  });

  it('Should be able to close the modal with a close button', function () {
    cy.get('@modal').should('not.be.visible');

    cy.get('@modalTrigger').click();

    cy.get('@modal').should('be.visible');

    cy.get('@modalClose').click();

    cy.get('@modal').should('not.be.visible');
  });

  it('Should be able to close the modal by clicking outside', function () {
    cy.get('@modal').should('not.be.visible');

    cy.get('@modalTrigger').click();

    cy.get('@modal').should('be.visible');

    cy.get('body').click();

    cy.get('@modal').should('not.be.visible');
  });

  it('Should be able to open the modal with the .open() method', function () {
    cy.get('@modal').should('not.be.visible');

    cy.window().then(win => {
      win.newmodalExampleModal.open();
    });

    cy.get('@modal').should('be.visible');
  });

  it('Should be able to close the modal with the .close() method', function () {
    cy.get('@modal').should('not.be.visible');

    cy.get('@modalTrigger').click();

    cy.get('@modal').should('be.visible');

    cy.window().then(win => {
      win.newmodalExampleModal.close();
    });

    cy.get('@modal').should('not.be.visible');
  });

});

describe('Rivet dialog modal interactions', function () {
  it('Should not be able to close the modal by clicking outside', function () {
    cy.get('@modalDialog').should('not.be.visible');

    cy.get('@modalDialogTrigger').click();

    cy.get('@modalDialog').should('be.visible');

    cy.get('body').click();

    cy.get('@modalDialog').should('be.visible');
  });
});