angular.module('starter.controllers', [])

  .controller('PersonCtrl', function($scope, Options, $state) {


  })

  .controller('MovieCtrl', function($scope) {
  })
  .controller('ResultCtrl', function($scope, Options, $state) {
    var task = Options.getTask();

    /*
    if (!task) {
      console.log("No task set, re-directing to random task-view");
      $state.go("tab.person");
    }
    */
    $scope.chosenNames = Options.getChosenOptions();
    //$scope.chosenNames = ["Simon", "Bea"];
    //$scope.task = task || "No task set";
    $scope.task = "Buy chips";
  })
  .controller('CustomCtrl', function($scope) {
  });
