/*
	Mirror π
	
	Copyright (c) 2014 Istvan Szantai <szantaii at sidenote dot hu>
	Released under the MIT License (LICENSE).
*/

var calendar = {
	
	date: new Date(),
	monthsOfYear: settings.calendar.monthsOfYear,
	firstDayOfWeek: settings.calendar.firstDayOfWeek,
	daysOfWeek: settings.common.daysOfWeek,
	
	getNumberOfDays: function() {
		
		var tempDate = new Date(this.date.getFullYear(),
			this.date.getMonth() + 1, 0);
		return tempDate.getDate();
	},
	
	printDate: function(target) {
		
		$(target).html(this.monthsOfYear[this.date.getMonth()] + " " +
			this.date.getDate() + ", " + this.date.getFullYear());
	},
	
	printTime: function(target) {
		
		var minutes = this.date.getMinutes();
		
		if (minutes < 10)
		{
			minutes = "0" + minutes;
		}
		
		$(target).html(this.date.getHours() + ":" + minutes);
	},
	
	printMonth: function(target) {
		
		var targetContent = "";
		var tempDate = new Date(this.date.getFullYear(),
			this.date.getMonth() + 1, 0);
		
		targetContent += "<div class=\"week\">";
		
		for (var i = 0; i < 7; i++) {
			targetContent += "<div class=\"weekday\">" + this.daysOfWeek[i +
				this.firstDayOfWeek] + "</div>";
		}
		
		targetContent += "</div>";
		targetContent += "<div class=\"week\">";
		
		for (var i = 0; i < this.getNumberOfDays(date); i++) {
			tempDate.setDate(i + 1);
			
			if (i != 0 && (tempDate.getDay() - this.firstDayOfWeek) % 7 == 0) {
				targetContent += "</div><div class=\"week\">";
			}
			
			if (i == 0) {
				if (this.firstDayOfWeek == 0) {
					for(var j = tempDate.getDay(); j > 0; j--) {
						targetContent += "<div class=\"day\"></div>";
					}
				} else {
					if (tempDate.getDay() == 0) {
						for (var j = 0; j < 6; j++) {
							targetContent += "<div class=\"day\"></div>";
						}
					} else {
						for (var j = 1; j < tempDate.getDay(); j++) {
							targetContent += "<div class=\"day\"></div>";
						}
					}
				}
			}
			
			if (tempDate.getDate() == this.date.getDate()) {
				targetContent += "<div class=\"today\">" + tempDate.getDate();
				
				if (tempDate.getDate() < 10) {
					targetContent += "&thinsp;";
				}
			} else {
				targetContent += "<div class=\"day\">" + tempDate.getDate();
			}
			
			targetContent += "</div>";
		}
		
		targetContent += "</div>";
		
		$(target).html(targetContent);
	},
	
	show: function(target) {
		
		var that = this;
		
		$(target).fadeOut(0, "swing", function() {
			that.printDate("#date");
			that.printTime("#time");
			that.printMonth("#month");
			setTimeout(function() {
				$(target).fadeIn(500, "swing");
			}, 500);
		});
		
		setInterval(function() {
			$(target).fadeOut("slow", "swing", function() {
				that.date = new Date();
				
				that.printDate("#date");
				that.printTime("#time");
				that.printMonth("#month");
				$(target).fadeIn("slow", "swing");
			});
		}, 60000);
	}
};
