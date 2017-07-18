var Alert = (function() {

    var config = {
        dismissButton: document.querySelectorAll('.alert__dismiss')
    }

    var init = function() {
        bindUiActions();
    }

    var bindUiActions = function() {
        for (var i = 0; i < config.dismissButton.length; i++) {
            config.dismissButton[i].addEventListener('click', function() {
                dismissAlert(this);
            });
        }
    }

    /**
     * @param {string} context - the element that was clicked to
     * to dimiss the alert
     */
    var dismissAlert = function(context) {
        var elToDismiss = context.parentNode;
        elToDismiss.parentNode.removeChild(elToDismiss);
    }

    return {
        init: init,
        dismiss: dismissAlert
    }

})();
