var Utils = (function(){

	var self = this;
	
	self.getMousePos = function(canvas, event){
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	self.isEmpty = function(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}

		return true;
	}
	
	return self;
})();