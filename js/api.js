angular.module('api', ['ngResource']).
  factory('Feed', function($resource){
    var api = $resource('http://developerslife.ru/:category/:page?jsonp=true&pageSize=10', {}, {
      query: {method:'GET', params:{category:'latest', page: 0}, isArray:false}
    });

    var Feed = {};

    Feed.get = function(mode, page, cb){

      $.getJSON("http://query.yahooapis.com/v1/public/yql",
        {
          q: "select * from json where url=\"http://developerslife.ru/" + mode + "/" + page + "?json=true&pageSize=5\"",
          format: "json"
        },
        function (data) {
          if (data.query.results) {
            cb(data.query.results.json.result);
          }
        }
      );
    };

    return Feed;
});
