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

module.exports.currentPeriodValues = currentPeriodValues;
module.exports.recentKeysW = recentKeysW;
module.exports.recentKeysM = recentKeysM;


