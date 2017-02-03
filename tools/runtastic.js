var fs = require('fs');
var readline = require('readline');

var file = '../data/runtastic.txt';


var reader = readline.createInterface({
  input: fs.createReadStream(file)
});

var counter = 0;
reader.on('line', function (line) {
	counter++;
  	//console.log('Line from file:', line);
	
	if (counter > 1) {
		var lnArray = line.split('\t');
		
		var date = lnArray[0].split('.');
		var newDate = date[2] + '-' + date[1] + '-' + date[0];
		
		var dist = lnArray[2].split(' ');
		
		var duration = lnArray[3].length > 5 ? lnArray[3] : '0:' + lnArray[3];
		
		var pace = '0:' + lnArray[4];
		
		var elevation = lnArray[7] == '-' ? '0' : lnArray[7].split(' ');
		
		var sql = "INSERT INTO run (date, distance, duration, pace, kcal, elevation, notes, source) VALUES ('" 
			+ newDate + "', " + dist[0] + ", '" + duration + "', '" + pace + "', " + lnArray[5] 
			+ ", " + elevation[0] + ", '" + lnArray[8] + "', 'Runtastic');";
		console.log(sql);
		
	}
		
});
