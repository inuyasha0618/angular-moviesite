angular.module('myApp.services',[])
.factory('getData',function($http){
	return {
		fetch: function(){
			return $http.get('/data');
		},
		getById: function(id){
			return $http.get('/data/' + id);
		}
	}
})
.factory('postData',function($http){
	return {
		post: function(data){
			return $http({method: 'POST',url: '/data/new',data: data});
		}
	}
})