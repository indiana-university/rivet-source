/**
 * I found this script here on this blog post:
 * https://bitsofco.de/accessible-modal-modal/
 *
 * It's really well done. We could use it as a starting point for sure.
 * We need to figure out a more sane way to use mutliple modals on one page.
 * Preferable with a nice DOM api using data attributes to specify target
 * modals with unique IDs, etc.
 */

/**
 * 1. Pass the Modal() a name (ex: 'modal-alpha')
 * 2. Add the name as an id attribute on the modal element
 * 3. Add a data-modal attribute to the .open-modal with a value of the modal name
 */


function Modal(modalName) {
	this.modalEl = document.querySelector('#'+modalName);
    if(!this.modalEl) {
        console.error("Could not find modal element #"+modalName);
        return;
    }
	this.overlayEl = document.querySelector('.uitsds-modal-overlay');
	this.focusedElBeforeOpen;

	var focusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];

    this.addEventListeners(
        ".open-modal[data-modal='"+modalName+"']",
        '#'+modalName+' .close-modal');

	this.close(); // Reset
}


Modal.prototype.open = function() {

	var Modal = this;

	this.modalEl.removeAttribute('aria-hidden');
	this.overlayEl.removeAttribute('aria-hidden');

	this.focusedElBeforeOpen = document.activeElement;

	this.modalEl.addEventListener('keydown', function(e) {
		Modal._handleKeyDown(e);
	});

	this.overlayEl.addEventListener('click', function() {
		Modal.close();
	});

	this.firstFocusableEl.focus();
};

Modal.prototype.close = function() {

	this.modalEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);

	if ( this.focusedElBeforeOpen ) {
		this.focusedElBeforeOpen.focus();
	}
};


Modal.prototype._handleKeyDown = function(e) {

	var Modal = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if ( document.activeElement === Modal.firstFocusableEl ) {
			e.preventDefault();
			Modal.lastFocusableEl.focus();
		}
	}
	function handleForwardTab() {
		if ( document.activeElement === Modal.lastFocusableEl ) {
			e.preventDefault();
			Modal.firstFocusableEl.focus();
		}
	}

	switch(e.keyCode) {
	case KEY_TAB:
		if ( Modal.focusableEls.length === 1 ) {
			e.preventDefault();
			break;
		}
		if ( e.shiftKey ) {
			handleBackwardTab();
		} else {
			handleForwardTab();
		}
		break;
	case KEY_ESC:
		Modal.close();
		break;
	default:
		break;
	}


};


Modal.prototype.addEventListeners = function(openModalSel, closeModalSel) {

	var Modal = this;

	var openModalEls = document.querySelectorAll(openModalSel);
	for ( var i = 0; i < openModalEls.length; i++ ) {
		openModalEls[i].addEventListener('click', function() {
			Modal.open();
		});
	}

	var closeModalEls = document.querySelectorAll(closeModalSel);
	for ( var i = 0; i < closeModalEls.length; i++ ) {
		closeModalEls[i].addEventListener('click', function() {
			Modal.close();
		});
	}

};
