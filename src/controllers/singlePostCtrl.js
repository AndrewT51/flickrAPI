myApp.controller("singlePost", ["$scope", "userService", "store", "$state", ($scope,userService,store,$state) => {
  // If this page is returned to from an external webpage link, this code will use the
  // url params to find the data in order to repopulate the page 
  if(!store.getfeed){
    userService.getData()
    .then(function success(data){
      let temp = data.data.items;
      temp.forEach(item => {
        if(item.published === $state.params.published && item.author_id === $state.params.id){
          store.setFeed(item)
        }
      }, function(err){
        console.log("Error: ",err)
      })
    // The data is sent to the modifyData service to change it in ways appropriate
    // for use throughout the app
    $scope.item = userService.modifyData(data)
    $scope.item = store.getfeed;
    })
  }

  $scope.item = store.getfeed;

  // If a tag is clicked on this will take the user to the search page with
  // the search for that tag already initiated
  $scope.changePageAndSearch = tag =>{
    store.setTag(tag);
    $state.go('list')
  }
}]);