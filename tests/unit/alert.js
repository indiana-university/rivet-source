const assert = require('assert');
const Alert = require("../../src/js/components/alert");

const fs = require('fs');

const TEMPLATE = fs.readFileSync(__dirname + '/alert.html');

// `aria` prefixed attributes
const LABEL = 'aria-labelledby';

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
        it('has an "aria-labelledby" attribute', function () {
            assert(root.getAttribute(LABEL));
        });
    });

    describe('Alert.dismiss()', function () {
        beforeEach(function () {
            Alert.dismiss();
        });


    });
});
