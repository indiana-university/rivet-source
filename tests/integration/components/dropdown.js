module.exports = {
    'Test closing Rivet dropdown' : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/header--main-nav")

            // make sure the dropdown is not showing
            .waitForElementNotVisible('#dropdown-1', 1000)

            // click the button to open the dropdown
            .click("[data-dropdown-trigger='dropdown-1']", function(response) {
                console.log(response.state === 'success' ? "Clicked link to open dropdown" : "Couldn't click link to open dropdown")
            })

            // make sure the dropdown is showing
            .waitForElementVisible('#dropdown-1', 1000);

        // make sure the aria-expanded and aria-hidden attributes are being set
        browser.expect.element("[data-dropdown-trigger='dropdown-1']").to.have.attribute('aria-expanded').equals('true')
        browser.expect.element("#dropdown-1").to.have.attribute('aria-hidden').equals('false')

        browser

            // click the link to close the dropdown
            .click("[data-dropdown-trigger='dropdown-1']", function(response) {
                console.log("Clicked link to close the dropdown")
            })

            // make sure the dropdown is not showing
            .waitForElementNotVisible('#dropdown-1', 1000)

            // open the dropdown by pressing enter
            .sendKeys("[data-dropdown-trigger='dropdown-1']", browser.Keys.ENTER, function() {
                console.log("Pressed enter to open the dropdown")
            })

            // make sure the dropdown is showing
            .waitForElementVisible('#dropdown-1', 1000)


            // close the dropdown by clicking outside of it
            .click("body", function() {
                console.log("Clicked outside the dropdown to close it")
            })

            // make sure the dropdown is not showing
            .waitForElementNotVisible('#dropdown-1', 1000)


            .end();
    }
};