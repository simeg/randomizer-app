angular.module('starter.services', [])

  .factory('Options', function() {
    var _task = null;
    var _options = [];
    var _chosenOptions = [];
    var _isMulti = null;
    var _maxOptionsLength = 10;

    function spliceRandom() {

    }

    return {
      add: function(newOption) {
        if (_options.length >= 1) {
          // Check for duplicate
          for (var i = 0; i < _options.length; i++) {
            var option = _options[i];
            if (newOption === option) {
              console.debug("[" + option + "] already exists in list, not adding to list");
              // TODO: Display error
              return;
            }
          }
        }

        // Option is unique, add to list
        console.debug("Adding [" + newOption + "] to list");
        _options.push(newOption);
      },
      get: function() {
        return _options;
      },
      set: function(newOptions) {
        if (newOptions instanceof Array) {
          _options = newOptions;
        } else {
          _options = [];
          _options.push(newOptions);
        }
      },
      removeAtIndex: function(index) {
        return _options.splice(parseInt(index), 1)[0];
      },
      clear: function() {
        _options = [];
      },
      setTask: function(newTask) {
        _task = newTask;
      },
      getTask: function() {
        return _task;
      },
      getLength: function() {
        return _options.length;
      },
      spliceRandom: function() {
        var index = Math.floor(Math.random() * (_options.length + 1 - 1));
        var option = _options.splice(index, 1);
        return option;
      },
      spliceRandoms: function(numOptions) {
        if (numOptions > this.getLength()) {
          console.log("Trying to get more options than available");
          return;
        }

        var index, option, options = [];
        for (var i = 0; i < numOptions; ++i) {
          index = Math.floor(Math.random() * (_options.length + 1 - 1));
          option = _options.splice(index, 1);
          options.push(option);
        }
        return options;
      },
      getChosenOptions: function() {
        return _chosenOptions;
      },
      setChosenOptions: function(options) {
        _chosenOptions = options;
      }
    }
  });
