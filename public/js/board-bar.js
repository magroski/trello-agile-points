/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function () {
    return t.lists('all')
            .then(function (lists) {
                var listsSummary = [];
                for (var i = 0; i < lists.length; i++) {
                    var currentList = lists[i];
                    var listName    = currentList.name;
                    var listObject  = {
                        name     : listName,
                        estimated: 0,
                        consumed : 0
                    };
                    for (var j = 0; j < currentList.cards.length; j++) {
                        var currentCard = currentList.cards[j];
                        t.get(currentCard.id, 'shared', 'agilePoints')
                         .then(function (listObject, agilePoints) {
                             if (!isNaN(agilePoints.consumed)) {
                                 listObject.consumed += agilePoints.consumed;
                             }
                             if (!isNaN(agilePoints.estimated)) {
                                 listObject.estimated += agilePoints.estimated;
                             }
                             return true;
                         }.bind(null, listObject));
                    }
                    listsSummary.push(listObject);
                }
                console.log(JSON.stringify(lists, null, 2));
                console.log(listsSummary);
            });
});