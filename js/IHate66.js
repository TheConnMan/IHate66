function initialize() {
	d3.selectAll('svg').remove();
	var height = $(window).height() - $('#content').outerHeight();
	var width = $(window).width();
	var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
	
	var lanes = 10, carNum = lanes * 10, pad = 20, h = (height / lanes) - 2 * pad, reset = false,
		colors = d3.scale.category10();
	
	var cars = d3.range(carNum).map(function(d) {
		var car = $.extend(true, {}, carDefs.regular);
		car.x = Math.random() * width;
		car.y = Math.floor(Math.random() * lanes) * (h + 2 * pad);
		car.h = h;
		car.color = colors(d);
		return car;
	});
	
	var shapes = svg.selectAll('.car').data(cars).enter().append('rect').attr('class', 'car')
		.style('fill', function(d) { return d.color; })
		.attr('width', function(d) { return d.w; })
		.attr('height', function(d) { return d.h; })
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
	
	var startTime;
	
	function step(timestamp) {
		if (!startTime) {
			startTime = timestamp;
		}
		var progress = timestamp - startTime;
		
		refresh(progress);
		
		startTime = timestamp;
		if (!reset) {
			requestAnimationFrame(step)
		} else {
			reset = false;
			initialize();
		}
	}
	
	function refresh(progress) {
		cars.forEach(function(d) {
			d.x = (d.x + d.v * progress + width) % width;
			d.v = d.physics.acceleration(d, 0);
		});
		shapes.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
	}
	
	requestAnimationFrame(step);
}

