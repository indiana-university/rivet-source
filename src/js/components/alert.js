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
        // If the target wasn't the dismiss button bail.
        if (!dismissButton) return;
        // Get the parent node of the dsimiss button i.e. the alert container
        var elToDismiss = dismissButton.parentNode;
        // Go up one level to the parent of the alert and then remove the alert
        elToDismiss.parentNode.removeChild(elToDismiss);
    }

    // Expose public methods
    return {
        init: init,
        dismiss: dismissAlert
    }

})();
