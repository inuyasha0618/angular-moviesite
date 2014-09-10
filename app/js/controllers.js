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
	$scope.remove = function(item){
		delData.delete(item._id).success(function(data){
			for(var i = 0;i < $scope.movies.length; i++){
				if($scope.movies[i] == item){
					$scope.movies.splice(i,1);
					break;
				}
			}
		})
	}
	getData.fetch().success(function(dts){
		$scope.movies = dts;
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