angular.module('myApp.controllers',['myApp.services'])
.controller('homeCtrl',function($scope,getData){
	$scope.pageClass = 'page-home';
	$scope.pageMessage = 'iMovie 主页';
	$scope.movies = [];
	getData.fetch().success(function(dts){
		$scope.movies = dts;
	});

	$scope.$on('ngRepeatFinished',function(){
		console.log("收到事件！");
		var container = document.getElementById('container');
		gundongLoad(document.querySelectorAll('[Xsrc]'),'Xsrc');
	});
})
.controller('adminCtrl',function($scope,postData,$location){
	$scope.pageClass = 'page-admin';
	$scope.pageMessage = '后台录入页';
	$scope.movie = {};
	$scope.save = function(){
		postData.post($scope.movie).success(function(data){
			$location.path('/movie/' + data._id);
		})
	}
})
.controller('detailCtrl',function($scope,$routeParams,$sce,getData){
	$scope.pageClass = 'page-detail';
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
	$scope.pageClass = 'page-list';
	$scope.pageMessage = '列表页';
	$scope.movies = [];
	var mask = document.getElementById('mask');
	var delOrNot = document.getElementById('del-or-not');
	var btnDel = delOrNot.getElementsByClassName('delete')[0];
	var btnCancel = delOrNot.getElementsByClassName('cancel')[0];
	var delName = delOrNot.getElementsByClassName('delname')[0];
	delOrNot.style.top = (document.documentElement.clientHeight - 300)/2 + 'px';
	delOrNot.style.left = (document.documentElement.clientWidth - 400)/2 + 'px';
	$scope.remove = function(item){
		mask.style.display = 'block';
		delOrNot.style.display = 'block';
		delName.innerHTML = item.title;
		btnDel.onclick = function(){
			mask.style.display = 'none';
			delOrNot.style.display = 'none';
			delData.delete(item._id).success(function(data){
				for(var i = 0;i < $scope.movies.length; i++){
					if($scope.movies[i] == item){
						$scope.movies.splice(i,1);
						break;
					}
				}
			})
		}

		btnCancel.onclick = function(){
			mask.style.display = 'none';
			delOrNot.className += ' del-leave';
			setTimeout(function(){
				delOrNot.className = delOrNot.className.replace(" del-leave","");
				delOrNot.style.display = 'none';
			},300);
		}
	}
	getData.fetch().success(function(dts){
		$scope.movies = dts;
	})
})
.controller('updateCtrl',function($scope,$routeParams,$location,getData,postData){
	$scope.pageClass = 'page-admin';
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