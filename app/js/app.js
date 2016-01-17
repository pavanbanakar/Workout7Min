'use strict';

angular.module('app',['ngRoute','7minWorkout']).
    config(function($routeProvider,$sceDelegateProvider){

        $routeProvider.when('/start',{
            templateUrl:'partial/start.html'
        }).when('/workout',{
            templateUrl:'partial/workout.html',
            controller:'WorkoutController'
        }).when('/finish',{
            templateUrl:'partial/finish.html'
        }).otherwise({
            redirectTo:'/start'
        });

        $sceDelegateProvider.resourceUrlWhitelist([
// Allow same origin resource loads.
            'self',
            'http://*.youtube.com/**']);

    });

angular.module('7minWorkout',[]);

/*
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
*/