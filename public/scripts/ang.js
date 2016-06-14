// script.js

    // create the module and name it scotchApp
    var nerdApp = angular.module('nerdApp', ['ngRoute']);

    // create the controller and inject Angular's $scope
    nerdApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
