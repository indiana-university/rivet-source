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

describe('Dropdown component behavior', function () {
    const body = document.body;

    let component;
    let link;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Dropdown.init();

        component = body.querySelector('.dropdown__menu');
        link = body.querySelector('.dropdown__trigger');
    });

    describe('DOM state', function () {
        it('Has an "aria-expanded" attribute', function () {
            assert.equal(link.getAttribute(EXPANDED), 'false');
        });

        it('Has an "aria-hidden" attribute', function () {
            assert.equal(component.getAttribute(HIDDEN), 'true');
        });
    });

    describe('Dropdown.toggle()', function () {

        it('Clicking link to open dropdown', function() {
            Dropdown.toggle(link, component);
            assert.equal(link.getAttribute(EXPANDED), 'true')
            assert.equal(component.getAttribute(HIDDEN), 'false')
        });
    });
});
