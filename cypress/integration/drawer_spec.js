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


        cy.get('.rvt-drawer-button')
            .click()
            .should('have.attr', 'aria-expanded', 'false')

        cy.get('#mobile-drawer')
            .should('have.attr', 'aria-hidden', 'true')
    })
})