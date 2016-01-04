angular.module('starter.directives', [])

  .directive('randomizeTask', ['Options', '$state', function(Options, $state) {
    return {
      restrict: "E",
      scope: { },
      link: function(scope, element, attrs) {
        const LOADING_TIME = 1000;

        scope.settings = {};
        scope.settings.isMulti = false;
        scope.settings.nrOfPeople = 1;

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
          showSpinner();
          setTimeout(function() {
            $state.go(state);
            hideLoadingScreen();
          }, LOADING_TIME);
        }

        function showLoadingScreen() {
          $("#loading-screen").fadeIn();
          $("#view-person").fadeOut();
        }

        function hideLoadingScreen() {
          $("#loading-screen").fadeOut();
          $("#view-result").fadeIn();
        }

        function showSpinner() {
          var opts = {
            lines: 11 // The number of lines to draw
            , length: 27 // The length of each line
            , width: 20 // The line thickness
            , radius: 70 // The radius of the inner circle
            , scale: 0.5 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false  // Whether to render a shadow
            , hwaccel: true // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
          };
          var target = document.getElementById('loading-screen');
          var spinner = new Spinner(opts).spin(target);
        }

        scope.addName = function(name) {
          Options.add(name);
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

            goWithLoading("tab.result")

          } else {
            // TODO: Display error
          }
        };

        tempInit();
      },
      templateUrl: "templates/directives/randomize-task.html"
    }
  }]);

/*
$scope.randomizePerson = function() {
  $scope.settings.newName = "";

  // Task is set AND personList has more than one name
  if ($scope.settings.task && $scope.personList.length > 1) {
    var nrOfNames = $scope.personList.length;
    var isMultipleMode = $scope.settings.isMultiplePeople;
    var nrOfPeopleToBeChosen = $scope.settings.nrOfPeople;

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
    if ($scope.personList.length === 0) {
      console.debug("No names in list");
    } else {
      console.debug("No task set");
    }
  }

  goToResult();
};
*/
