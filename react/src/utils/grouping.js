// Function for grouping runs by total, year, month, week
var {leadingZero} = require('./auxiliary.js');

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
		acc[key].distance += run.distance;
		if (run.distance > acc[key].maxDistance) acc[key].maxDistance = run.distance;
		acc[key].duration += _hmsToSec(run.duration);
		acc[key].kcal += run.kcal;
		acc[key].elevation += run.elevation;
	
	} else {
		acc[key] = {
			count: 1, 
			distance: run.distance,
			maxDistance: run.distance,
			duration: _hmsToSec(run.duration),
			kcal: run.kcal,
			elevation: run.elevation
		}
	}
}

const _postProcess = (acc) => {
	for (let grouping in acc) {
		for (let item in acc[grouping]) {
			acc[grouping][item].duration = _secToHms(acc[grouping][item].duration);
			acc[grouping][item].distance = Math.round(acc[grouping][item].distance);
			acc[grouping][item].maxDistance = Math.round(acc[grouping][item].maxDistance * 10) / 10;
		}
	}
}

// public functions

const groupRuns = (runs) => {
	//console.time('groupRuns');
	var acc = {week: {}, month: {}, year: {}, all: {}};

	for (var i = 0; i < runs.length; i++) {
		_processItem(acc.week, runs[i].year + 'w' + leadingZero(runs[i].week), runs[i]);
		_processItem(acc.month, runs[i].year + 'm' + leadingZero(runs[i].month), runs[i]);
		_processItem(acc.year, runs[i].year, runs[i]);
		_processItem(acc.all, 'total', runs[i]);
	}
	_postProcess(acc);
	
	//console.timeEnd('groupRuns');
	return acc;
}

module.exports.groupRuns = groupRuns;
