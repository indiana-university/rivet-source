const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'static/js/rivet.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/12-modals/modals.hbs');

// `aria` prefixed attributes
const EXPANDED = 'aria-expanded';
const HIDDEN   = 'aria-hidden';

describe('Modal component behavior', function () {
    const body = document.body;

    let component;
    let button;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Modal.init();

        component = body.querySelector('.rvt-modal');
        button = body.querySelector('.rvt-button');
    });

    describe('DOM state', function () {
        it('Has an "data-modal-trigger" attribute', function () {
            assert.equal(button.getAttribute('data-modal-trigger'), 'modal-example');
        });

        it('Has an "aria-hidden" attribute', function () {
            assert.equal(component.getAttribute(HIDDEN), 'true');
        });
    });

    describe('Modal.open() and Modal.close()', function () {

        it('Clicking button to open modal', function() {
            Modal.open(component);
            assert.equal(component.getAttribute(HIDDEN), null)
        });

        it('Clicking cancel button to close modal', function() {
            Modal.close(component);
            assert.equal(component.getAttribute(HIDDEN), 'true')
        });
    });
});
