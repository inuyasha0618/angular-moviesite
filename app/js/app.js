var myApp = angular.module('myApp',['ngRoute','ngAnimate','myApp.controllers','myApp.services','myApp.directives','myApp.filters'])
.config(function($routeProvider){
	$routeProvider.when('/',{templateUrl:'tpl/home.html',controller:'homeCtrl'})
				  .when('/admin',{templateUrl:'tpl/admin.html',controller:'adminCtrl'})
				  .when('/movie/:id',{templateUrl:'tpl/detail.html',controller:'detailCtrl'})
				  .when('/list',{templateUrl:'tpl/list.html',controller:'listCtrl'})
				  .when('/update/:id',{templateUrl:'tpl/admin.html',controller:'updateCtrl'})
				  .otherwise({redirectTo:'/'});
});