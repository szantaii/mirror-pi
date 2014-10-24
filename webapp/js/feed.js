var feed = {
	
	feedData: new Array(),
	flyDistance: "100px",
	url: settings.feed.url,
	title: settings.feed.title,
	entryCount: settings.feed.entryCount,
	timeout: settings.feed.timeout,
	
	format: function(target) {
		$(target).css({
			"width": "100%"
		});
		
		var width = parseInt($(target).css("width"));
		var margin = parseInt(this.flyDistance) +
			parseInt($(target).css("margin-bottom"));
		
		width -= 2 * margin;
		
		$(target).css({
			"width": width + "px",
			"margin-left": margin + "px",
			"margin-right": margin + "px"
		});
	},
	
	getFeedData: function() {
		
		var that = this;
		
		return $.ajax({
			url: "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" +
				this.entryCount + "&q=" + encodeURIComponent(this.url),
			dataType: "jsonp",
			success: function(data) {
				if (data.responseData.feed && data.responseData.feed.entries) {
					$.each(data.responseData.feed.entries,
							function (index, element) {
						
						that.feedData[index] = element.title;
					});
				}
			}
		});
	},
	
	printFeed: function(target) {
		
		var that = this;
		
		$(target).animate({
			"opacity": "0",
			"left": "+=" + that.flyDistance
		}, "slow", "swing", function() {
			$(target).css({"left": "-" + that.flyDistance});
			$(target).html(that.feedData[0]);
			if (that.title != "") {
				$(target).append("&#8239;&ndash;&#8239;" + that.title);
			}
			$(target).animate({
				opacity: "1",
				left: "+=" + that.flyDistance
			}, "slow", "swing", function() {
				// http://stackoverflow.com/a/9880482/1375010
				(function() {
					var i = 1;
					
					action = function() {
						
						if (i < that.feedData.length) {
							
							$(target).animate({
								"opacity": "0",
								"left": "+=" + that.flyDistance
							}, "slow", "swing", function() {
								$(target).css({"left": "-" + that.flyDistance});
								$(target).html(that.feedData[i]);
								if (that.title != "") {
									$(target).append("&#8239;&ndash;&#8239;" +
										that.title);
								}
								$(target).animate({
									"opacity": "1",
									"left": "+=" + that.flyDistance
								}, "slow", "swing", function() {
									i++;
								});
							});
							setTimeout(action, that.timeout * 1000)
						}
					};
					setTimeout(action, that.timeout * 1000);
				})();
			});
		});
	},
	
	show: function(target) {
		
		if (this.url != "" && this.url != undefined) {
			this.format(target);
			
			var that = this;
			
			$.when(that.getFeedData()).done(function() {
				that.printFeed(target);
				setInterval(function() {
					$.when(that.getFeedData()).done(function() {
						that.printFeed(target);
					});
				}, that.feedData.length * that.timeout * 1000);
			});
		}
	}
};
