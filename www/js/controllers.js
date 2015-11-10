angular.module('starter.controllers', [])

  // TODO: A clear button which appears after successful randomize is complete

  .controller('PersonCtrl', function($scope, Persons, $state) {
    $scope.personList = [];
    $scope.winners = [];

    // Settings
    $scope.settings = {};
    $scope.settings.task = "Buy chips";
    $scope.settings.newName = "";
    $scope.settings.nrOfPeople = null;
    $scope.settings.isMultiplePeople = false;

    $scope.personList = Persons.get();

    $scope.addPerson = function(name) {
      if (name === "" || name === null || name === undefined || name.length >= 10) {
        return;
      }

      Persons.add(name);
      $scope.settings.newName = "";
      $scope.winners = [];

      // Person was successfully added to the list
      // TODO: Clear input
    };

    $scope.randomizePerson = function() {
      $scope.settings.newName = "";
      $scope.winners = [];

      // Task is set AND personList has more than one name
      if ($scope.settings.task && $scope.personList.length > 1) {
        var nrOfNames = $scope.personList.length;
        var isMultipleMode = $scope.settings.isMultiplePeople;
        var nrOfPeopleToBeChosen = $scope.settings.nrOfPeople;

        // Nr of people to be chosen is at least 1 less than length of person list - all OK
        if (isMultipleMode === true && (nrOfPeopleToBeChosen < (nrOfNames + 1))) {
          for (var i = 0; i < nrOfPeopleToBeChosen; i++) {
            $scope.winners.push(spliceRandomName($scope.personList));
          }
          resetInput();

          // Nr of people to be chosen is higher or equal to persons - not OK
        } else if (isMultipleMode && (nrOfPeopleToBeChosen >= nrOfNames)) {
          console.debug("Number of ppl to be wanting to be chosen is larger than nr of " +
            "people in total");
          // TODO: Display error for user

        } else if (!isMultipleMode) {
          // Single person to be chosen - all OK
          $scope.winners.push(spliceRandomName($scope.personList));
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

      activateSpinner();
    };

    resetInput = function() {
      //$scope.settings = {};
      Persons.clear();
      $scope.personList = Persons.get();
    };

    // -----

    activateSpinner = function() {
      $("#loading-screen").fadeIn();
      $("#view-person").fadeOut();

      var a = $scope.settings.task;
      debugger;

      setTimeout(function() {
        var a = $scope.settings.task;
        debugger;
        $state.go("tab.result", { winner: $scope.winners, task: $scope.settings.task } );
        setTimeout(function() {
          $("#loading-screen").fadeOut();
        }, 10);
      }, 2000);

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
    };

    spliceRandomName = function(personList) {
      var index = Math.floor(Math.random() * (personList.length + 1 - 1));
      var name = personList.splice(index, 1);
      return name[0];
    };
  })

  .controller('MovieCtrl', function($scope) {
  })
  .controller('ResultCtrl', function($scope, $state, $stateParams) {
    $scope.winner = $stateParams["winner"] || "No winner";
    $scope.task = $stateParams["task"] || "No task";
  })
  .controller('CustomCtrl', function($scope) {
  });
