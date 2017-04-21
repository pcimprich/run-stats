// Auxiliary function for components 
var moment = require('moment');

const currentPeriodValues = (data, key) => {
	
	var values = {
			distance: 0,
			count: 0,
			duration: '0:00:00',
			maxDistance: 0,
			kcal: 0,
			elevation: 0
	};
	
	if (data[key]) {
		
		values = Object.assign({}, data[key], {
			duration: data[key].duration.replace(/^0/,'')
		});
	}
	return values;
}

const recentKeysW = (l) => {
	
	var now = moment();
	var keys = [now.year() + 'w' + now.isoWeek()];
	
	for (var i = 1; i < l; i++) {
		now.subtract(1, 'w');
		keys.push(now.year() + 'w' + now.isoWeek());
	}
	return keys;
}

const recentKeysM = (l) => {
	
	var now = moment();
	var keys = [now.year() + 'm' + (now.month()+1)];
	
	for (var i = 1; i < l; i++) {
		now.subtract(1, 'M');
		keys.push(now.year() + 'm' + (now.month()+1));
	}
	return keys;
}

const prettyPeriod = (period) => {
	var pretty = period.replace('w', ', week ');
	
	return pretty.replace(/m\d+/, (match) => {
		switch (match) {
			case 'm1':  return ', January';
		 	case 'm2':  return ', February';
			case 'm3':  return ', March';
			case 'm4':  return ', April';
			case 'm5':  return ', May';
			case 'm6': 	return ', June';
			case 'm7': 	return ', July';
			case 'm8': 	return ', August';
			case 'm9': 	return ', September';
			case 'm10': return ', October';
			case 'm11': return ', November';
			case 'm12': return ', December';
		  	default: match;
		}
	});
}

module.exports.currentPeriodValues = currentPeriodValues;
module.exports.recentKeysW = recentKeysW;
module.exports.recentKeysM = recentKeysM;
module.exports.prettyPeriod = prettyPeriod;
