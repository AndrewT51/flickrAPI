myApp.service('userService', ["$http", "$filter",function ($http,$filter) {
  this.getData = data => $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK");
  
  this.modifyData = function(data){
    // Receive the data and immediately adjust some of it with regexp to get more appropriate values/formats
    // for displaying onscreen or linking to
     var modified = data.data.items,
        suffix = ['th','st','nd','rd'],
        day,
        lastNumInDay,
        tempDateVar; 
    modified.forEach(feed => {
      feed.author = feed.author.match(/\((.+)\)/)[1];
      feed.description = feed.description.replace(/(<.+?>)/g, "");
      feed.usersPage = "https://www.flickr.com/photos/" + feed.author_id;
      feed.tags = feed.tags.split(" ");
      tempDateVar = $filter('date')(feed.published,"d MMM yyyy 'at' hh:mm");
      day = tempDateVar.match(/\d+/)[0];
      // logic to add proper suffix to the date
      lastNumInDay = day.length > 1 ? day[1] : day[0]; 
      day = (day <10 || day > 20) ? day + (suffix[lastNumInDay] || "th"): `${day}th`;
      feed.usableDate = day + tempDateVar.substring(day.length - 2)
    })
    return modified
  }
}])

.factory('store', () =>{
  // This is used to carry data between controllers
  return {
    getFeed : '',
    setFeed: function(feed) {
      this.getfeed = feed
    },
    getTag: '',
    setTag: function(tag){
      this.getTag = tag
    }
  }
})