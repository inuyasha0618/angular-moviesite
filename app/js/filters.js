angular.module('myApp.filters',[])
.filter('dateFilter',function(){
	return function(item){
		var result = moment(item).format('MM/DD/YYYY hh:mm:ss a');
		return result;
	}
})