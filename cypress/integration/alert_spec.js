const ALERT_INFO = '[data-alert="info"]';
const ALERT_WARNING = '[data-alert="warning"]';
const WARNING_CLOSE = ALERT_WARNING + '>.rvt-alert__dismiss';
const ALERT_CLOSE = ALERT_INFO + '>.rvt-alert__dismiss';
const DEV_SERVER = 'http://localhost:3000';

describe('Rivet alert interactions', function () {
  it('Visits the info alert page', function () {
    cy.visit(DEV_SERVER + '/components/preview/alert');
  });

  it('Should see the info alert page', function () {
    cy.get(ALERT_INFO)
      .should('have.attr', 'data-alert', 'info')
      .and('be.visible');

    cy.get(ALERT_CLOSE).should('be.visible');
  });

  it('Should be able to close the alert', function () {
    cy.get(ALERT_CLOSE).click();

    cy.get(ALERT_INFO).should('not.exist');
  });

  /*
  it('Should be able to dismiss with .dismiss() method', function () {
    cy.window().then(win => {
      cy.spy(console, 'log');

      win.addEventListener(win.Rivet.Alert.prototype.dismiss.name, function () {
        console.log('You did it?');
      });

      cy.get(WARNING_CLOSE).click();

      expect(console.log).to.be.called;
    });

    cy.get(ALERT_WARNING).should('not.exist');
  });
  */

});
