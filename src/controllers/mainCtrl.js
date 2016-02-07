myApp.controller("mainCtrl",["$scope", "userService", "$state", "store",($scope,userService,$state,store)=>{


  // Intial call sets up the input placeholder,
  // subsequent invocations set placeholder to previously searched term
  let searchControl = searchterm => {
    $scope.tagSearchedFor = searchterm;
    $scope.placeholder = $scope.tagSearchedFor ? $scope.tagSearchedFor : "Search for...";
    $scope.search ="";
  }

  // If this page has been called from a tag on the detail page, take the
  // tag and use it as the immediate search term
  if(store.getTag){
    searchControl(store.getTag)
    store.setTag('');
  }else{
    searchControl('');  
  }


  $scope.conductSearch = searchterm => searchControl(searchterm); 
  
   // Ensure that the search can be activated with a press of the return button
  let searchInput = document.querySelector('.searchInput');
  searchInput.addEventListener("keyup",function(e){
    let keyCode = e.keyCode || e.which;
    if (keyCode == 13){
      angular.element(document.querySelector('.submitSearch').click())
    }
  })

  // needed a way to update the factory.store and to use the queryparams at the same time
  // this is what I came up with
  $scope.itemDetail = item => {
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
}])