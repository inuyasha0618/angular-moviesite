angular.module('myApp.controllers',['myApp.services'])
.controller('homeCtrl',function($scope,getData){
	$scope.pageMessage = 'iMovie 主页';
	$scope.movies = [];
	getData.fetch().success(function(dts){
		$scope.movies = dts;
	});
})
.controller('adminCtrl',function($scope,postData,$location){
	$scope.pageMessage = '后台录入页'
	$scope.movie = {};
	$scope.save = function(){
		postData.post($scope.movie).success(function(data){
			$location.path('/movie/' + data._id);
		})
	}
})
.controller('detailCtrl',function($scope,$routeParams,$sce,getData){
	$scope.pageMessage = '详情页';
	$scope.movie = {};
	var id = $routeParams.id;
	getData.getById(id).success(function(data){
		console.log(data);
		data.flash = $sce.trustAsResourceUrl(data.flash);
		$scope.movie = data;
	})

})
.controller('listCtrl',function($scope,getData,delData){
	$scope.pageMessage = '列表页';
	$scope.movies = [];
	$scope.remove = function(id){
		delData.delete(id).success(function(dts){
			$scope.movies = dts;
		})
	}
	getData.fetch().success(function(dts){
		$scope.movies = dts;
		console.log(dts[0].meta.createAt);
		console.log(typeof dts[0].meta.createAt);
	})
})
.controller('updateCtrl',function($scope,$routeParams,$location,getData,postData){
	$scope.movie = {};
	$scope.pageMessage = '编辑页';
	$scope.save = function(){
		postData.post($scope.movie).success(function(data){
			$location.path('/movie/' + data._id);
		})
	}
	var id = $routeParams.id;
	getData.getById(id).success(function(data){
		$scope.movie = data;
	});
});