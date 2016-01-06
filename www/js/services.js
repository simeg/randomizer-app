angular.module("starter.services", [])

  .factory("Options", function() {
    var _task = null;
    var _options = [];
    var _chosenOptions = [];
    var _movieObj = {};

    const MAX_OPTIONS = 10;

    return {
      add: function(newOption) {
        if (_options && _options.length > 1) {
          // Check for duplicate
          for (var i = 0; i < _options.length; ++i) {
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
      clearOptions: function() {
        _options = [];
      },
      remove: function(optionToRemove) {
        for (var i = 0; i < _options.length; ++i) {
          var option = _options[i];
          if (optionToRemove === option) {
            var index = _options.indexOf(option);
            _options.splice(index, 1);
            console.debug("Removing [" + optionToRemove + "] from list");
            break;
          }
        }
      },
      setTask: function(newTask) {
        _task = newTask;
      },
      getTask: function() {
        return _task;
      },
      getRandom: function() {
        var index = Math.floor(Math.random() * (_options.length + 1 - 1));
        var option = _options[index];
        return option;
      },
      getRandoms: function(numOptions) {
        if (_options && _options.length > 1 &&
          numOptions > _options.length) {
          console.debug("Trying to get more options than available");
          return;
        }

        var index, option, options = [];
        for (var i = 0; i < numOptions; ++i) {
          index = Math.floor(Math.random() * (_options.length + 1 - 1));
          option = _options.splice(index, 1);
          option = option.toString();
          options.push(option);
        }
        return options;
      },
      getChosenOptions: function() {
        if (_chosenOptions && _chosenOptions.length > 1) {
          return _chosenOptions;
        }
        return _chosenOptions.toString();
      },
      setChosenOptions: function(options) {
        _chosenOptions = options;
      },
      setMovie: function(movie) {
        _movieObj = movie;
      },
      getMovie: function() {
        return _movieObj;
      },
      reset: function() {
        _options = [];
        _task = null;
        _movieObj = {};
      }
    }
  })

  .factory("OMDbService", function($http) {

    const BASE_URL = "http://www.omdbapi.com/?t=";

    function getMovie(movieTitle) {
      return $http.get(BASE_URL + movieTitle);
    }

    return {
      searchMovie: function(movieTitle) {
        return getMovie(movieTitle);
      }
    }
  });
