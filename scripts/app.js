// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var pinItApp = angular.module('pinitapp', ['ngAnimate', 'ui.router', 'ui.bootstrap','ngMessages']);

// configuring our routes 
// =============================================================================
pinItApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // route to show our basic form (/form)
        .state('board', {
        url: '/board',
        templateUrl: 'partials/folder.html',
        controller: 'bookMarkFolderController'
    })

    // nested states 
    // each of these sections will have their own view
    // url will be nested (/appName/step1)
    .state('lists', {
        url: '/board/list/:listID',
        templateUrl: 'partials/bookMark.html',
        controller: 'bookMarkController'
    })

    // catch all route
    // send users to the appName page 
    $urlRouterProvider.otherwise('/board');
});
// our controller for the appName
// =============================================================================
