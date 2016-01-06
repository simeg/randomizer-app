angular.module('starter.controllers', [])

  .controller('PersonCtrl', function($scope, Options, $state) {

    $scope.onSwipeLeft = function() {
      $state.go("tab.movie");
    }
  })
  .controller('MovieCtrl', function($scope, $state) {

    $scope.onSwipeLeft = function() {
      $state.go("tab.result");
    };

    $scope.onSwipeRight = function() {
      $state.go("tab.person");
    };

  })
  .controller('ResultCtrl', function($scope, Options, $state, $stateParams) {

    const INVALID_STATE = false;

    function init() {
      $scope.isMovie = null;
      var prevState = $stateParams.prevState || INVALID_STATE;
      console.log("Prev state: " + prevState);
      if (prevState === "tab.person") {
        initTaskScope();
      } else if (prevState === "tab.movie") {
        initMovieScope();
      } else if (prevState === INVALID_STATE) {
        $scope.isMissingInfo = true;
      }
    }

    function initTaskScope() {
      $scope.isMissingInfo = false;
      $scope.isMovie = false;

      $scope.settings = {};
      $scope.settings.task = Options.getTask();

      if (!$scope.settings.task) {
        $scope.isMissingInfo = true;
        console.debug("No task set")
      } else {
        $scope.settings.chosenNames = Options.getChosenOptions();
        $scope.settings.isMulti = angular.isArray($scope.settings.chosenNames);
      }
    }

    function initMovieScope() {
      $scope.isMissingInfo = false;
      $scope.isMovie = true;
      var movie = Options.getMovie();

      $scope.movie = {};
      $scope.movie.title = movie["Title"];
      $scope.movie.year = movie["Year"];
      $scope.movie.synopsis = movie["Plot"];
      $scope.movie.rating = movie["imdbRating"];
      $scope.movie.posterUrl = movie["Poster"];
      console.log(movie);
    }

    $scope.onSwipeRight = function() {
      $state.go("tab.movie");
    };

    $scope.$on('$stateChangeSuccess', function() {
      init();
    });

    init();

  })
  .controller('CustomCtrl', function($scope) {
  });
