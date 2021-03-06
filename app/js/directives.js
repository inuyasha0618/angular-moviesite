angular.module('myApp.directives',[])
.directive('videoPlayer',function(){
	return {
		link: function(scope,elem,attrs){
			attrs.$observe('src',function(value){
				if(value)
					elem.html('<embed allowFullScreen="true" quality="high" width="720" height="600" align="middle" autostart="false" src="' + value + '">')
				else
					elem.html('<div></div>')
			});
		}
	}
})
.directive('homePageFinished',function($timeout){
	return{
		restrict: 'A',
		link: function(scope,element,attrs){
			if(scope.$last === true){
				console.log('发出事件');
				scope.$emit('ngRepeatFinished');
			}
		}
		
	}
});