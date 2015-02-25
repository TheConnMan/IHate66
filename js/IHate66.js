function initialize() {
	var height = $(window).height() - $('#content').outerHeight();
	var width = $(window).width();
	d3.select('body').append('svg').attr('width', width).attr('height', height);
}