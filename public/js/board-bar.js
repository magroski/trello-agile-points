/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function () {
    return t.lists('all')
            .then(function (lists) {
                var listsSummary = [];
                for (var listsIndex = 0; listsIndex < lists.length; listsIndex++) {
                    var currentList = lists[listsIndex];
                    var listName    = currentList.name;
                    var listObject  = {
                        name     : listName,
                        estimated: 0,
                        consumed : 0
                    };
                    for (var cardsIndex = 0; cardsIndex < currentList.cards.length; cardsIndex++) {
                        var currentCard = currentList.cards[cardsIndex];
                        t.get(currentCard.id, 'shared', 'agilePoints')
                         .then(function (listObject, agilePoints) {
                             if (typeof agilePoints === typeof undefined) {
                                 return true;
                             }
                             if (!isNaN(agilePoints.consumed)) {
                                 listObject.consumed += agilePoints.consumed * 1;
                             }
                             if (!isNaN(agilePoints.estimated)) {
                                 listObject.estimated += agilePoints.estimated * 1;
                             }
                             return true;
                         }.bind(null, listObject));
                    }
                    listsSummary.push(listObject);
                }
                console.log(listsSummary);
                return listsSummary;
            })
            .then(function (listsSummary) {
                console.log(listsSummary);
                for (var summaryIndex = 0; summaryIndex < listsSummary.length; summaryIndex++) {
                    var currentSummary = listsSummary[summaryIndex];
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