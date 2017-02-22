var pool = require('./db');
var fs = require('fs');
var parse = require('csv-parse');
var config = require('../config.json');

const insertActivity = (act) => {
	//console.log('insert: ', act);
		
	var dt = act[3].split(' ');
	var date = [dt[3], monthNumber(dt[2]), dt[1]].join('-');
		
	var tm = dt[4].split(':');
	var time = dt[5] == 'PM' ? (Number.parseInt(tm[0], 10) + 12).toString() + ':' + tm[1] : dt[4];
		
	var duration = act[5].length > 5 ? act[5] : '0:' + act[5];
	var pace = '0:' + act[6];
	var loc = act[1].replace(/\sRunning/, '');
	var kcal =  Number.parseInt(act[11].replace(/,/, ''), 10);
	var steps =  Number.parseInt(act[10].replace(/,/, ''), 10);
	
	console.log('>>>', loc);
		
	pool.query("INSERT INTO run (date, time, distance, duration, pace, kcal, elevation, cadence, steps, location, source) " + 
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
		[date, time, act[4], duration, pace, kcal, act[8], act[9], steps, loc, 'Garmin'], function(err, result) {
			if (err) {
		 		console.error('error connecting: ' + err.stack);
		  		throw err;
	  		}
			//console.log('[insertRun] Insert ID: ' + result.insertId);	
	});	
}

const processActivity = (act) => {
	const [date, dist] = dateAndDistanceFromActivity(act);
	
	pool.query('SELECT count(*) AS count FROM run WHERE date = ? AND distance = ?', 
				[date, dist], function(err, rows) {
		if (err) {
			console.error('error connecting: ' + err.stack);
	  		throw err;
  		}
		if (rows[0].count == 0) insertActivity(act);
	});
}

const monthNumber = (month) => {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	for (var i = 0; i <= 12; i++) {
		if (months[i] == month) return i + 1;
	}	
}

const dateAndDistanceFromActivity = (act) => {
	var dt = act[3].split(' ');
	return [[dt[3], monthNumber(dt[2]), dt[1]].join('-'), act[4]];
}

const checkCountSql = (csv) => {
	var sql = 'SELECT count(*) AS count FROM run WHERE ';
	var condition = [];
	for (line of csv) {
		const [date, dist] = dateAndDistanceFromActivity(line);
		condition.push("(date = '" + date + "' AND distance = " + dist + ")");
	}
	sql += condition.join(' OR ');
	//console.log('SQL: ', sql);
	return sql;
}

const importGarmin = (callback, test) => {
	
	var cvsFile = test ? config.garminTestCsvFile : config.garminCsvFile;
	
	fs.readFile(cvsFile, 'utf8', (err,data) => {
	  if (err) return console.error('error opening file', err.stack);
	  
	  parse(data, {relax_column_count: true, skip_lines_with_empty_values: true}, 
	  	(err, csv) => {
			if (err) console.error('error parsing CSV: ' + err.stack);
			//console.log(csv);
			
			var filteredCsv = csv.filter((line) => {return line.length == 19 && !line[0].match(/Favorite/)});
			//console.log('FILT: ', filteredCsv.length);
	
			pool.query(checkCountSql(filteredCsv), (err, rows) => {
				if (err) {
					console.error('error connecting: ' + err.stack);
  					throw err;
				}
				
				callback({newActivities: filteredCsv.length - rows[0].count});
			});
			
			// new activities inserted if not in TEST mode
			if (!test) for (line of filteredCsv) processActivity(line);
	  	})
	});
}
/*
const callback = (count) => {
	console.log('FINAL: ', count);
}

importGarmin(callback, 1);
*/
module.exports.importGarmin = importGarmin;
