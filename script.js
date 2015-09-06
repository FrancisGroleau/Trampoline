var _canvas, _context;
var _trampolineList = [];
var _eggList = [];
var _positionOnMouseDown;
var _positionOnMouseMove;
var _isMouseDown = false;
var _isIntersecting;


window.onload = function() {
	_canvas = document.getElementById("canvas");
	_context = _canvas.getContext("2d");
	init();
	gameLoop();
	
	_canvas.addEventListener('mousedown', function(e){
		var mousePos = Utils.getMousePos(_canvas, e);
		_positionOnMouseDown = {
			x : mousePos.x,
			y : mousePos.y
		};
	
		/* debug stuff
		if(!_isMouseDown){
			 for(var i = 0; i < _trampolineList.length; i++){
				var t =  _trampolineList[i];
				//console.log("mousePosY : " + mousePos.y);
				//console.log("equality : " + Math.floor(((t.Slope * mousePos.x) + t.B)));
				//console.log("equality : " + Math.ceil(((t.Slope * mousePos.x) + t.B)));
				//check for equality y = mx + b
				var yUp = Math.floor(((t.Slope * mousePos.x) + t.B));
				var yUp1 = yUp - 1;
				var yDown = Math.ceil(((t.Slope * mousePos.x) + t.B));
				var yDown1 = yDown - 1;
								
				var intersect = (mousePos.y == (yUp) || mousePos.y == (yDown) || mousePos.y == (yUp1) || mousePos.y == (yDown1) );
				if(intersect){
					t.deform(mousePos.x, mousePos.y, 150, 150);
					console.log('it fits');
					return;
				}
			 }
		 }
		 */
		
		
		_isMouseDown = true;
	});

	_canvas.addEventListener('mousemove', function(e){
		if(_isMouseDown){
			var mousePos = Utils.getMousePos(_canvas, e);
			_positionOnMouseMove = {
				x : mousePos.x,
				y : mousePos.y
			};
			draw();
		}
	});

	_canvas.addEventListener('mouseup', function(e){
		var mousePos = Utils.getMousePos(_canvas, e);
		var positionOnMouseUp = {
			x : mousePos.x,
			y : mousePos.y
		};
		_isMouseDown = false;
		//we just clicked at the same place so we want to spawn an egg not create a trampoline
		if(_positionOnMouseDown.x != positionOnMouseUp.x && _positionOnMouseDown.y != positionOnMouseUp.y){
		
			var t = Trampoline(_positionOnMouseDown.x, _positionOnMouseDown.y, positionOnMouseUp.x, positionOnMouseUp.y);
			_trampolineList.push(t);
			
			_positionOnMouseDown = {};
			_positionOnMouseMove = {};
			draw();
		}
		
	});
	
	_canvas.addEventListener('dblclick', function(e){
		var mousePos = Utils.getMousePos(_canvas, e);
		var e = Egg(mousePos.x, mousePos.y, 0, 1.5);
		_eggList.push(e);
	});
	
}




function init(){
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	_canvas.setAttribute('height',h);
	_canvas.setAttribute('width',w);
}

function draw(){

	_context.clearRect(0,0,_canvas.width,_canvas.height);
	//temporary line
	if(_isMouseDown && !Utils.isEmpty(_positionOnMouseDown) && !Utils.isEmpty(_positionOnMouseMove) ){
		_context.lineWidth = 5;
		_context.strokeStyle = "rgb(64,128,255)";
		_context.beginPath();
		_context.moveTo(_positionOnMouseDown.x, _positionOnMouseDown.y);
		_context.lineTo(_positionOnMouseMove.x, _positionOnMouseMove.y);
		_context.stroke();
	}



	for(var i = 0; i < _trampolineList.length; i++){
		 _trampolineList[i].draw();
	}
	
	for(var i = 0; i < _eggList.length; i++){
		 _eggList[i].draw();
	}

}

function gameLoop(){
	for(var i =0; i < _eggList.length; i++){
		_eggList[i].update();
	}

	draw();
	requestAnimationFrame(gameLoop);
}