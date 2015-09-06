function Egg(pX, pY, pVx, pVy){

	var self = {
		X : pX,
		Y : pY,
		Vx : pVx,
		Vy : pVy,
		Radius : 10,
		IsCollidingWith : {},

		
		draw : function(){
			_context.strokeStyle = "black";
			_context.lineWidth = 3;
			_context.beginPath();
			_context.arc(self.X, self.Y, self.Radius, 0, Math.PI*2, true);
			_context.stroke();
		},
		
		update : function(){
		
			if(Utils.isEmpty(self.IsCollidingWith)){
				self.X = self.X + self.Vx;
				//self.Y += self.Vy *= 1.05;
				self.Y = (self.Y + (self.Vy *= 1.015));
				
				
				
				
				//then we check for collision
				for(var i = 0; i < _trampolineList.length; i++){
					var t =  _trampolineList[i];
					//console.log("mousePosY : " + self.Y);
					//console.log("equality : " + Math.floor(((t.Slope * self.X) + t.B)));
					//console.log("equality : " + Math.ceil(((t.Slope * self.X) + t.B)));
					//check for equality y = mx + b
					var yUp, yUp1, yDown, yDown1;
					
					if(t.slope >= 0){
						yUp = Math.floor(((t.Slope * (self.X - self.Radius)) + t.B));
						yDown = Math.ceil(((t.Slope * (self.X - self.Radius)) + t.B));
					}else{
						yUp = Math.floor(((t.Slope * (self.X + self.Radius)) + t.B));
						yDown = Math.ceil(((t.Slope * (self.X + self.Radius)) + t.B));
					}	
					yUp1 = yUp - 1;
					yDown1 = yDown - 1;
									
					var intersect = (Math.floor(self.Y) == (yUp) || Math.floor(self.Y) == (yDown) || Math.floor(self.Y) == (yUp1) || Math.floor(self.Y) == (yDown1) );
					if(intersect){
						t.deform(Math.floor(self.X), Math.floor(self.Y), Math.floor(self.Vx), Math.floor(self.Vy));
						self.IsCollidingWith = t;
						return;
					}
				}
			}else{
				//console.log('tempX : ' + self.IsCollidingWith.tempX + " , tempY : " + self.IsCollidingWith.tempY);
				//console.log('ControlX : ' + self.IsCollidingWith.ControlX + " , ControlY : " + self.IsCollidingWith.ControlY);
				//console.log('X : ' + self.X + " , Y : " + self.Y);
				//console.log('DeformationComplete : ' + self.IsCollidingWith.DeformationComplete);
			
				if(!self.IsCollidingWith.DeformationComplete){
					self.Y = self.IsCollidingWith.tempY - self.Radius;
					if(self.IsCollidingWith.slope >= 0){
						self.X = self.IsCollidingWith.tempX + self.Radius;
					}else{
						self.X = self.IsCollidingWith.tempX - self.Radius;
					}
				}else{
					self.Y = self.IsCollidingWith.ControlY - self.Radius;
					if(self.IsCollidingWith.slope >= 0){
						self.X = self.IsCollidingWith.ControlX + self.Radius;
					}else{
						self.X = self.IsCollidingWith.ControlX - self.Radius;
					}
				}
			}
		}
	
	}
	
	return self;


}