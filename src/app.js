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
function GameStartCtrl($scope, Game) {
    $scope.game = Game;
}

/**
 * /game
 */
function HomeCtrl($scope, $location, Game) {
    if (!Game.loaded) {
        $location.path('/game-start');
    }
    $scope.game = Game;
}

/**
 * /fight
 */
function FightCtrl($location, Game) {
    if (Game.mode != 'fight') {
        $location.path('/home');
    }
}

/**
 * /rewards
 */
function RewardsCtrl($location, Game) {
    if (Game.mode != 'rewards') {
        $location.path('/home');
    }
}

/**
 * /game-over
 */
function GameOverCtrl($location, Game) {
    if (Game.mode != 'game-over') {
        $location.path('/home');
    }
}