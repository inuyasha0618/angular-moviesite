var myApp = angular.module('myApp',['ngRoute','myApp.controllers','myApp.services','myApp.directives'])
.config(function($routeProvider){
	$routeProvider.when('/',{templateUrl:'tpl/home.html',controller:'homeCtrl'})
				  .when('/admin',{templateUrl:'tpl/admin.html',controller:'adminCtrl'})
				  .when('/movie/:id',{templateUrl:'tpl/detail.html',controller:'detailCtrl'})
				  .when('/list',{templateUrl:'tpl/list.html',controller:'listCtrl'})
				  .otherwise({redirectTo:'/'});
});