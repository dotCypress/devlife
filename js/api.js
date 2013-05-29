angular.module('api', []).
  factory('Feed', function(){

    var Feed = {};

    Feed.get = function(mode, page, cb){
      $.getJSON("http://query.yahooapis.com/v1/public/yql",
        {
          q: "select * from json where url=\"http://developerslife.ru/" + mode + "/" + page + "?json=true&pageSize=5&salt=" + Math.random() + "\"",
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
