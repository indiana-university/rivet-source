const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'static/js/rivet.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync(__dirname + '/alert.html');

// `aria` prefixed attributes
const LABELLEDBY = 'aria-labelledby';

describe('alert behavior', function () {
    const body = document.body;

    let root;
    let button;
    let buttons;

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
