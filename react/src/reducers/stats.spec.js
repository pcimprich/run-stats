// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./stats').reducer;
var {requestTotal, receiveTotalSuccess} = require('../actions/actions');

describe("testing STATS reducer", function() {
	
	const data = {count:411, distance:2674, duration:1749748, elevation:36006};
	
	const currentDate = Date.now();
	
	const initState = { 
		total: {
	  		isFetching: false,
	  		data: {}
		}
	}
	
	const state1 = { 
		total: {
	  		isFetching: true,
	  		data: {}
		}
	}
	
	const state2 = { 
		total: {
	  		isFetching: false,
			data: data,
			lastUpdated: currentDate
		}
	}
		
	it("it should return the initial state", () => {
		
		deepFreeze(initState);
		
		expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify(initState));
	})
			
	it("it should handle REQUEST_TOTAL action", () => {

  		deepFreeze(initState);
  		deepFreeze(requestTotal());
	
		expect(JSON.stringify(reducer(initState, requestTotal()))).toEqual(JSON.stringify(state1));
	})
	
	it("it should handle RECEIVE_TOTAL_SUCCESS action", () => {

  		deepFreeze(state1);
  		deepFreeze(receiveTotalSuccess(data));
		
		var newState = reducer(state1, receiveTotalSuccess(data));
		newState.total.lastUpdated = currentDate;
	
		expect(JSON.stringify(newState)).toEqual(JSON.stringify(state2));
	})
	
	it("it should handle unknown action", () => {
	
		const action = {
	    	type: 'UNKNOWN_ACTION'
		};

  		deepFreeze(state2);
  		deepFreeze(action);
	
		expect(reducer(state2, action)).toEqual(state2);
	})
})
