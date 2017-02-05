"use strict";

/* The state structure:
{
	tab: 'act',
  	runs: {
      	isFetching: true,
      	didInvalidate: false,
	  	lastUpdated: 1439478405547,
		filter: 'yr.2017',
      	items: [
        	{ id: 1, date: "2016-12-31", year: 2016, ... },
			{ id: 2, date: "2016-12-22", year: 2016, ... }
			...
      	  ],
    	}
	}
	stats: {
		total: {
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
