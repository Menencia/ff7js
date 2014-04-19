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
                redirectTo: '/home'
            });
    }
]);

/**
 * NAV
 */

function NavCtrl($scope, $location, Game) {

    $scope.isActive = function(route) {
        return route === $location.path();
    }

    /**
     * Go to the game
     */
    $scope.home = function() {
        $location.path("/home");
    };

}

/**
 * /game
 */
function HomeCtrl(Game) {
    Game.load();
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