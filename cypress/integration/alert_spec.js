const DEV_SERVER = 'http://localhost:3000';

beforeEach(function () {
  cy.visit(`${DEV_SERVER}/components/preview/alert`);
  /**
   * Use cypress aliases to share the context of the list and toggle
   * elements across different assertions.
   */
  cy.get('[data-rvt-alert="info"]').as('infoAlert');
  cy.get('[data-rvt-alert="info"] >.rvt-alert__dismiss').as('infoAlertClose');
  cy.get('[data-rvt-alert="warning"]').as('warningAlert');
});

describe('Rivet alert interactions', function () {
  it('Should see the info alert page', function () {
    cy.get('@infoAlert')
      .should('have.attr', 'data-rvt-alert', 'info')
      .and('be.visible');

    cy.get('@infoAlertClose').should('be.visible');
  });

  it('Should be able to close the alert', function () {
    cy.get('@infoAlertClose').click();

    cy.get('@infoAlert').should('not.exist');
  });

  it('Should be able to dismiss with .dismiss() method', function () {
    cy.window().then(win => {
      var alert = win.document.querySelector(
        '[data-rvt-alert="warning"]'
      );
      alert.dismiss();
    });

    cy.get('@warningAlert').should('not.exist');
  });

});
