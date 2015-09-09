var fs = require('fs');

fs.readFile(process.argv[2], function(err, response) {
	if (err) {
		throw err;
	} else {
		var lines = response.toString().split('\n');
		console.log(lines.length - 1);
	}
});