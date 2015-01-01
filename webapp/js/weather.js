/*
	Mirror π
	
	Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
	Released under the MIT License (LICENSE).
*/

var weather = {
	currentWeatherData: null,
	previousWeatherData: null,
	currentForecastData: new Array(),
	previousForecastData: new Array(),
	city: settings.weather.city,
	countryCode: settings.weather.countryCode,
	unitType: settings.weather.unitType,
	refreshInterval: settings.weather.refreshInterval,
	forecastDays: settings.weather.forecastDays,
	daysOfWeek: settings.common.daysOfWeek,
	
	getWeatherData: function() {
		
		var that = this;
		
		return $.getJSON("http://api.openweathermap.org/data/2.5/weather?units=" +
			this.unitType + "&q=" + this.city + "," + this.countryCode,
			function(data) {
		// return $.getJSON("fake-weather.json", function(data) {
			
			that.currentWeatherData = [Math.round(data.main.temp),
				data.weather[0].icon,
				Math.round(data.wind.speed)];
		});
	},
	
	getForecastData: function() {
		
		var that = this;
		
		return $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?units=" +
			this.unitType + "&cnt=" + (this.forecastDays + 2) + "&q=" +
			this.city + "," + this.countryCode,
			function(data) {
		// return $.getJSON("fake-forecast.json", function(data) {
			
			var tempDates = new Array();
			var tempforecastDays = that.forecastDays;
			tempDates[0] = new Date(data.list[0].dt * 1000);
			tempDates[0] = tempDates[0].getDate();
			tempDates[1] = new Date();
			tempDates[1] = tempDates[1].getDate();
			
			var i = 1;
			var j = 0;
			tempforecastDays++;
			
			if (tempDates[0] < tempDates[1]) {
				i++;
				tempforecastDays++;
			}
			
			for (; i < tempforecastDays; i++, j++) {
				that.currentForecastData[j] = [data.list[i].dt,
					Math.round(data.list[i].temp.min),
					Math.round(data.list[i].temp.max),
					data.list[i].weather[0].icon];
			}
		});
	},
	
	printWind: function(target) {
		var targetContent = "wind speed:&nbsp;" +
			this.currentWeatherData[2] + "&#8239;";
		
		if (this.unitType == "metric") {
			targetContent += "km/h";
		} else {
			targetContent += "mph";
		}
		
		$(target).html(targetContent);
	},
	
	printTemperature: function(target) {
		var targetContent = this.currentWeatherData[0] + "&#8239;&deg;";
		
		if (this.unitType == "metric") {
			targetContent += "C";
		} else {
			targetContent += "F";
		}
		
		$(target).html(targetContent);
	},
	
	printIcon: function(target) {
		var targetHeight = $(target).css("font-size");
		targetHeight = parseInt(targetHeight, 10);
		targetHeight *= 0.75;
		targetHeight = Math.floor(targetHeight);
		
		var iconValue = parseInt(this.currentWeatherData[1], 10);
		var iconFileName;
		
		if (iconValue != 1 && iconValue != 2 && iconValue != 10) {
			iconFileName = ("00" + iconValue).slice(-2);
		} else {
			iconFileName = this.currentWeatherData[1];
		}
		
		var targetContent = "<img src=\"img/" + iconFileName +
			".svg\" alt=\"\" height=\"" + targetHeight + "px\">"
		
		$(target).html(targetContent);
	},
	
	printForecast: function(target) {
		var targetContent = "";
		
		for (var i = 0; i < this.forecastDays; i++) {
			targetContent += "<div class=\"forecastday\">";
			
			var tempDate = new Date(this.currentForecastData[i][0] * 1000);
			
			targetContent += "<div class=\"day\">" +
				this.daysOfWeek[tempDate.getDay()] + "</div>";
			
			for (var j = 0; j < 2; j++) {
				targetContent += "<div class=\"forecastdata\">" +
					this.currentForecastData[i][j + 1] + "&#8239;&deg;";
				
				if (this.unitType == "metric") {
					targetContent += "C";
				} else {
					targetContent += "F";
				}
				
				targetContent += "</div>";
			}
			
			var targetHeight = $(target).css("font-size");
			targetHeight = parseInt(targetHeight, 10);
			targetHeight *= 0.75;
			targetHeight = Math.floor(targetHeight);
			var iconValue = parseInt(this.currentForecastData[i][3], 10);
			var iconFileName;
			
			if (iconValue != 1 && iconValue != 2 && iconValue != 10) {
				iconFileName = ("00" + iconValue).slice(-2);
			} else {
				iconFileName = this.currentForecastData[i][3];
			}
			
			targetContent += "<div class=\"forecastdata\"><img class=\"forecasticon\" src=\"img/" +
				iconFileName + ".svg\"></div>"
			
			targetContent += "</div>"
		}
		
		$(target).html(targetContent);
	},
	
	show: function(target) {
		
		var that = this;
		
		$(target).fadeOut(0, "swing", function() {
			$.when(that.getWeatherData(),
				that.getForecastData()).done(function() {
				
				that.previousWeatherData = that.currentWeatherData;
				
				for (var i = 0; i < that.forecastDays; i++) {
					that.previousForecastData[i] = that.currentForecastData[i];
				}
				
				that.printWind("#wind");
				that.printTemperature("#temperature");
				that.printIcon("#weathericon");
				that.printForecast("#forecast");
				setTimeout(function() {
					$(target).fadeIn(500, "swing");
				}, 500);
			});
		});
		
		setInterval(function() {
			$.when(that.getWeatherData(),
				that.getForecastData()).done(function() {
				
				if (that.currentWeatherData.toString() != that.previousWeatherData.toString() ||
					that.currentForecastData.toString() != that.previousForecastData.toString()) {
					
					that.previousWeatherData = that.currentWeatherData;
					
					for (var i = 0; i < that.forecastDays; i++) {
						that.previousForecastData[i] = that.currentForecastData[i];
					}
					
					$(target).fadeOut("slow", "swing", function() {
						that.printWind("#wind");
						that.printTemperature("#temperature");
						that.printIcon("#weathericon");
						that.printForecast("#forecast");
						$(target).fadeIn("slow", "swing");
					});
				}
			});
		}, that.refreshInterval * 60000);
	}
};
