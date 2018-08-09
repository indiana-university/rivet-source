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
        it('Dropdown should be toggled to the opposite of its current state', function () {
            Dropdown.toggle(dropdownId);

            assert.equal(link.getAttribute(EXPANDED), 'true')
            assert.equal(component.getAttribute(HIDDEN), 'false')

            Dropdown.toggle(dropdownId);

            assert.equal(link.getAttribute(EXPANDED), 'false')
            assert.equal(component.getAttribute(HIDDEN), 'true')
        });
    });
});
