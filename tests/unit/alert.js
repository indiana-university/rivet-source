const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'static/js/rivet.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/11-alerts/alerts.hbs');

// `aria` prefixed attributes
const LABELLEDBY = 'aria-labelledby';

describe('Alert component behavior', function () {
    const body = document.body;

    let component;
    let button;
    let buttons;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Alert.init();

        component = body.querySelector('.rvt-alert');
        buttons = component.querySelectorAll('.rvt-alert__dismiss');
        button = buttons[ 0 ];
    });

    describe('DOM state', function () {
        it('Has an "aria-labelledby" attribute', function () {
            assert(component.getAttribute(LABELLEDBY));
        });
    });


    describe('Alert.dismiss()', function () {
        it('Removes the alert from the DOM when dismissed', function() {
            assert.equal(document.querySelector('.rvt-alert'), component)
            Alert.dismiss(component);
            assert.equal(document.querySelector('.rvt-alert'), null)
        });
    });
});
