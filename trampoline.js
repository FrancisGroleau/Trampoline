function Trampoline(pBeginX, pBeginY, pEndX, pEndY){

	var self = {
		BeginX : pBeginX,
		BeginY : pBeginY,
		EndX : pEndX,
		EndY : pEndY,
		ControlX : 0,
		ControlY : 0,
		IsDeform : false,
		Slope : ((pBeginY - pEndY) / (pBeginX - pEndX)), //(y1 - y2) / (x1-x2)
		//y = mx + b // y - mx = b
		B : pBeginY - (pBeginX * ((pBeginY - pEndY) / (pBeginX - pEndX))),
		tempX : 0,
		tempY : 0,
		DeformationComplete : false,
		
		draw : function(){
			_context.lineWidth = 5;
			_context.strokeStyle = "rgb(64,128,255)";
			
			if(self.IsDeform){
				//_context.fillStyle = "red";
				//_context.fillRect(self.BeginX, self.BeginY,4 ,4);
				//_context.fillRect(self.ControlX, self.ControlY, 4, 4);
				//_context.fillRect(self.EndX, self.EndY, 4, 4);
				if(!self.DeformationComplete){
					if(self.tempX != self.ControlX)
						self.tempX++;
					if(self.tempY != self.ControlY)
						self.tempY++;
				}
						
				if((self.tempX != self.ControlX || self.tempY != self.ControlY) && !self.DeformationComplete){
					_context.beginPath();
					_context.moveTo(self.BeginX, self.BeginY);
					_context.quadraticCurveTo(self.tempX, self.tempY, self.EndX, self.EndY);
					_context.stroke();
				}else{
					_context.beginPath();
					_context.moveTo(self.BeginX, self.BeginY);
					_context.quadraticCurveTo(self.ControlX, self.ControlY, self.EndX, self.EndY);
					_context.stroke();
					
					if(!self.DeformationComplete){
						self.tempX = 0;
						self.tempY = 0;
						self.DeformationComplete = true;
					}
				}
			}else{
				_context.beginPath();
				_context.moveTo(self.BeginX, self.BeginY);
				_context.lineTo(self.EndX, self.EndY);
				_context.stroke();
				
			}
		},
		
		deform : function(pCx, pCy, pVx, pVy){
			self.tempX = pCx;
			self.tempY = pCy;
		
			if(self.Slope <= 0){
				self.ControlX =	(pCx + Math.floor(pVx * 20.5));
				self.ControlY = (pCy + Math.floor(pVy * 20.5));
			}else{
				self.ControlX = (pCx - Math.floor(pVx * 20.5));
				self.ControlY = (pCy + Math.floor(pVy * 20.5));
			}
			self.IsDeform = true;
		}
		
	}
	
	return self;
}