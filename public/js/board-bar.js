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
                return Promise.all(listPromises).then(
                    function (lists) {
                        console.log(lists);
                    }
                );
            })
            .then(function (listsSummary) {
                console.log(listsSummary);
                for (currentIndex in listsSummary) {
                    var currentSummary = listsSummary[currentIndex];
                    console.log(currentSummary);
                    console.log(listsSummary);
                    var listsDiv = document.getElementById('agile-points-lists');

                    var newList       = document.createElement('div');
                    newList.className = 'agile-list-summary';
                    var newSpan       = document.createElement('span');
                    newSpan.appendChild(document.createTextNode(currentSummary.name));
                    newList.appendChild(newSpan);
                    var newCounter = document.createElement('span');
                    newCounter.appendChild(document.createTextNode(currentSummary.consumed + '/' + currentSummary.estimated));
                    newList.appendChild(newCounter);

                    listsDiv.appendChild(newList);
                }
            });
});