function gundongLoad(imagesCollection,srcAttr){
	var images = [];
	var len = imagesCollection.length;
	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

	for(var i = 0;i < len;i++){
		images.push(imagesCollection[i]);
	}

	window.onscroll = function(){
		display();
	}

	function display(){
		while(images.length > 0 && images[0].getBoundingClientRect().top >= 0 && images[0].getBoundingClientRect().top < windowHeight){
			console.log("hehe");
			var img = images.shift();
			(function(currentImg){
				setTimeout(function(){
				currentImg.src = currentImg.getAttribute(srcAttr);
				},300);
			})(img);
		}
	}
	return display();
}