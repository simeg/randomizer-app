angular.module('starter.controllers', [])

  .controller('PersonCtrl', function($scope, Options, $state) {
  })

  .controller('MovieCtrl', function($scope) {
  })
  .controller('ResultCtrl', function($scope, Options) {

    function initScope() {
      $scope.task = Options.getTask();
      $scope.isMissingInfo = false;

      if (!$scope.task) {
        $scope.isMissingInfo = true;
      } else {
        $scope.chosenNames = Options.getChosenOptions();
        $scope.isMulti = ($scope.chosenNames.length > 1);

        // Reset service information
        setTimeout(function() {
          Options.reset();
        }, 100);
      }
    }

    initScope();

  })
  .controller('CustomCtrl', function($scope) {
  });
