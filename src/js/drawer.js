/**
 * This code is a wreck of a prototype. TODO: Need to create a new component for this
 */
var menuTrigger = document.querySelector('[data-drawer-trigger]');
var drawerId = menuTrigger.getAttribute('data-drawer-trigger');
var drawer = document.getElementById(drawerId);

menuTrigger.addEventListener('click', function() {
    var toggledState = drawer.getAttribute('aria-hidden') === 'true' || false;
    drawer.setAttribute('aria-hidden', !toggledState);
    // Toggle button open class
    this.classList.toggle('is-open');
});

// Subnav stuff
var subnavTriggers = document.querySelectorAll('[data-subnav-trigger]');

for(var i = 0; i < subnavTriggers.length; i++) {
    subnavTriggers[i].addEventListener('click', function() {
        var subnavID = this.getAttribute('data-subnav-trigger');
        var subnavEl = document.querySelector('#' + subnavID);

        toggleHiddenState(subnavEl);
    });
}

/**
 * Using this same function in a few different places.
 * IDEA: Should we start a "Utils" component and move stuff like this
 * that we are using in multiple components into their own file?
 */
var toggleHiddenState = function(itemToToggle) {
    var menuState = itemToToggle.getAttribute('aria-hidden') === 'true' || false;
    itemToToggle.setAttribute('aria-hidden', !menuState);
}
