// Function for grouping runs by year, month, week

// internal functions

const _hmsToSec = (hms) => {
	var [h, m, s] = hms.split(':', 3);
	
	return Number.parseInt(h, 10) * 3600 + Number.parseInt(m, 10) * 60 + Number.parseInt(s, 10);
}

const _secToHms = (sec) => {
	var h = Math.floor(sec / 3600);
	var m = Math.floor((sec - (h * 3600)) / 60);
	var s = sec - (h * 3600) - (m * 60);

	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	if (s < 10) s = "0" + s;
	
	return h + ':' + m + ':' + s;
}

const _processItem = (acc, key, run) => {
	
	if (acc[key]) {
		acc[key].count++;
		acc[key].distance += Math.round(run.distance);
		acc[key].duration += _hmsToSec(run.duration);
		acc[key].kcal += run.kcal;
		acc[key].elevation += run.elevation;
	
	} else {
		acc[key] = {
			count: 1, 
			distance: Math.round(run.distance),
			duration: _hmsToSec(run.duration),
			kcal: run.kcal,
			elevation: run.elevation
		}
	}
}

// public functions

const groupRunsByYear = (runs) => {
	var acc = {};

	for (var i = 0; i < runs.length; i++)
		_processItem(acc, runs[i].year, runs[i]);
	
	for (item in acc) 
		acc[item].duration = _secToHms(acc[item].duration);
	
	return acc;
}

const groupRunsByMonth = (runs) => {
	var acc = {};

	for (var i = 0; i < runs.length; i++)
		_processItem(acc, runs[i].year + 'm' + runs[i].month, runs[i]);
	
	for (item in acc) 
		acc[item].duration = _secToHms(acc[item].duration);
	
	return acc;
}

const groupRunsByWeek = (runs) => {
	var acc = {};

	for (var i = 0; i < runs.length; i++)
		_processItem(acc, runs[i].year + 'w' + runs[i].week, runs[i]);
	
	for (item in acc) 
		acc[item].duration = _secToHms(acc[item].duration);
	
	return acc;
}

module.exports.groupRunsByYear = groupRunsByYear;
module.exports.groupRunsByMonth = groupRunsByMonth;
module.exports.groupRunsByWeek = groupRunsByWeek;
