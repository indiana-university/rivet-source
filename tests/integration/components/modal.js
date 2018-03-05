module.exports = {
    'Test opening Rivet modal' : function (browser) {
        browser
            .url(browser.launchUrl + "/components/preview/modals--default")

            // make sure the modal isn't showing
            .waitForElementNotVisible('#modal-example', 1000)

            // click the button to open the modal
            .click("button[data-modal-trigger='modal-example']", function(response) {
                console.log(response.state === 'success' ? "Clicked button to open modal" : "Couldn't click button to open modal")
            })

            // make sure the modal is showing
            .waitForElementVisible('#modal-example', 1000)

            // click cancel
            .click("button[data-modal-close='close']", function(response) {
                console.log(response.state === 'success' ? "Clicked button to close modal" : "Couldn't click button to close modal")
            })

            // make sure the modal isn't showing
            .waitForElementNotVisible('#modal-example', 1000)

            // open the modal
            .click("button[data-modal-trigger='modal-example']", function() {
                console.log("Modal is open")
            })

            // make sure the modal is showing
            .waitForElementVisible('#modal-example', 1000)

            // click outside the modal
            .click("body", function() {
                console.log("Clicked outside modal to close it")
            })

            // make sure the modal isn't showing
            .waitForElementNotVisible('#modal-example', 1000)

            // open the modal
            .click("button[data-modal-trigger='modal-example']", function() {
                console.log("Modal is open")
            })

            // make sure the modal is showing
            .waitForElementVisible('#modal-example', 1000)

            // press esc
            .sendKeys('#modal-example', browser.Keys.ESCAPE, function() {
                console.log("Pressed esc to close the modal")
            })

            // make sure the modal isn't showing
            .waitForElementNotVisible('#modal-example', 1000)

            .end();
    }
};