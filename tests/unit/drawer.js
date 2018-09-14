const assert = require('assert');
const fs = require('fs');
var vm = require('vm');
var path = 'dist/js/rivet.min.js';

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

  beforeEach(function () {
    body.innerHTML = TEMPLATE;
    Drawer.init();

    component = body.querySelector('.rvt-drawer');
    button = body.querySelector('.rvt-drawer-button');
    id = button.getAttribute('data-drawer-toggle');
  });

  describe('DOM state', function () {
    it('Has an "aria-expanded" attribute', function () {
      assert(button.getAttribute(EXPANDED));
    });

    it('Has an "aria-hidden" attribute', function () {
      assert(component.getAttribute(HIDDEN));
    });
  });

  describe('Drawer.open() method', function () {
    it('Drawer toggle should have aria-expanded="true" and drawer element should have aria-hidden="false"', function() {
      Drawer.open(id);
      assert.equal(button.getAttribute(EXPANDED), 'true');
      assert.equal(component.getAttribute(HIDDEN), 'false');
    });
  });

  describe('Drawer.close() method', function () {
    it('Drawer toggle should have aria-expanded="false" and drawer element should have aria-hidden="true"', function () {
      Drawer.open(id);

      Drawer.close(id);

      assert.equal(button.getAttribute(EXPANDED), 'false');
      assert.equal(component.getAttribute(HIDDEN), 'true');
    });
  });
});
