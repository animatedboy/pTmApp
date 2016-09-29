// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var pTmApp = angular.module('pTmApp', ['ngAnimate', 'ui.router', 'ui.bootstrap','ngMessages','dndLists']);

// configuring our routes 
// =============================================================================
pTmApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // route to show our basic form (/form)
        .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'pTmAppController'
    })
    // catch all route
    // send users to the appName page 
    $urlRouterProvider.otherwise('/home');
});

