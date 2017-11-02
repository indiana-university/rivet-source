module.exports = {
    'Test closing Rivet alert' : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/alerts--default")

            // make sure the alert is showing
            .waitForElementVisible('div[aria-labelledby="information-alert-title"]', 1000)

            // click the button to close the alert
            .click("button.rvt-alert__dismiss", function(response) {
                console.log(response.state === 'success' ? "Clicked button to close alert" : "Couldn't click button to close alert")
            })

            // make sure the alert is not in the DOM
            .waitForElementNotPresent('div[aria-labelledby="information-alert-title"]', 1000)

            .end();
    }
};