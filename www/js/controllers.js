angular.module('starter.controllers', [])

  // TODO: A clear button which appears after successful randomize is complete

  .controller('PersonCtrl', function($scope, Persons) {
    $scope.personList = [];
    $scope.winners = [];

    // Settings
    $scope.settings = {};
    $scope.settings.task = "Buy chips";
    $scope.settings.newName = "";
    $scope.settings.nrOfPeople = null;
    $scope.settings.isMultiplePeople = false;

    $scope.personList = Persons.get();
    //$scope.personList = ["Simon", "Beatrice", "Joel"];

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
    };

    resetInput = function() {
      $scope.settings = {};
      Persons.clear();
      $scope.personList = Persons.get();
    };

    // -----

    activateSpinner = function() {
      var container = $.getElementsByClassName("spinner-container");
      var spinner = new Spinner(opts).spin(target);

    }

    spliceRandomName = function(personList) {
      var index = Math.floor(Math.random() * (personList.length + 1 - 1));
      var name = personList.splice(index, 1);
      return name[0];
    };
  })

  .controller('MovieCtrl', function($scope) {

  })

  .controller('CustomCtrl', function($scope) {
  });
