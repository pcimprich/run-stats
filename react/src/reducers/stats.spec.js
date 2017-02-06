// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./stats').reducer;
var {requestTotal, receiveTotalSuccess} = require('../actions/actions');

describe("testing STATS reducer", function() {
	
	const data = {count:411, distance:2674, duration:1749748, elevation:36006};
		
	it("it should return the initial state", () => {
		
		const initState = { 
			total: {
		  		isFetching: false,
		  		data: {}
			}
		}
		
		deepFreeze(initState);
		
		expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify(initState));
	})
			
	it("it should handle REQUEST_TOTAL action", () => {
							
		const stateBefore = { 
			total: {
		  		isFetching: false,
		  		data: {}
			}
		}
	
		const action = requestTotal();
	
		const stateAfter = { 
			total: {
		  		isFetching: true,
		  		data: {}
			}
		}

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle RECEIVE_TOTAL_SUCCESS action", () => {
							
		const stateBefore = { 
			total: {
		  		isFetching: true,
		  		data: {}
			}
		}
	
		const action = receiveTotalSuccess(data);
	
		const stateAfter = { 
			total: {
		  		isFetching: false,
				data: data,
				lastUpdated: Date.now()
			}
		}

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle unknown action", () => {
		
		const stateBefore = { 
			total: {
		  		isFetching: false,
				data: data,
				lastUpdated: Date.now()
			}
		}
	
		const action = {
	    	type: 'UNKNOWN_ACTION'
		};

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(reducer(stateBefore, action)).toEqual(stateBefore);
	})
})
