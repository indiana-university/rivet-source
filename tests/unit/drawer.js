const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'static/js/rivet.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/13-header/header--persistent-drawer.hbs');

// `aria` prefixed attributes
const EXPANDED = 'aria-expanded';
const HIDDEN   = 'aria-hidden';

describe('Drawer component behavior', function () {
    const body = document.body;

    let component;
    let button;
    let buttons;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Drawer.init();

        component = body.querySelector('.rvt-drawer');
        buttons = body.querySelectorAll('.rvt-drawer-button');
        button = buttons[ 0 ];
    });

    describe('DOM state', function () {
        it('Has an "aria-expanded" attribute', function () {
            assert(button.getAttribute(EXPANDED));
        });

        it('Has an "aria-hidden" attribute', function () {
            assert(component.getAttribute(HIDDEN));
        });
    });

    describe('button.click()', function () {

        it('Clicking button to open drawer', function() {
            button.click()
            //assert.equal(button.getAttribute(EXPANDED), 'true')
            //assert.equal(component.getAttribute(HIDDEN), 'false')
        });
    });
});
