function initialize() {
	d3.selectAll('svg').remove();
	var height = $(window).height() - $('#content').outerHeight();
	var width = $(window).width();
	var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
	
	var lanes = 10, carNum = lanes * 10, pad = 20, h = (height / lanes) - 2 * pad, reset = false,
		colors = d3.scale.category10();
	
	var cars = d3.range(carNum).map(function(d) {
		var type = carDefs[Object.keys(carDefs)[Math.floor(Math.random() * Object.keys(carDefs).length)]];
		var car = $.extend(true, {}, type);
		car.id = d;
		car.d = Math.random() * 500;
		car.x = Math.random() * width;
		car.l = Math.floor(Math.random() * lanes);
		car.y = car.l * (h + 2 * pad)
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
		
		refresh(progress / 1000);
		
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
			var others = cars.filter(function(c) { return c.l == d.l && c.x > d.x && c.id != d.id; }).sort(function(a, b) { return a.x - b.x; });
			d.x = (d.x + d.v * progress * 1000 + width) % width;
			d.v = d.physics.acceleration(d, others, progress);
			
		});
		shapes.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
	}
	
	requestAnimationFrame(step);
}

