const DRAWER_TOGGLE = '[data-drawer-toggle="mobile-drawer"]';
const DRAWER_MENU = '#mobile-drawer';
const DRAWER_CLOSE = '.rvt-drawer__bottom-close'
const DEV_SERVER = 'http://localhost:3000';

describe('Rivet drawer interactions', function() {
    it('Visits the drawer page', function() {
        cy.visit(DEV_SERVER + '/components/preview/header--persistent-drawer')
    })

    it('Should see a button', function() {
        cy.get(DRAWER_TOGGLE)
            .should('have.attr', 'data-drawer-toggle', 'mobile-drawer')
    })

    it('Should not see a drawer menu', function() {
        cy.get(DRAWER_MENU)
            .should('not.be.visible')
    })

    it('Should be able to open the drawer', function() {
        cy.get(DRAWER_TOGGLE)
            .click()
            .should('have.attr', 'aria-expanded', 'true')

        cy.get(DRAWER_MENU)
            .should('have.attr', 'aria-hidden', 'false')
            .and('be.visible')
    })

    it('Should be able to use arrow keys', function() {
        cy.focused()
            .trigger('keydown', {keyCode: 40, which: 40})

        cy.focused()
            .should('have.attr', 'aria-expanded', 'false')
            .click()

        cy.focused()
            .trigger('keydown', {keyCode: 13, which: 13})
            .trigger('keydown', {keyCode: 40, which: 40})

        cy.focused()
            .should('have.text', 'Account settings')
    })

    it('Should be able to use esc key', function() {
        cy.focused()
            .trigger('keyup', {keyCode: 27, which: 27})


        cy.get(DRAWER_TOGGLE)
            .click()
            .should('have.attr', 'aria-expanded', 'false')

        cy.get(DRAWER_MENU)
            .should('have.attr', 'aria-hidden', 'true')
            .and('not.be.visible')
    })

    it('Should be able to close with close button', function() {
        cy.get(DRAWER_TOGGLE)
            .click()

        // down arrow -> up arrow -> click
        cy.focused()
            .trigger('keydown', {keyCode: 40, which: 40})
        cy.focused()
            .trigger('keydown', {keyCode: 38, which: 38})
        cy.focused()
            .click()

        cy.get(DRAWER_MENU)
            .should('have.attr', 'aria-hidden', 'true')
            .and('not.be.visible')
    })
})