var Alert = (function() {

    var init = function() {
        _bindUiActions();
    }

    var _bindUiActions = function() {
        document.addEventListener('click', function(e) {
            dismissAlert(e);
        });
    }

    var dismissAlert = function(e) {
        var dismissButton = e.target.closest('.rvt-alert__dismiss');
        if (!dismissButton) return;
        var elToDismiss = dismissButton.parentNode;
        elToDismiss.parentNode.removeChild(elToDismiss);
    }

    // Expose public methods
    return {
        init: init,
        dismiss: dismissAlert
    }

})();
