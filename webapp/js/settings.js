var settings = {
	common: {
		daysOfWeek: ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"]
	},
	calendar: {
		firstDayOfWeek: 1, // Sunday = 0, Monday = 1
		monthsOfYear: ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"]
	},
	weather: {
		city: "Budapest",
		countryCode: "HU",
		unitType: "metric", // "metric" or "imperial"
		forecastDays: 5, // max 5
		refreshInterval: 5 // measured in minutes
	},
	feed: {
		url: "http://www.nasa.gov/rss/dyn/breaking_news.rss",
		title: "NASA",
		entryCount: 30,
		timeout: 10
	}
};
