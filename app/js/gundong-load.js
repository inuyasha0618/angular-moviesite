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
		for(var i = 0;i < images.length;){
			if(!(images[i].getBoundingClientRect().bottom < 0 || images[i].getBoundingClientRect().top > windowHeight)){
				(function(currentImg){
					setTimeout(function(){
					currentImg.src = currentImg.getAttribute(srcAttr);
					},300);
				})(images[i]);
				images.splice(i,1);
			}else{
				i++;
			}
		}
	}
	return display();
}