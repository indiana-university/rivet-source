module.exports = {
    "Test switching Rivet tabs" : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/tabs")

            // make sure the first tab is visible
            .waitForElementVisible('#tab-1', 1000)

            // make sure the second tab is not visible
            .waitForElementNotVisible('#tab-2', 1000)

            // click the button to open second tab
            .click("#t-two", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab two" : "Couldn't click button")
            })

            // make sure the second tab is visible
            .waitForElementVisible('#tab-2', 1000)

            // make sure the first tab is not visible
            .waitForElementNotVisible('#tab-1', 1000)

            // click the button to open third tab
            .click("#t-three", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab three" : "Couldn't click button")
            })

            // make sure the third tab is visible
            .waitForElementVisible('#tab-3', 1000)

            // make sure the second tab is not visible
            .waitForElementNotVisible('#tab-2', 1000)

            .url(browser.launchUrl + "/components/preview/tabs--vertical")

            // make sure the first tab is visible
            .waitForElementVisible('#tab-1', 1000)

            // make sure the second tab is not visible
            .waitForElementNotVisible('#tab-2', 1000)

            // click the button to open second tab
            .click("#t-two", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab two" : "Couldn't click button")
            })

            // make sure the second tab is visible
            .waitForElementVisible('#tab-2', 1000)

            // make sure the first tab is not visible
            .waitForElementNotVisible('#tab-1', 1000)

            // click the button to open third tab
            .click("#t-three", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab three" : "Couldn't click button")
            })

            // make sure the third tab is visible
            .waitForElementVisible('#tab-3', 1000)

            // make sure the second tab is not visible
            .waitForElementNotVisible('#tab-2', 1000)

            .end();
    }
};