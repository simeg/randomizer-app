angular.module('starter.controllers', [])

  .controller('PersonCtrl', function($scope, Options, $state) {


  })

  .controller('MovieCtrl', function($scope) {
  })
  .controller('ResultCtrl', function($scope, Options, $state) {
    var task = Options.getTask();

    if (!task) {
      $state.go("tab.person");
    }
    $scope.winners = Options.getChosenOptions();
    $scope.task = task || "No task set";
  })
  .controller('CustomCtrl', function($scope) {
  });
