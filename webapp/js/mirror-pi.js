/*
	Mirror π
	
	Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
	Released under the MIT License (LICENSE).
*/

$(document).ready(function()
{
	calendar.show("#calendar");
	weather.show("#weather");
	feed.show("#feed");
});

$(window).resize(function() {
	feed.format("#feed");
});
