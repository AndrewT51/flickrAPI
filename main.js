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
      url: "/post/:id/:published",
      templateUrl: "./templates/postContent.html",
      controller: "singlePost",
    
    })
  })

.controller("mainCtrl", function ($scope,userService,$state,store){

  // needed a way to update the factory.store and to use the queryparams at the same time
  // this is what I came up with
  $scope.itemDetail = function(item){
    store.setFeed(item)
    $state.go('singlePost', {id: item.author_id, published: item.published}, { notify: true });
  }

  // Successfully retrieve the data and then modify it with my service to make it into
  // presentable data across the app
  let myData = userService.getData()
  .then(function success(data){
    $scope.feeds = userService.modifyData(data)
  }, function error(err){
    console.log("Error: ",err)
  })
})

.controller("singlePost", function($scope,userService,store,$state,$rootScope){
  if(!store.getfeed){
    userService.getData()
    .then(function success(data){
      var temp = data.data.items;
      temp.forEach(function(item){
        if(item.published === $state.params.published && item.author_id === $state.params.id){
          store.setFeed(item)
        }else{
          console.log(item)
        }
      })
    $scope.item = userService.modifyData(data)
    $scope.item = store.getfeed;
    })
  }
  $scope.item = store.getfeed;
})


.service('userService', function ($http) {
  this.getData = function (data) {
    return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK")
  }
  this.modifyData = function(data){
    // Receive the data and immediately adjust some of it with regexp to get the relevant text to display
    var modified = data.data.items; 
    modified.forEach(function(feed){
      feed.author = feed.author.match(/\((.+)\)/)[1];
      feed.description = feed.description.replace(/(<.+?>)/g, "");
      feed.usersPage = "https://www.flickr.com/photos/" + feed.author_id;
    })
    return modified
  }
})

.directive('authorPanel', function(){
  return {
    templateUrl: "directives/authorPanel.html"
  }
})

.directive('backButton', function(){
  return {
    templateUrl: "directives/backButton.html",
    scope: true
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
  return function (str, length) {
    if (str.length <= length +3) {
      return str;
    }
    else {
      return String(str).substring(0, length-3) + "...";
    }
  };
});


