// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./runs').reducer;
var {requestRuns, receiveRunsSuccess, invalidateRuns, setFilter} = require('../actions/actions');

describe("testing RUNS reducer", function() {
	
	const data = [
		{id: 1, date: "2016/12/31", year: 2016, distance :8.35},
		{id: 2, date: "2016/12/30", year: 2016, distance :10.27}
	];
	const currentDate = Date.now();
		
	it("it should return the initial state", () => {
		
		const initState = {
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: [],
			filter: {key: 'yr:2016'}
		}
		
		deepFreeze(initState);
		
		expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify(initState));
	})
			
	it("it should handle REQUEST_RUNS action", () => {
							
		const stateBefore = { 
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: [],
			filter: {key: 'yr:2016'}
		}
	
		const action = requestRuns();
	
		const stateAfter = { 
		  	isFetching: true,
		  	didInvalidate: false,
		  	items: [],
			filter: {key: 'yr:2016'}
		}

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle RECEIVE_RUNS_SUCCESS action", () => {
							
		const stateBefore = {
		  	isFetching: true,
		  	didInvalidate: false,
		  	items: [],
			filter: {key: 'yr:2016'}
		}
	
		const action = receiveRunsSuccess(data);
		
		const stateAfter = { 
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: data,
			filter: {key: 'yr:2016', count: 2},
			lastUpdated: currentDate
		}
		
  		deepFreeze(stateBefore);
  		deepFreeze(action);
		
		var newState = reducer(stateBefore, action);
		newState.lastUpdated = currentDate; // changing the timestamp
	
		expect(JSON.stringify(newState)).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle INVALIDATE_RUNS action", () => {
		
		const stateBefore = {
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: data,
			filter: {key: 'yr:2016', count: 2},
			lastUpdated: currentDate
		}
	
		const action = invalidateRuns();
	
		const stateAfter = { 
		  	isFetching: false,
		  	didInvalidate: true,
		  	items: data,
			filter: {key: 'yr:2016', count: 2},
			lastUpdated: currentDate
		}

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle SET_FILTER action", () => {
		
		const stateBefore = {
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: data,
			filter: {key: 'yr:2016', count: 2},
			lastUpdated: currentDate
		}
	
		const action = setFilter('km:10');
	
		const stateAfter = { 
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: data,
			filter: {key: 'km:10', count: 1},
			lastUpdated: currentDate
		}

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle unknown action", () => {
		
		const stateBefore = { 
		  	isFetching: false,
		  	didInvalidate: false,
		  	items: data,
			filter: {key: 'yr:2016', count: 2},
			lastUpdated: currentDate
		}
	
		const action = {
	    	type: 'UNKNOWN_ACTION'
		};

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(reducer(stateBefore, action)).toEqual(stateBefore);
	})
})
