angular.module('myApp.controllers',['myApp.services'])
.controller('homeCtrl',function($scope,getData){
	$scope.pageMessage = 'iMovie 主页'
	getData.fetch().success(function(dts){
		$scope.movies = dts;
	});
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