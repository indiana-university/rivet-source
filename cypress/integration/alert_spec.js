const ALERT_INFO = '[aria-labelledby="information-alert-title"]';
const ALERT_CLOSE = ALERT_INFO + '>.rvt-alert__dismiss'
const DEV_SERVER = 'http://localhost:3000';

describe('Rivet alert interactions', function() {
    it('Visits the alert page', function() {
        cy.visit(DEV_SERVER + '/components/preview/alerts--default')
    })

    it('Should see the alert', function() {
        cy.get(ALERT_INFO)
            .should('have.attr', 'aria-labelledby', 'information-alert-title')
            .and('be.visible')
    })

    it('Should be able to close the alert', function() {
        cy.get(ALERT_CLOSE)
            .click()

        cy.get(ALERT_INFO)
            .should('not.be.visible')
    })
})