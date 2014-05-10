'use strict';

/**
 * App module
 * @type {object}
 */
var app = angular.module('ff7js', ['ngRoute', 'ngCookies']);

/**
 * Game Service
 */
app.factory('Game', ['$rootScope', '$location', '$cookieStore', '$http', '$timeout', function($rootScope, $location, $cookieStore, $http, $timeout) {
    return new Game($rootScope, $location, $cookieStore, $http, $timeout);
}]);

/**
 * Routes logic
 */
app.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.
            when('/game-start', {
                templateUrl: 'partials/game-start.html',
                controller: GameStartCtrl
            }).
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: HomeCtrl
            }).
            when('/fight', {
                templateUrl: 'partials/fight.html',
                controller: FightCtrl
            }).
            when('/rewards', {
                templateUrl: 'partials/rewards.html',
                controller: RewardsCtrl
            }).
            when('/game-over', {
                templateUrl: 'partials/game-over.html',
                controller: GameOverCtrl
            }).
            when('/save', {
                templateUrl: 'partials/save.html',
                controller: SaveCtrl
            }).
            when('/load', {
                templateUrl: 'partials/load.html',
                controller: LoadCtrl
            }).
            otherwise({
                redirectTo: '/game-start'
            });
    }
]);

/**
 * INDEX
 */
function IndexCtrl($scope) {

    $scope.sndMove = function() {
        new Sound('/sounds/ff7move.wav');
    };

}

/**
 * /start screen
 */
function GameStartCtrl(Game) {
    Game.launched = true;
}

/**
 * /game
 */
function HomeCtrl($scope, $location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
}

/**
 * /fight
 */
function FightCtrl($location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
}

/**
 * /rewards
 */
function RewardsCtrl($location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
}

/**
 * /game-over
 */
function GameOverCtrl($location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
}

/**
 * /load
 */
function LoadCtrl($location, Game) {
    if (!Game.launched) {
        $location.path('/game-start');
    }
}

/**
 * /save
 */
function SaveCtrl($location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
}