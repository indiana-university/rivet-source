const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'dist/js/rivet.min.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

const TEMPLATE = fs.readFileSync('src/components/20-tabs/tabs.hbs');

// `aria` prefixed attributes
const SELECTED = 'aria-selected';
const HIDDEN   = 'hidden';

describe('Tabs component behavior', function () {
    const body = document.body;

    let panels;
    let tabs;

    beforeEach(function () {
        body.innerHTML = TEMPLATE;
        Tabs.init();

        panels = body.querySelectorAll('[role="tabpanel"]');
        tabs = body.querySelectorAll('[role="tab"]');
    });

    describe('DOM state', function () {
        it('The first panel is open', function () {
            assert.equal(panels[0].getAttribute(HIDDEN), null);
        });
        it('The second panel is closed', function () {
            assert.equal(panels[1].getAttribute(HIDDEN), "");
        });
    });

});
