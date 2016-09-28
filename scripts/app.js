// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var pinItApp = angular.module('pinitapp', ['ngAnimate', 'ui.router', 'ui.bootstrap','ngMessages']);

// configuring our routes 
// =============================================================================
pinItApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // route to show our basic form (/form)
        .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'bookMarkFolderController'
    })

    // nested states 
    // each of these sections will have their own view
    // url will be nested (/appName/step1)
    .state('board', {
        url: '/board/:boardID',
        templateUrl: 'partials/board.html',
        controller: 'bookMarkController'
    })

    // catch all route
    // send users to the appName page 
    $urlRouterProvider.otherwise('/home');
});
// our controller for the appName
// =============================================================================
