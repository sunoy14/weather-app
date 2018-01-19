const yargs = require('yargs');

var geocode = require('./geocode/geocode.js');

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

console.log(argv);

var geocodeAddress = geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	} else {
		console.log(JSON.stringify(results, undefined, 2));
	}
});		
