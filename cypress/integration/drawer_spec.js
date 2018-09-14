describe('Rivet Drawer', function() {
    it('Visits the drawer page', function() {
        cy.visit('http://localhost:3000/components/preview/header--persistent-drawer')
    })

    it('Should see a button', function() {
        cy.get('.rvt-drawer-button')
            .should('have.attr', 'data-drawer-toggle', 'mobile-drawer')
    })

    it('Should be able to open the drawer', function() {
        cy.get('.rvt-drawer-button')
            .click()
            .should('have.attr', 'aria-expanded', 'true')

        cy.get('#mobile-drawer')
            .should('have.attr', 'aria-hidden', 'false')
    })

    it('Should be able to use arrow keys', function() {
        cy.get('#mobile-drawer')
            .type('{downarrow}', {force: true})

        cy.focused()
            .should('have.attr', 'aria-expanded', 'false')
            .click()

        cy.focused()
            .type('{downarrow}', {force: true})

        cy.focused()
            .should('have.text', 'Account settings')
    })

    it('Should be able to use esc key', function() {
        cy.get('#mobile-drawer')
            .type('{esc}', {force: true})

        cy.get('.rvt-drawer-button')
            .click()
            .should('have.attr', 'aria-expanded', 'false')

        cy.get('#mobile-drawer')
            .should('have.attr', 'aria-hidden', 'true')
    })
})