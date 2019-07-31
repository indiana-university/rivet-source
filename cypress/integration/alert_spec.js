const ALERT_INFO = '[aria-labelledby="information-alert-title"]';
const ALERT_WARNING = '[aria-labelledby="warning-alert-title"]';
const ALERT_SUCCESS = '[aria-labelledby="success-alert-title"]';
const ALERT_CLOSE = ALERT_INFO + '>.rvt-alert__dismiss';
const DEV_SERVER = "http://localhost:3000";

describe('Rivet alert interactions', function() {
  it('Visits the info alert page', function() {
    cy.visit(DEV_SERVER + '/components/preview/alert');
  });

  it('Should see the info alert page', function() {
    cy.get(ALERT_INFO)
      .should('have.attr', 'aria-labelledby', 'information-alert-title')
      .and('be.visible');

    cy.get(ALERT_CLOSE).should('be.visible');
  });

  it('Should be able to close the alert', function() {
    cy.get(ALERT_CLOSE).click();

    cy.get(ALERT_INFO).should('not.exist');
  });

  it('Should be able to dismiss with .dismiss() method', function() {
    cy.window().then(win => {
      win.Alert.dismiss('warning-alert-title');
    });

    cy.get(ALERT_WARNING).should('not.exist');
  });

  it('Should be able to dismiss with .dismiss() method with DOM element', function() {
    cy.window().then(win => {
      var alert = win.document.querySelector(
        '[aria-labelledby="success-alert-title"]'
      );
      win.Alert.dismiss(alert);
    });

    cy.get(ALERT_SUCCESS).should('not.exist');
  });
});
