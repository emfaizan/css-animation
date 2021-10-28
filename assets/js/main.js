$(document).ready(function() {
  
	var that = $('#animatedCircle');
	var wrapper = $('.horizontal-slider');
		
	that.css({
		width: 400,
		height: 400
	});

	var hoverPolice = false,
		canvasWidth = 400,
		canvasHeight = canvasWidth,
		id = $('canvas').length,
		canvasElement = $('<canvas id="'+ id +'" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>'),
		canvas = canvasElement.get(0).getContext("2d"),
		centerX = canvasWidth/2,
		centerY = canvasHeight/2,
		radius = 400/2 - 15/2;
		fps = 1000 / 60,
		reverse = false,
		update = 0.01; //.01;

		that.angle = 0;
		

	that.drawArc = function(startAngle, percentFilled, color){
		console.log("f", percentFilled);
		var drawingArc = true;
		canvas.beginPath();
		canvas.arc(centerX, centerY, radius, (Math.PI/180)*(startAngle * 360 - 90), (Math.PI/180)*(percentFilled * 360 - 90), reverse);
		canvas.strokeStyle = color;
		canvas.lineWidth = 15;
		canvas.stroke();
		drawingArc = false;
	}

	that.fillChart = function(stop, backward){
		var loop = setInterval(function(){
			hoverPolice = true;
			canvas.clearRect(0, 0, canvasWidth, canvasHeight);

			that.drawArc(0, 360, "#2776a1");
			if(!backward){
				that.angle += update;
				that.drawArc(0, that.angle, "#95D229");

				if(that.angle > stop){
					clearInterval(loop);
					hoverPolice = false;
				}
			} else {
				that.angle -= update;
				that.drawArc(0, that.angle, "#95D229");

				if(that.angle < stop){
					clearInterval(loop);
					hoverPolice = false;
				}
			}

			
		}, fps);
	}

	that.fillChart(0.25, 0);
	that.append(canvasElement);
	

	function slideTo(num){
		var val = 0;
		wrapper.attr('slide', num);
		switch (num) {
			case 1:
				val = 0.25;
				break;
			
			case 2:
				val = 0.5;
				break;

			case 3:
				val = 0.75;
				break;
			
			case 4:
				val = 1;
				break;

			default:
				break;
		}

		if(that.angle >= 1 || that.angle > val){
			//that.angle = val;
			that.fillChart(val, 1);
		}
		else {
			that.fillChart(val, 0);
		}
		
	}

	$(document).on('click', '.item-one', function(){
		if(wrapper.attr("slide") != "1"){
			slideTo(1);
		}
	});

	$(document).on('click', '.item-two', function(){
		if(wrapper.attr("slide") != "2"){
			slideTo(2);
		}
	});

	$(document).on('click', '.item-three', function(){
		if(wrapper.attr("slide") != "3"){
			slideTo(3);
		}
	});

	$(document).on('click', '.item-four', function(){
		if(wrapper.attr("slide") != "4"){
			slideTo(4);
		}
	});


	var MOUSE_OVER = false;
	$('body').bind('mousewheel', function(e){
		if(MOUSE_OVER){
			if(e.preventDefault) { e.preventDefault(); } 
			e.returnValue = false; 
			return false; 
		}
	});
	
	$('.horizontal-slider').mouseenter(function(){ MOUSE_OVER=true; });
	$('.horizontal-slider').mouseleave(function(){ MOUSE_OVER=false; });
	
	$('.horizontal-slider').bind('mousewheel', function(e){
		var delta = e.originalEvent.deltaY ;
		var slide = Number(wrapper.attr('slide')) 
		if(delta < 0){
			//go up
			if(slide > 1){
				slideTo(slide-1);
			}
		}
		else{
			//go down
			if(slide <= 3){
				slideTo(slide+1);
			}
		}
	});

});


