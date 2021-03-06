/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var DARK_CARD_ICON = './i/dark-card.svg';
var CARD_ICON      = './i/white-card.svg';

var calculateSprintPoints = function (t, options) {
    return t.boardBar({
        height: 300,
        title : 'Sprint points',
        url   : './board-bar.html'
    });
};

TrelloPowerUp.initialize({
    'card-buttons' : function (t, options) {
        return [{
            icon    : DARK_CARD_ICON,
            text    : 'Set task points',
            callback: function (t) {
                return t.popup({
                    title: "Task points",
                    url  : './points.html'
                });
            }
        }];
    },
    'card-badges'  : function (t, options) {
        return t.get('card', 'shared', 'agilePoints')
                .then(function (agilePoints) {
                    var badges = [];
                    if (typeof agilePoints === typeof undefined) {
                        return badges;
                    }

                    var hasConsumedPoints  = agilePoints.consumed !== '';
                    var hasEstimatedPoints = agilePoints.estimated !== '';

                    if (hasEstimatedPoints && !hasConsumedPoints) {
                        badges.push({
                            icon : CARD_ICON, //Single card icon
                            text : agilePoints.estimated,
                            color: 'purple'
                        });
                    }

                    if (hasEstimatedPoints && hasConsumedPoints) {
                        var consumedColor = 'sky';
                        badges.push({
                            icon : CARD_ICON, //Both cards icon
                            text : agilePoints.consumed + ' / ' + agilePoints.estimated,
                            color: consumedColor
                        });
                    }

                    return badges;
                });
    },
    'card-detail-badges': function (t, options) {
        return t.get('card', 'shared', 'agilePoints')
                .then(function (agilePoints) {
                    var badges = [];
                    if (typeof agilePoints === typeof undefined) {
                        return badges;
                    }

                    var hasConsumedPoints  = agilePoints.consumed !== '';
                    var hasEstimatedPoints = agilePoints.estimated !== '';

                    if (hasEstimatedPoints && !hasConsumedPoints) {
                        badges.push({
                            title: 'Scrum',
                            text : agilePoints.estimated + ' estimated',
                            color: 'purple'
                        });
                    }

                    if (hasEstimatedPoints && hasConsumedPoints) {
                        var consumedColor = 'sky';
                        badges.push({
                            title: 'Scrum',
                            text : agilePoints.consumed + ' of ' + agilePoints.estimated,
                            color: consumedColor
                        });
                    }

                    return badges;
                });
    },
    'board-buttons': function (t, options) {
        return [{
            icon    : CARD_ICON,
            text    : 'Sprint points',
            callback: calculateSprintPoints
        }];
    },
    'show-settings': function (t, options) {
        return t.popup({
            title : 'Agile points settings',
            url   : './settings.html',
            height: 200
        });
    }
});
