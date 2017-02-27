// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./tab').reducer;
var {setTabs} = require('../actions/actions');

describe("testing TAB reducer", function() {
		
	it("it should return the initial state", () => {
		
		const initState = 'dsh';
		
		deepFreeze(initState);
		
		expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify(initState));
	})
			
	it("it should handle SET_TABS action", () => {
							
		const stateBefore = 'dsh';
	
		const action = setTabs('sta');
	
		const stateAfter = 'sta';

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(JSON.stringify(reducer(stateBefore, action))).toEqual(JSON.stringify(stateAfter));
	})
	
	it("it should handle unknown action", () => {
		
		const stateBefore = 'sta';
	
		const action = {
	    	type: 'UNKNOWN_ACTION'
		};

  		deepFreeze(stateBefore);
  		deepFreeze(action);
	
		expect(reducer(stateBefore, action)).toEqual(stateBefore);
	})
})
