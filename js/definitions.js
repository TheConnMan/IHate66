var physics = {
	steady: {
		acceleration: function(me, others, progress) { return me.v; }
	},
	oneCar: {
		acceleration: function(me, others, progress) {
			if (others.length == 0 || (others[0].x - me.x - me.w) > me.d) {
				return Math.min(me.v + progress / 20, me.maxV);
			} else {
				var dist = others[0].x - me.x - me.w;
				return Math.max(me.v - progress, me.maxV * dist / me.d);
			}
		}
	},
	twoCar: {
		acceleration: function(me, others, progress) {
			if (others.length == 0 || (others[0].x - me.x - me.w) > me.d) {
				return Math.min(me.v + progress / 20, me.maxV);
			} else if (others.length == 1 || others[0].x - me.x - me.w < me.d / 2) {
				var dist = others[0].x - me.x;
				return Math.max(me.v - progress, me.maxV * dist / (me.d / 2));
			} else {
				var dist = others[1].x - me.x;
				return Math.max(me.v - progress, me.maxV * dist / me.d);
			}
		}
	}
};

var carDefs = {
	/*regular: {
		physics: physics.steady,
		v: .03,
		maxV: .04,
		w: 20
	},*/
	oneCar: {
		physics: physics.oneCar,
		v: .02,
		maxV: .04,
		w: 10
	},
	twoCar: {
		physics: physics.twoCar,
		v: .02,
		maxV: .04,
		w: 10
	}
};