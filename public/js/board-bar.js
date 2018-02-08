/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function () {
    return t.lists('all')
            .then(function (lists) {
                var listPromises = [];
                for (var listsIndex = 0; listsIndex < lists.length; listsIndex++) {
                    var currentList = lists[listsIndex];

                    var cardPromises = [];
                    for (cardsIndex in currentList.cards) {
                        var currentCard = currentList.cards[cardsIndex];
                        cardPromises.push(t.get(currentCard.id, 'shared', 'agilePoints'));
                    }

                    listPromises.push(Promise.all(cardPromises).then(
                        function (listName, cards) {
                            var totalEstimated = 0;
                            var totalConsumed  = 0;
                            for (cardIndex in cards) {
                                var card = cards[cardIndex];
                                if (typeof  card === typeof undefined) {
                                    continue;
                                }
                                if (!isNaN(card.estimated)) {
                                    totalEstimated += card.estimated * 1;
                                }
                                if (!isNaN(card.consumed)) {
                                    totalConsumed += card.consumed * 1;
                                }
                            }
                            return {name: listName, consumed: totalConsumed, estimated: totalEstimated};
                        }.bind(null, currentList.name)
                    ));
                }
                return Promise.all(listPromises);
            })
            .then(function (listsSummary) {
                var width = 100 / listsSummary.length;
                for (currentIndex in listsSummary) {
                    var currentSummary = listsSummary[currentIndex];
                    var listsDiv       = document.getElementById('agile-points-lists');

                    var newList         = document.createElement('div');
                    newList.className   = 'agile-list-summary';
                    newList.style.width = width + '%';

                    var cardTitle = document.createElement('h1');
                    cardTitle.appendChild(document.createTextNode(currentSummary.name));
                    newList.appendChild(cardTitle);

                    var newImage            = document.createElement('img');
                    newImage.src            = './i/white-card.svg';
                    newImage.style.width    = (width / 2) + '%';
                    newImage.style.cssFloat = 'left';
                    newList.appendChild(newImage);

                    var newSubtitleDiv       = document.createElement('div');
                    newSubtitleDiv.className = 'agile-counter-title';
                    newSubtitleDiv.appendChild(document.createTextNode('Consumed'));
                    newList.appendChild(newSubtitleDiv);

                    var newCounter       = document.createElement('div');
                    newCounter.className = 'agile-counter-title';
                    newCounter.appendChild(document.createTextNode(currentSummary.consumed + ' of ' + currentSummary.estimated));
                    newList.appendChild(newCounter);

                    listsDiv.appendChild(newList);
                }
            });
});