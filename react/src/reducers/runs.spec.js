// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./runs').reducer;
var {requestRuns, receiveRunsSuccess, invalidateRuns, setFilter, requestImport, 
		receiveImportSuccess, openImportModal, closeImportModal} = require('../actions/actions');

describe("testing RUNS reducer", function() {
	
	// Test data
	
	const data = [
		{id: 1, date: "2016/12/31", year: 2017, distance :8.35},
		{id: 2, date: "2016/12/30", year: 2017, distance :10.27}
	];
	const currentDate = Date.now();
	
	const initState = {
	  	isFetching: false,
	  	didInvalidate: false,
	  	items: [],
		filter: {key: 'yr:2017'},
		isImporting: false,
		newActivities: 0,
		showImportModal :false
	}
	
	const state2 = Object.assign({}, initState, {isFetching: true})
	
	const state3 = { 
	  	isFetching: false,
	  	didInvalidate: false,
	  	items: data,
		filter: {key: 'yr:2017', count: 2},
		isImporting: false,
		newActivities: 0,
		showImportModal :false,
		lastUpdated: currentDate
	}
	
	const state4 = Object.assign({}, state3, {didInvalidate: true})
	const state5 = Object.assign({}, state3, {filter: {key: 'km:10', count: 1}})
	const state6 = Object.assign({}, state3, {isImporting: true})
	const state7 = Object.assign({}, state3, {didInvalidate: true, lastImported: currentDate, newActivities: 5})
	const state8 = Object.assign({}, state7, {showImportModal: true})
   	
	
	// Tests
		
	it("it should return the initial state", () => {
		
		deepFreeze(initState);
		
		expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify(initState));
	})
			
	it("it should handle REQUEST_RUNS action", () => {

  		deepFreeze(initState);
  		deepFreeze(requestRuns());
		
		expect(JSON.stringify(reducer(initState, requestRuns()))).toEqual(JSON.stringify(state2));
	})
	
	it("it should handle RECEIVE_RUNS_SUCCESS action", () => {
		
  		deepFreeze(state2);
  		deepFreeze(receiveRunsSuccess(data));
		
		var newState = reducer(state2, receiveRunsSuccess(data));
		newState.lastUpdated = currentDate; // changing the timestamp
	
		expect(JSON.stringify(newState)).toEqual(JSON.stringify(state3));
	})
	
	it("it should handle INVALIDATE_RUNS action", () => {

  		deepFreeze(state3);
  		deepFreeze(invalidateRuns());
	
		expect(JSON.stringify(reducer(state3, invalidateRuns()))).toEqual(JSON.stringify(state4));
	})
	
	it("it should handle SET_FILTER action", () => {

  		deepFreeze(state3);
  		deepFreeze(setFilter('km:10'));
	
		expect(JSON.stringify(reducer(state3, setFilter('km:10')))).toEqual(JSON.stringify(state5));
	})
	
	it("it should handle REQUEST_IMPORT action", () => {

  		deepFreeze(state3);
  		deepFreeze(requestImport());
	
		expect(JSON.stringify(reducer(state3, requestImport()))).toEqual(JSON.stringify(state6));
	})
	
	it("it should handle RECEIVE_IMPORT_SUCCESS action", () => {

  		deepFreeze(state6);
  		deepFreeze(receiveImportSuccess({newActivities: 5}));
		
		var newState = reducer(state6, receiveImportSuccess({newActivities: 5}));
		newState.lastImported = currentDate; // changing the timestamp
	
		expect(JSON.stringify(newState)).toEqual(JSON.stringify(state7));
	})
	
	it("it should handle OPEN_IMPORT_MODAL action", () => {

  		deepFreeze(state7);
  		deepFreeze(openImportModal());
	
		expect(JSON.stringify(reducer(state7, openImportModal()))).toEqual(JSON.stringify(state8));
	})
	
	it("it should handle CLOSE_IMPORT_MODAL action", () => {

  		deepFreeze(state8);
  		deepFreeze(closeImportModal());
	
		expect(JSON.stringify(reducer(state8, closeImportModal()))).toEqual(JSON.stringify(state7));
	})
	
	it("it should handle unknown action", () => {
	
		const action = {type: 'UNKNOWN_ACTION'};

  		deepFreeze(state3);
  		deepFreeze(action);
	
		expect(reducer(state3, action)).toEqual(state3);
	})
})
