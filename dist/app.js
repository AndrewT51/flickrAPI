"use strict";var myApp=angular.module("myApp",["ui.router","angularUtils.directives.dirPagination"]);myApp.config(["$urlRouterProvider","$stateProvider",function(t,e){t.otherwise("/"),e.state("list",{url:"/",templateUrl:"./templates/publicFeedList.html",controller:"mainCtrl"}).state("singlePost",{url:"/post/:id/:published",templateUrl:"./templates/postContent.html",controller:"singlePost"})}]),myApp.directive("authorPanel",function(){return{templateUrl:"directives/authorPanel.html"}}).directive("backButton",function(){return{templateUrl:"directives/backButton.html"}}),myApp.filter("truncate",function(){return function(t,e){return t.length<=e+3?t:String(t).substring(0,e-3)+"..."}}),myApp.service("userService",["$http","$filter",function(t,e){this.getData=function(e){return t.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK")},this.modifyData=function(t){var r,n,a,i=t.data.items,o=["th","st","nd","rd"];return i.forEach(function(t){t.author=t.author.match(/\((.+)\)/)[1],t.description=t.description.replace(/(<.+?>)/g,""),t.usersPage="https://www.flickr.com/photos/"+t.author_id,t.tags=t.tags.split(" "),a=e("date")(t.published,"d MMM yyyy 'at' hh:mm"),r=a.match(/\d+/)[0],n=r.length>1?r[1]:r[0],r=10>r||r>20?r+(o[n]||"th"):r+"th",t.usableDate=r+a.substring(r.length-2)}),i}}]).factory("store",function(){return{getFeed:"",setFeed:function(t){this.getfeed=t},getTag:"",setTag:function(t){this.getTag=t}}}),myApp.controller("mainCtrl",["$scope","userService","$state","store",function(t,e,r,n){var a=function(e){t.tagSearchedFor=e,t.placeholder=t.tagSearchedFor?t.tagSearchedFor:"Search for...",t.search=""};n.getTag?(a(n.getTag),n.setTag("")):a(""),t.conductSearch=function(t){return a(t)};var i=document.querySelector(".searchInput");i.addEventListener("keyup",function(t){var e=t.keyCode||t.which;13==e&&angular.element(document.querySelector(".submitSearch").click())}),t.itemDetail=function(t){n.setFeed(t),r.go("singlePost",{id:t.author_id,published:t.published},{notify:!0})};e.getData().then(function(r){t.feeds=e.modifyData(r)},function(t){console.log("Error: ",t)})}]),myApp.controller("singlePost",["$scope","userService","store","$state",function(t,e,r,n){r.getfeed||e.getData().then(function(a){var i=a.data.items;i.forEach(function(t){t.published===n.params.published&&t.author_id===n.params.id&&r.setFeed(t)},function(t){console.log("Error: ",t)}),t.item=e.modifyData(a),t.item=r.getfeed}),t.item=r.getfeed,t.changePageAndSearch=function(t){r.setTag(t),n.go("list")}}]);