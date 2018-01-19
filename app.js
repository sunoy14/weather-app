const yargs = require('yargs');
const request = require('request');

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

var encodedUri = encodeURIComponent(argv.address);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUri}`,
	json: true
}, (error, response, body) => {
	if(error){
		console.log('unable to connect to google servers.');
	} else if (body.status === 'ZERO_RESULTS'){
		console.log('Unable to find that address');
	} else if (body.status === 'OK'){
		//console.log(JSON.stringify(body, undefined, 4));
		console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
		console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
	}
});
