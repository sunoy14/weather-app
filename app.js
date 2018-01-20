const yargs = require('yargs');

var geocode = require('./geocode/geocode.js');

var weather = require('./weather/weather.js');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv

var geocodeAddress = geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	} else {
		lat = results.latitude;
		lng = results.longitude;

		console.log('*******************************************');
		console.log('-');
		console.log(`Address : ${results.address}`);
		console.log(`Latitude : ${results.latitude}`);
		console.log(`Longitude : ${results.longitude}`);

		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if(errorMessage){
				console.log(errorMessage);
			} else {
				//convert to celsius
				var temp = (weatherResults.temperature - 32) * 5 / 9;
				//round to two decimals
				var temp = Math.round(temp * 100) / 100;

				console.log(`Its currently ${temp} C. It feels like ${temp} C.`);
				console.log('-');
				console.log('********************************************');
			}
		});	
	}
});		


