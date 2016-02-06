'use strict';
let myApp = angular.module("myApp",["ui.router"])

.config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('list', {  
      url: "/",
      templateUrl: "./templates/publicFeedList.html",
      controller: 'mainCtrl'
    })

    .state('singlePost',{
      url: "/post/:id",
      templateUrl: "./templates/postContent.html",
      controller: "singlePost",
      params: {item:null}
    })
  })

.controller("mainCtrl", function ($scope,userService,$state,store){
  $scope.itemDetail = function(item){
    store.setFeed(item)
    $state.go("singlePost",{item: item})
  }
  let myData = userService.getData()
  .then(function success(data){

    // Receive the data and immediately adjust some of it with regexp to get the relevant test to display
    var temp = data.data.items; 
    $scope.feeds = temp.map(function(feed){
      feed.author = feed.author.match(/\((.+)\)/)[1];
      feed.description = feed.description.replace(/(<.+?>)/g, "");
      feed.usersPage = "https://www.flickr.com/photos/" + feed.author_id;
    return feed
    })

  }, function error(err){
    console.log("Error: ",err)
  })
})

.controller("singlePost", function($scope,userService,store){
  $scope.item = store.getfeed;
})

.service('userService', function ($http) {
  this.getData = function (data) {
    return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK")
  }
  this.storeState = function(){

  }
})

.directive('authorPanel', function(){
  return {
    templateUrl: "directives/authorPanel.html"
  }
})

.factory('store', function(){
  return {
    getFeed : '',
    setFeed: function(feed) {

      this.getfeed = feed
    }
  }
})

.filter('truncate', function () {
  return function (text, length, end) {
    if (isNaN(length)){
      length = 10; 
    }
    if (end === undefined){
      end = "...";
    }
    if (text.length <= length || text.length - end.length <= length) {
      return text;
    }
    else {
      return String(text).substring(0, length-end.length) + end;
    }
  };
});

