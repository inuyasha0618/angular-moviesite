angular.module('myApp.services',[])
.factory('getData',function($http){
	return {
		fetch: function(){
			return $http.get('/data');
		},
		getById: function(id){
			return $http.get('/data' + id);
		}
	}
})