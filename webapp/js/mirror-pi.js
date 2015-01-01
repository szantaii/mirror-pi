$(document).ready(function()
{
	calendar.show("#calendar");
	weather.show("#weather");
	feed.show("#feed");
});

$(window).resize(function() {
	feed.format("#feed");
});
