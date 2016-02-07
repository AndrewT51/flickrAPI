myApp.config(["$urlRouterProvider", "$stateProvider",($urlRouterProvider, $stateProvider) => {
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
  }])