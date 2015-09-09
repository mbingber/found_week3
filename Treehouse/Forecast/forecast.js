var http = require("http");

function printError(error) {
	console.error(error.message);
}

function printMessage(location, description, temperature) {
	var message = "In " + location + ": " + description + ", " + temperature;
	console.log(message);
}

function get(zip) {
	var address = "http://api.wunderground.com/api/f39568ba1e56c172/conditions/q/" + zip + ".json";
	var request = http.get(address, function(response) {
		var body = "";
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					var w = JSON.parse(body);
					var location = w.current_observation.display_location.full;
					var condition = w.current_observation.weather;
					var temp = w.current_observation.temperature_string;
					printMessage(location, condition, temp);
				} catch(error) {
					printError(error.message);
				}
			} else {
				printError({message: "There was an error for your zip code entry"});
			}
		});
		
	});
	request.on('error', printError)
}

module.exports.get = get;