'use strict';

/**
 * App module
 * @type {object}
 */
var app = angular.module('clickingff7', ['ngRoute', 'ngCookies']);

/**
 * Utils Service
 */
app.service('Utils', Utils);

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