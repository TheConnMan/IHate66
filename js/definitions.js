var physics = {
	steady: {
		acceleration: function(me, others, progress) { return me.v; }
	},
	oneCar: {
		acceleration: function(me, others, progress) {
			var d = 100;
			if (others.length == 0 || (others[0].x - me.x) > d) {
				return Math.min(me.v + progress / 20, .04);
			} else {
				var dist = others[0].x - me.x;
				return Math.max(me.v - progress, .04 * dist / d);
			}
		}
	}
};

var carDefs = {
	/*regular: {
		physics: physics.steady,
		v: .03,
		w: 20
	},*/
	oneCar: {
		physics: physics.oneCar,
		v: .02,
		w: 10
	}
};