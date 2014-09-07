var myApp = angular.module('myApp',['ngRoute'])
.controller('homeCtrl',function($scope){
	$scope.pageMessage = 'iMovie 主页'
})
.controller('adminCtrl',function($scope){
	$scope.pageMessage = '后台录入页'
})
.controller('detailCtrl',function($scope){
	$scope.pageMessage = '详情页'
})
.controller('listCtrl',function($scope){
	$scope.pageMessage = '列表页'
})
.config(function($routeProvider){
	$routeProvider.when('/',{templateUrl:'tpl/home.html',controller:'homeCtrl'})
				  .when('/admin',{templateUrl:'tpl/admin.html',controller:'adminCtrl'})
				  .when('/detail',{templateUrl:'tpl/detail.html',controller:'detailCtrl'})
				  .when('/list',{templateUrl:'tpl/list.html',controller:'listCtrl'})
				  .otherwise({redirectTo:'/'});
})