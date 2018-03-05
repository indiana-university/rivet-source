var Alert = (function() {
    var init = function() {
        _bindUiActions();
    }

    var _bindUiActions = function() {
        document.addEventListener('click', function(e) {
            _handleClick(e);
        });
    }

    var _handleClick = function(event) {
        var dismissButton = event.target.closest('.rvt-alert__dismiss');

        // If the target wasn't the dismiss button bail.
        if (!dismissButton) return;

        // Get the parent node of the dsimiss button i.e. the alert container
        var alertThatWasClicked = dismissButton.parentNode;

        dismissAlert(alertThatWasClicked);
    }

    var dismissAlert = function(alert) {
        alert.parentNode.removeChild(alert);
    }

    // Expose public methods
    return {
        init: init,
        dismiss: dismissAlert
    }
})();
