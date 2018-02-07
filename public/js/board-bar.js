/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function () {
    return t.lists('all')
            .then(function (lists) {
                var listsSummary = [];
                for(var i = 0; i < lists.length; i++){
                    var currentList = lists[i];
                    var listName = currentList.name;
                    var estimatedPoints = 0;
                    var consumedPoints = 0;
                    for(var j = 0; j < currentList.cards.length; j++){
                        var currentCard = currentList.cards[j];
                        console.log(t.get(currentCard.id, 'shared', 'agilePoints'));
                    }
                }
                console.log(JSON.stringify(lists, null, 2));
            });
});