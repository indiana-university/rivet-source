const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'dist/js/rivet.min.js';

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
    let id;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Modal.init();

        component = body.querySelector('.rvt-modal');

        button = body.querySelector('.rvt-button');

        id = component.id;
    });

    describe('DOM state', function () {
        it('Has an "data-modal-trigger" attribute', function () {
            assert.equal(button.getAttribute('data-modal-trigger'), 'modal-example');
        });

        it('Has an "aria-hidden" attribute', function () {
            assert.equal(component.getAttribute(HIDDEN), 'true');
        });
    });

    describe('Modal.open()', function () {
        it('Should open the modal with the id given as the first argument', function() {
            Modal.open(id);
            assert.equal(component.getAttribute(HIDDEN), 'false');
        });
    });

    describe('Modal.close()', () => {
        it('Should close the modal with the id given as the first argument', () => {
            Modal.close(id);
            assert.equal(component.getAttribute(HIDDEN), 'true');
        });
    })
});
