module.exports = {
    "Test closing Rivet drawer" : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/header--persistent-drawer")

            // make sure the drawer is not showing
            .waitForElementNotVisible('.rvt-drawer', 1000)

            // click the button to open the drawer
            .click("[data-drawer-trigger='mobile-drawer']", function(response) {
                console.log(response.state === 'success' ? "Clicked button to open drawer" : "Couldn't click button to open drawer")
            })

            // make sure the drawer is showing
            .waitForElementVisible('.rvt-drawer', 1000);

        // check for aria attributes
        browser.expect.element("[data-drawer-trigger='mobile-drawer']")
            .to.have.attribute('aria-expanded')
            .equals('true')

        browser.expect.element(".rvt-drawer")
            .to.have.attribute('aria-hidden')
            .equals('false')

        browser

            // open subnav dropdown
            .click('[data-subnav-trigger="subnav-drawer-only"]', function () {
                console.log("Clicked sub-nav with dropdown")
            })


            // make sure the sub nav is showing
            .waitForElementVisible('#subnav-drawer-only', 1000)

            // close the drawer
            .click("[data-drawer-trigger='mobile-drawer']", function() {
                console.log("Clicked the drawer button toggle to hide it")
            })

            // make sure the drawer is not showing
            .waitForElementNotVisible('.rvt-drawer', 1000)

            .end();
    }
};