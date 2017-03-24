"use strict";

/* The state structure:
{
	tab: 'act',
  	runs: {
      	isFetching: true,
      	didInvalidate: false,
	  	lastUpdated: 1439478405547,
		filter: { key: 'yr.2017', count: 145 },
      	items: [
        	{ id: 1, date: "2016-12-31", year: 2016, ... },
			{ id: 2, date: "2016-12-22", year: 2016, ... }
			...
      	],
		grouped: {
			week: {
				2017w15: { count: 5, distance: 35, duration: '4:50:49', kcal: 7023, elevation: 957, maxDistance: 12.3 },
	 			...
			},
			month: {
				2017m1: { count: 14, distance: 95, duration: '16:50:49', kcal: 22023, elevation: 5357, maxDistance: 15.2 },
	 			...
			},
			year: {
				2016: { count: 145, distance: 1067, duration: "108:20:10", elevation: 15886, kcal: 96988, maxDistance: 21.1 },
	 			...
			},
			total: { 
				total: { count: 445, distance: 3067, duration: "408:20:10", elevation: 35886, kcal: 426988, maxDistance: 21.1 }
			},
		},
		isImporting: false,
		lastImported: 1239478406530,
		newActivities: 0,
		showImportModal: false
	}
	stats: { 
		total: {  // obsolete
      		isFetching: true,
	  		lastUpdated: 1439478405547,
			data: {count: 411, distance: 2673.85, ...}
		}
	}
}
*/

var combineReducers = require('redux').combineReducers;
var tab = require('./tab').reducer;
var runs = require('./runs').reducer;
var stats = require('./stats').reducer;

const reducer = combineReducers({
	tab,
  	runs,
  	stats
})

module.exports.reducer = reducer;
