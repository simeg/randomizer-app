// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        console.log("State changed from [" + fromState.name + "] to [" + toState.name + "]");
        $rootScope.stateFrom = fromState.name;
      });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.person', {
        url: '/person',
        views: {
          'tab-person': {
            templateUrl: 'templates/tab-person.html',
            controller: 'PersonCtrl'
          }
        }
      })
      .state('tab.movie', {
        url: '/movie',
        views: {
          'tab-movie': {
            templateUrl: 'templates/tab-movie.html',
            controller: 'MovieCtrl'
          }
        }
      })
      .state('tab.custom', {
        url: '/custom',
        views: {
          'tab-custom': {
            templateUrl: 'templates/tab-custom.html',
            controller: 'CustomCtrl'
          }
        }
      })
      .state('tab.result', {
        url: '/result',
        views: {
          'tab-result': {
            templateUrl: 'templates/tab-result.html',
            controller: 'ResultCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/person');

  });
