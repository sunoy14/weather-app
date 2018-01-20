const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
			uri: `https://api.darksky.net/forecast/fbaca6719bb853b1db030a7c57c35c9c/${lat}, ${lng}`,
			json: true
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.temperature
				});
			} else {
				callback('Unable to fetch weather');
			}
		});	
};

module.exports = {
	getWeather
};
