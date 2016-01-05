angular.module('starter.directives', [])

  .directive('randomizeTask', ['Options', '$state', function(Options, $state) {
    return {
      restrict: "E",
      scope: { },
      link: function(scope, element, attrs) {
        const LOADING_TIME = 1000;

        function tempInit() {
          scope.settings.task = "Köpa chips";
          scope.addName("Simon");
          scope.addName("Bea");
          scope.addName("Jonte");
          scope.addName("Gurt");
          getNameList();
        }

        function getNameList() {
          var nameList = Options.get();
          scope.nameList = angular.copy(nameList);
        }

        function goWithLoading(state) {
          showLoadingScreen();
          setTimeout(function() {
            $state.go(state);
            hideLoadingScreen();
            initScope();
          }, LOADING_TIME);
        }

        function showLoadingScreen() {
          $("#loading-screen").fadeIn();
          $("#view-person").fadeOut();
        }

        function hideLoadingScreen() {
          $("#loading-screen").fadeOut();
          $("#view-result").fadeIn();
          // Person view needs to be made visible again
          $("#view-person").fadeIn();
        }

        function initScope() {
          scope.nameList = [];
          scope.settings = {};
          scope.settings.isMulti = false;
          scope.settings.nrOfPeople = 1;
        }

        scope.addName = function(name) {
          if (name && name.length >= 1) {
            Options.add(name);
            getNameList();
            scope.settings.newName = "";
          } else {
            console.debug("Name cannot be empty");
          }
        };

        scope.removeName = function(name) {
          Options.remove(name);
          getNameList();
        };

        scope.getRandomName = function() {
          var task = scope.settings.task;
          var nrOfPeople = scope.settings.nrOfPeople;

          // TODO: Add more logic here, see commented code at bottom
          if (task) {
            Options.setTask(task);

            if (scope.settings.isMulti) {
              var randomNames = Options.spliceRandoms(nrOfPeople);
              Options.setChosenOptions(randomNames);
            } else {
              var randomName = Options.spliceRandom();
              Options.setChosenOptions(randomName);
            }

            goWithLoading("tab.result");

          } else {
            // TODO: Display error
          }
        };

        initScope();
        //tempInit();
      },
      templateUrl: "templates/directives/randomize-task.html"
    }
  }])

  .directive('randomizeMovie', ['Options', 'OMDb', '$state', function(Options, OMDb, $state) {
    return {
      restrict: "E",
      scope: { },
      link: function(scope, element, attrs) {

        const PLACEHOLDER_POSTER = "placeholder_poster_url"; // TODO
        const IMAGE_SIZE = "w185";

        function initScope() {
          scope.movieList = [];
          scope.settings = {};
        }

        function tempInit() {
          scope.addMovie("Titanic");
          scope.addMovie("Rambo");
        }

        function goWithLoading(state) {
          showLoadingScreen();
          setTimeout(function() {
            $state.go(state);
            hideLoadingScreen();
            initScope();
          }, 1000);
        }

        function getMovieList() {
          var movieList = Options.get();
          scope.movieList = angular.copy(movieList);
        }

        scope.addMovie = function(title) {
          if (title && title.length > 1) {
            Options.add(title);
            getMovieList();
            scope.settings.newMovie = "";
          } else {
            console.debug("Movie title input cannot be empty");
          }
        };

        scope.removeName = function(name) {
          Options.remove(name);
          getNameList();
        };

        scope.getRandomMovie = function() {
          if (scope.movieList && scope.movieList.length >= 2) {
            var randomMovieTitle = Options.spliceRandom();

            var moviePromise = OMDb.searchMovie(randomMovieTitle);
            moviePromise.then(function(response) {
              Options.reset();
              var movie = response.data;

              OMDb.getImgBaseUrl().then(function(response) {
                var posterBaseUrl = response["data"]["images"]["base_url"] + IMAGE_SIZE;
                movie.posterUrl = posterBaseUrl + movie["poster_path"];
                Options.setMovie(movie);
                goWithLoading("tab.result");
              });

            });

          } else {
            // TODO: Display error
          }
        };

        function showLoadingScreen() {
          $("#loading-screen").fadeIn();
          $("#view-person").fadeOut();
        }

        function hideLoadingScreen() {
          $("#loading-screen").fadeOut();
          $("#view-result").fadeIn();
          // Person view needs to be made visible again
          $("#view-person").fadeIn();
        }

        initScope();
        tempInit();
      },
      templateUrl: "templates/directives/randomize-movie.html"
    }
  }]);

/*
 scope.randomizePerson = function() {
 scope.settings.newName = "";

 // Task is set AND personList has more than one name
 if (scope.settings.task && scope.personList.length > 1) {
 var nrOfNames = scope.personList.length;
 var isMultipleMode = scope.settings.isMultiplePeople;
 var nrOfPeopleToBeChosen = scope.settings.nrOfPeople;

 // Nr of people to be chosen is at least 1 less than length of person list - all OK
 if (isMultipleMode === true && (nrOfPeopleToBeChosen < (nrOfNames + 1))) {
 for (var i = 0; i < nrOfPeopleToBeChosen; i++) {
 addPerson();
 }
 setTask();
 resetInput();

 // Nr of people to be chosen is higher or equal to persons - not OK
 } else if (isMultipleMode && (nrOfPeopleToBeChosen >= nrOfNames)) {
 console.debug("Number of ppl to be wanting to be chosen is larger than nr of " +
 "people in total");
 // TODO: Display error for user

 } else if (!isMultipleMode) {
 // Single person to be chosen - all OK
 addPerson();
 setTask();
 resetInput();
 }

 } else {
 // Task is not set OR no people are added - not OK
 // TODO: Display error for user
 if (scope.personList.length === 0) {
 console.debug("No names in list");
 } else {
 console.debug("No task set");
 }
 }

 goToResult();
 };
 */
