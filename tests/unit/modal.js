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

    let modal;
    let button;
    let id;

    beforeEach(function () {
        // Get the stub for testing
        body.innerHTML = TEMPLATE;

        // Initialize the modal component
        Modal.init();

        // Reference to the first modal in the stub
        modal = body.querySelector('.rvt-modal');

        // Reference to the first modal trigger button
        button = body.querySelector('[data-modal-trigger]');

        // The id string for the modal we're testing
        id = modal.id;
    });

    describe('Modal DOM state', function () {
        it('Should have a trigger and a id that match', function() {
            assert.equal(button.getAttribute('data-modal-trigger'), id);
        });

        // Modal should be hidden
        it('Should have an have an "aria-hidden" attribute that is set to "true"', function () {
            assert.equal(modal.getAttribute(HIDDEN), 'true');
        });
    });

    describe('Modal.open()', function () {
        it('Should open the modal with the id given as the first argument', function() {
            Modal.open(id);
            assert.equal(modal.getAttribute(HIDDEN), 'false');
        });

        it('Should open the modal when passed a DOM node', function() {
            // Make sure the modal is closed
            Modal.close(id);

            // Open the modal passing it a the actual modal DOM element
            Modal.open(modal);

            // Modal should be open
            assert.equal(modal.getAttribute(HIDDEN), 'false');
        });

        it('Should execute a callback function after the modal is opened', function() {
            let myValue = 1;

            function sum(value) {
                myValue += value;
            }

            Modal.open(id, sum(2));

            assert.equal(typeof sum, 'function');

            assert.equal(myValue, 3);
        });
    });

    describe('Modal.close()', function() {
        it('Should close the modal with the id given as the first argument', function() {
            Modal.close(id);
            assert.equal(modal.getAttribute(HIDDEN), 'true');
        });

        it('Should open the modal when passed a DOM node', function () {
            // Make sure the modal is open
            Modal.open(id);

            // Open the modal passing it a the actual modal DOM element
            Modal.close(modal);

            // Modal should be closed
            assert.equal(modal.getAttribute(HIDDEN), 'true');
        });

        it('Should execute a callback function after the modal is closed', function () {
            let myValue = 2;

            function sum(value) {
                myValue += value;
            }

            Modal.close(id, sum(2));

            assert.equal(typeof sum, 'function');

            assert.equal(myValue, 4);
        });
    })
});
