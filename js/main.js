'use strict'

location.hash = "#/";
MBP.hideUrlBar();

angular.module('devlife', ['api', 'infinite-scroll']).
  config(function($routeProvider) {
    $routeProvider.
     otherwise({controller:MainCtrl, templateUrl:'views/feed.html'});
  });

var names = {
  latest: 'Последние',
  top: 'Лучшие',
  hot: 'Горячие',
}

function MainCtrl($scope,  Feed) {
  $scope.gprsMode = true;
  $scope.switchMode = function(mode){
    if(window.scrollY > 100){
      window.scrollTo(0,0);
    }
    $scope.title = names[mode];
    $scope.mode = mode;
    $scope.items = [];
    $scope.page  = -1;
    $scope.fetchMore();
  };
  $scope.convertDate = function(date){
    return new Date(date);
  };
  $scope.getUrl = function(isPreview, item){
    return $scope.gprsMode && isPreview ? item.previewURL : item.gifURL;
  };
  $scope.switchUrl = function(isPreview, item){
    if(!$scope.gprsMode){
      return item.gifURL;
    }
    return current === item.gifURL ? item.previewURL : item.gifURL;
  };
  $scope.fetchMore = function(){
    $scope.page++;
    Feed.get($scope.mode, $scope.page, function(items) {
      $scope.items = $scope.items.concat(items);
      $scope.$apply();
    });
  };
  $scope.switchMode('latest');
  $scope.$watch('gprsMode', function() { $scope.switchMode($scope.mode)}, true);
};
