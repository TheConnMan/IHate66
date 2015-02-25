var physics = {
	steady: {
		acceleration: function(me, dist) { return me.v; }
	}
};

var carDefs = {
	regular: {
		physics: physics.steady,
		v: .01,
		w: 20
	}
};