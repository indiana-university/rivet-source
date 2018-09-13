describe('Rivet Drawer', function() {
    it('Does not do much!', function() {
        expect(true).to.equal(true)
    })
    it('Visits the drawer', function() {
        cy.visit('http://localhost:3000/components/preview/header--persistent-drawer')
    })

    it('Should see a button', function() {
        cy.get('.rvt-drawer-button')
            .should('have.attr', 'data-drawer-toggle', 'mobile-drawer')
    })
})