// to be run with Jasmine: jasmine-node <DIR>
"use strict";

var deepFreeze = require('deep-freeze');
var reducer = require('./runs').reducer;
var {requestRuns, receiveRunsSuccess, invalidateRuns, setFilter, requestImport, 
		receiveImportSuccess, openImportModal, closeImportModal} = require('../actions/actions');

describe("testing RUNS reducer", function() {
	
	// Test data
	
	const data = [
		{cadence:78, date:"2017/02/27", distance:7.17, duration:"00:41:05", elevation:140, id:412, kcal:691, location:"Radošovice", month:2, 
		notes:null, pace:"00:05:44", source:"Garmin", steps:6404, time:"24:25:00", week:9, year:2017},
		{cadence:78, date:"2017/02/24", distance:10.59, duration:"00:40:03", elevation:116, id:413, kcal:641, location:"Radošovice", month:2, 
		notes:null, pace:"00:06:05", source:"Garmin", steps:6242, time:"11:58:00", week:8, year:2017}
	];
	const currentDate = Date.now();
	
	const initState = {
	  	isFetching: false,
	  	didInvalidate: false,
	  	items: [],
		filter: {key: 'yr:2017'},
		grouped: {week: {}, month: {}, year: {}, all: { total: {}}},
		stats: 'week',
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
		grouped: {
			week: {
				'2017w09': {"count":1,"distance":7,"maxDistance":7.2,"duration":"00:41:05","kcal":691,"elevation":140},
				'2017w08': {"count":1,"distance":11,"maxDistance":10.6,"duration":"00:40:03","kcal":641,"elevation":116}
			},
			month: {
				'2017m02': {"count":2,"distance":18,"maxDistance":10.6,"duration":"01:21:08","kcal":1332,"elevation":256}
			}, 
			year: {
				'2017': {"count":2,"distance":18,"maxDistance":10.6,"duration":"01:21:08","kcal":1332,"elevation":256}
			},
			all: {
				'total': {"count":2,"distance":18,"maxDistance":10.6,"duration":"01:21:08","kcal":1332,"elevation":256}
			}
		},
		stats: 'week',
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
