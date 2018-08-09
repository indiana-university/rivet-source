const assert = require('assert');
const fs = require('fs');
var vm = require('vm')
var path = 'dist/js/rivet.min.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/13-header/header--persistent-drawer.hbs');

// `aria` prefixed attributes
const EXPANDED = 'aria-expanded';
const HIDDEN   = 'aria-hidden';

describe('Dropdown component behavior', function () {
    const body = document.body;

    let component;
    let link;
    let dropdownId;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Dropdown.init();

        component = body.querySelector('.rvt-dropdown__menu');
        link = body.querySelector('.rvt-dropdown__toggle');
        dropdownId = component.getAttribute('id');
    });

    describe('DOM state', function () {
        it('Has an "aria-expanded" attribute', function () {
            assert.equal(link.getAttribute(EXPANDED), 'false');
        });

        it('Has an "aria-hidden" attribute', function () {
            assert.equal(component.getAttribute(HIDDEN), 'true');
        });
    });

    describe('Dropdown.open()', function () {
        it('Toggle should have an aria-expanded attribute with a value of "true", and menu should have an aria-hidden with a value of "false"', function() {
            Dropdown.open(dropdownId);
            assert.equal(link.getAttribute(EXPANDED), 'true')
            assert.equal(component.getAttribute(HIDDEN), 'false')
        });
    });

    describe('Dropdown.close()', function () {
        it('Toggle should have an aria-expanded attribute with a value of "false", and menu should have an aria-hidden with a value of "true"', function () {
            Dropdown.close(dropdownId);
            assert.equal(link.getAttribute(EXPANDED), 'false')
            assert.equal(component.getAttribute(HIDDEN), 'true')
        });
    });

    describe('Dropdown.toggle()', function () {
        it('Should toggle the Dropdown open', function () {
            /**
             * The stubs were using to test the DOM here will always
             * have aria-expanded on the toggle button set to "false
             * and, and aria-hidden set to "true" to start out so we
             * can safely assume a "closed" state here.
             */

            Dropdown.toggle(dropdownId);

            /**
             * And then assert that the menu should be "open" after
             * running the .toggle() method for the first time.
             */

            assert.equal(link.getAttribute(EXPANDED), 'true')
            assert.equal(component.getAttribute(HIDDEN), 'false')
        });

        it('Should toggle the Dropdown closed', function() {
            /**
             * Mock the state of the Dropdown being open.
             */
            link.setAttribute(EXPANDED, 'true');
            component.setAttribute(HIDDEN, 'false');

            Dropdown.toggle(dropdownId);

            // Dropdown should be closed.
            assert.equal(link.getAttribute(EXPANDED), 'false')
            assert.equal(component.getAttribute(HIDDEN), 'true')
        })
    });
});
