const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'dist/js/rivet.min.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/11-alerts/alerts.hbs');

// `aria` prefixed attributes
const LABELLEDBY = 'aria-labelledby';

describe('Alert component behavior', function () {
    const body = document.body;

    let component;
    let button;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Alert.init();

        component = body.querySelector('.rvt-alert');
        button = component.querySelector('.rvt-alert__dismiss');
    });

    describe('DOM state', function () {
        it('Has an "aria-labelledby" attribute', function () {
            assert(component.getAttribute(LABELLEDBY));
        });
    });

    /**
     * Since we switech to an event delegation approach this unit test
     * doesn't really make sense. The Alert.dismiss() method
     * now only needs to accept an event, which you can't really unit test.
     * The integration test is still passing though.
     */

    /*
    describe('Alert.dismiss()', function () {
        it('Removes the alert from the DOM when dismissed', function() {
            assert.equal(document.querySelector('.rvt-alert'), component)
            Alert.dismiss();
            assert.equal(document.querySelector('.rvt-alert'), null)
        });
    });
    */
});
