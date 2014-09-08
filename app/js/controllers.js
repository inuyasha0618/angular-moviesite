angular.module('myApp.controllers',['myApp.services'])
.controller('homeCtrl',function($scope,getData){
	$scope.pageMessage = 'iMovie 主页';
	$scope.movies = [];
	getData.fetch().success(function(dts){
		$scope.movies = dts;
	});
})
.controller('adminCtrl',function($scope){
	$scope.pageMessage = '后台录入页'
})
.controller('detailCtrl',function($scope,$routeParams,$sce,getData){
	$scope.pageMessage = '详情页';
	$scope.movie = {};
	var id = $routeParams.id;
	getData.getById(id).success(function(data){
		data.flash = $sce.trustAsResourceUrl(data.flash);
		$scope.movie = data;
	})

})
.controller('listCtrl',function($scope){
	$scope.pageMessage = '列表页'
})