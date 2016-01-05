angular.module("starter.services", [])

  .factory("Options", function() {
    var _task = null;
    var _options = [];
    var _chosenOptions = [];
    var _isMulti = null;
    var _movieObj = {};
    const MAX_OPTIONS = 10;

    return {
      add: function(newOption) {
        if (_options && _options.length >= 1) {
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
      remove: function(optionToRemove) {
        if (_options && _options.length > 1) {
          for (var i = 0; i < _options.length; ++i) {
            var option = _options[i];
            if (optionToRemove === option) {
              var index = _options.indexOf(option);
              _options.splice(index, 1);
              console.debug("Removing [" + optionToRemove + "] from list");
              break;
            }
          }
        }
      },
      setTask: function(newTask) {
        _task = newTask;
      },
      getTask: function() {
        return _task;
      },
      spliceRandom: function() {
        if (_options && _options.length > 1) {
          var index = Math.floor(Math.random() * (_options.length + 1 - 1));
          var option = _options.splice(index, 1);
          return option;
        }
      },
      spliceRandoms: function(numOptions) {
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
        return _chosenOptions;
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
        _chosenOptions = null;
        _movieObj = {};
      }
    }
  })

  .factory("OMDb", function($http) {

    const NO_MOVIE_FOUND = false;

    var _apiKey = "48184b8fda5a8308b6574030aa583e51";
    var _base = "http://api.themoviedb.org/3";
    var _configService = "/configuration";
    var _callback = "JSON_CALLBACK";
    var _url = _base + "/search/movie?api_key=" +
      _apiKey + "&callback=" + _callback + "&page=1";

    function getImgBaseUrl(){
      return $http.jsonp(_base + _configService + "?api_key=" +
        _apiKey + "&callback=" + _callback);
    }

    function getMovieId(movieTitle) {
      return $http.jsonp(_url + "&query=" + encodeURI(movieTitle));
    }

    function getMovieDetails(movieId) {
      return $http.jsonp(_base + "/movie/" + movieId +
        "?api_key=" + _apiKey + "&callback=" + _callback);
    }

    function getMovie(movieTitle) {
      return getMovieId(movieTitle)
        .then(function(response) {
          var movie = response.data.results[0];
          var movieId = movie.id;
          return getMovieDetails(movieId)
            .catch(function(error) {
              console.error("Error getting movie information for " +
                "movie with title [" + movieTitle + "] => " + error);
            });
        }).catch(function(error) {
          console.error("Error querying movie with title [" + movieTitle + "] => " + error);
          return NO_MOVIE_FOUND;
        });
    }

    return {
      searchMovie: function(movieTitle) {
        return getMovie(movieTitle);
      },
      getImgBaseUrl: function() {
        return getImgBaseUrl();
      }
    }
  });
