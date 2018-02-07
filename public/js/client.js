/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

var calculateSprintPoints = function(t){
    t.boardBar({
        height: 200,
        url: './board-bar.html'
    });
}

TrelloPowerUp.initialize({
    'card-buttons': function(t, options) {
        return [{
            icon: BLACK_ROCKET_ICON,
            text: 'Set task points',
            callback: function(t) {
                return t.popup({
                    title: "Task points",
                    url: './points.html',
                });
            }
        }];
    },
    'card-badges': function(t, options){
        return t.get('card', 'shared', 'agilePoints')
        .then(function(agilePoints){
            return [{
                icon: BLACK_ROCKET_ICON,
                text: agilePoints.estimated+'/'+agilePoints.consumed
            }];
        });
    },
    'board-buttons': function(t, options){
        return [{
            icon: BLACK_ROCKET_ICON,
            text: 'Show sprint points',
            callback: calculateSprintPoints(t)
        }];
    }
});
