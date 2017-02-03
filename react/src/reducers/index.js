"use strict";

/* The state structure:
{
	tab: 'act',
  	runs: {
      	isFetching: true,
      	didInvalidate: false,
	  	lastUpdated: 1439478405547,
      	items: [
        	{id: 1, date: "2016-12-31", year: 2016, ...},
			{id: 2, date: "2016-12-22", year: 2016, ...}
			...
      	  ]
    	}
  	}
}
*/

var combineReducers = require('redux').combineReducers;
var tab = require('./tab').reducer;
var runs = require('./runs').reducer;

const reducer = combineReducers({
  tab,
  runs
})

module.exports.reducer = reducer;
