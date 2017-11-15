module.exports = {
    "Test switching Rivet tabs" : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/tabs--multiple")

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


            // click the button to open first tab in second tabset
            .click("#t-1", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab one in second tabset" : "Couldn't click button")
            })

            // make sure the first tab from second tabset is visible
            .waitForElementVisible('#tab2-1', 1000)

            // make sure the third tab is still visible from first tabset
            .waitForElementVisible('#tab-3', 1000)


            // click the button to open second tab from second tabset
            .click("#t-2", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab two in second tabset" : "Couldn't click button")
            })

            // make sure the first tab from second tabset is visible
            .waitForElementVisible('#tab2-2', 1000)

            // make sure the third tab is not visible
            .waitForElementNotVisible('#tab2-1', 1000)


            // click the button to open third tab from second tabset
            .click("#t-3", function(response) {
                console.log(response.state === 'success' ? "Clicked button to switch to tab three in second tabset" : "Couldn't click button")
            })

            // make sure the first tab from second tabset is visible
            .waitForElementVisible('#tab2-3', 1000)

            // make sure the third tab is not visible
            .waitForElementNotVisible('#tab2-2', 1000)

            .end();
    }
};