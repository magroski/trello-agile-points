/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// Elements with IDs are available as properties of `window`.
window.pointsForm.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    var estimatedValue = (window.estimated.value === '?' || !isNaN(typeof window.estimated.value)) ? window.estimatedValue : '';
    var consumedValue  = (window.consumed.value === '?' || !isNaN(window.consumed.value)) ? window.consumedValue : '';
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