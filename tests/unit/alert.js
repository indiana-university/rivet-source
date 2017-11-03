const Alert = require("../../src/js/components/alert");
const assert = require('assert');
const fs = require('fs');

const TEMPLATE = fs.readFileSync(__dirname + '/alert.html');

// `aria` prefixed attributes
const LABELLEDBY = 'aria-labelledby';

describe('alert behavior', function () {
    const body = document.body;

    let root;
    let button;
    let buttons;
    let content;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Alert.init();

        root = body.querySelector('.rvt-alert');

        buttons = root.querySelectorAll('.rvt-alert__dismiss');
        button = buttons[ 0 ];
    });

    describe('DOM state', function () {
        it('Has an "aria-labelledby" attribute', function () {
            assert(root.getAttribute(LABELLEDBY));
        });
    });


    describe('alert.dismiss()', function () {
        it('Removes the alert from the DOM when dismissed', function() {

            assert.equal(document.querySelector('.rvt-alert'), root)
            Alert.dismiss(root);
            assert.equal(document.querySelector('.rvt-alert'), null)

        });
    });
});
