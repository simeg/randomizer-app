angular.module('starter.controllers', [])

  .controller('PersonCtrl', function($scope, Options, $state) {

    $scope.onSwipeLeft = function() {
      $state.go("tab.movie");
    }
  })

  .controller('MovieCtrl', function($scope) {
  })
  .controller('ResultCtrl', function($scope, Options, $state, $rootScope) {

    const INVALID_STATE = false;

    $scope.isMovie = false;

    function init() {
      var prevState = $rootScope.stateFrom || INVALID_STATE;
      if (prevState === "tab.person") {
        initTaskScope();
      } else if (prevState === "tab.movie") {
        initMovieScope();
      } else if (prevState === INVALID_STATE) {
        $scope.isMissingInfo = true;
      }
    }

    function initTaskScope() {
      $scope.task = Options.getTask();
      $scope.isMissingInfo = false;

      if (!$scope.task) {
        $scope.isMissingInfo = true;
        console.debug("No task set")
      } else {
        $scope.chosenNames = Options.getChosenOptions();
        $scope.isMulti = ($scope.chosenNames.length > 1);

        // Reset service information
        setTimeout(function() {
          Options.reset();
        }, 100);
      }
    }

    function initMovieScope() {
      $scope.isMovie = true;
      var movie = Options.getMovie();
      $scope.movie = {};
      $scope.movie.title = movie["title"] || "Missing title";
      $scope.movie.synopsis = movie["overview"] || "Missing synopsis";
      $scope.movie.rating = movie["popularity"] || "Missing rating";
      $scope.movie.posterUrl = movie["posterUrl"];
    }

    init();

  })
  .controller('CustomCtrl', function($scope) {
  });
