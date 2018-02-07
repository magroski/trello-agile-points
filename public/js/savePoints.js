/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

var inputIsValid = function (value) {
    if (value === '?') {
        return true;
    }

    return typeof (value * 1) === 'number';
};

// Elements with IDs are available as properties of `window`.
window.pointsForm.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    var estimatedValue = inputIsValid(window.estimated.value) ? window.estimatedValue : '';
    var consumedValue  = inputIsValid(window.consumed.value) ? window.consumedValue : '';
    return t.set('card', 'shared', 'agilePoints', {estimated: estimatedValue, consumed: consumedValue})
            .then(function () {
                t.closePopup();
            });
});

t.render(function () {
    return t.get('card', 'shared', 'agilePoints')
            .then(function (data) {
                window.estimated.value = data.estimated;
                window.consumed.value  = data.consumed;
            })
            .then(function () {
                t.sizeTo('#pointsForm').done();
            });

});