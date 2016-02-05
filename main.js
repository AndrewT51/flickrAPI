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
      url: "post/:id",
      templateUrl: "./templates/singlePost.html"
    })
  })




.controller("mainCtrl", function ($scope,userService){
  $scope.flickrUserPage = "https://www.flickr.com/photos/";
  let myData = userService.getData()
  .then(function success(data){
    $scope.feeds = data.data.items;
    
  }, function error(err){
    console.log("Error: ",err)
  })
})

.service('userService', function ($http) {
  this.getData = function (data) {
    return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK")
  }
})

.directive('authorPanel', function(){
  return {
    templateUrl: "directives/authorPanel.html"
  }
})

