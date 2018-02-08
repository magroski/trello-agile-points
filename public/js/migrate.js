/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

var inputIsValid = function (value) {
    if (value === '?') {
        return true;
    }

    return !isNaN(value);
};

// Elements with IDs are available as properties of `window`.
window.settingsForm.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();

    return t.cards('all')
            .then(function (cards) {
                var cardPromises = [];
                for (cardIndex in cards) {
                    var currentCard    = cards[cardIndex];
                    var estimatedValue = '';
                    var consumedValue  = '';

                    var matches = /\(([^)]+)\)/g.exec(currentCard.name);
                    for (matchIndex in matches) {
                        var currentMatch = matches[matchIndex];
                        if (inputIsValid(currentMatch)) {
                            estimatedValue = currentMatch;
                        }
                    }

                    var matches = /\[([^\]]+)\]/g.exec(currentCard.name);
                    for (matchIndex in matches) {
                        var currentMatch = matches[matchIndex];
                        if (!isNaN(currentMatch)) {
                            consumedValue = currentMatch;
                        }
                    }

                    cardPromises.push(t.set(currentCard.id, 'shared', 'agilePoints', {estimated: estimatedValue, consumed: consumedValue}));
                }
                return Promise.all(cardPromises);
            })
            .then(function () {
                t.closePopup();
            });
});

t.render(function () {
    return t.sizeTo('#settingsForm').done();
});