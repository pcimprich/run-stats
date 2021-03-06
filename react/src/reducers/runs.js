"use strict";

var {runFilter} = require('../utils/filters');
var {groupRuns}  = require('../utils/grouping');

const {REQUEST_RUNS, RECEIVE_RUNS_SUCCESS, RECEIVE_RUNS_FAILURE, INVALIDATE_RUNS, 
	SET_FILTER, REQUEST_IMPORT, RECEIVE_IMPORT_SUCCESS, RECEIVE_IMPORT_FAILURE, 
	OPEN_IMPORT_MODAL, CLOSE_IMPORT_MODAL, SET_STATS} = require('../actions/actions');

const initState = {
  	isFetching: false,
  	didInvalidate: false,
  	items: [],
	filter: {key: 'yr:2017'},
	grouped: {week: {}, month: {}, year: {}, all: { total: {}}},
	stats: 'week',
	isImporting: false,
	newActivities: 0,
	showImportModal: false
}

const reducer = (state = initState, action) => {

  	switch (action.type) {
		case REQUEST_RUNS:
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_RUNS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
			   	didInvalidate: false,
				lastUpdated: action.receivedAt,
				items: action.items,
				filter: Object.assign({}, state.filter, {
					count: action.items.filter((run) => runFilter(run, state.filter.key)).length
				}),
				grouped: groupRuns(action.items)
			})
		case RECEIVE_RUNS_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})
		case INVALIDATE_RUNS:
			return Object.assign({}, state, {
			   	didInvalidate: true
			})	
		case SET_FILTER:
			return Object.assign({}, state, {
			   	filter: {
					key: action.key,
					count: state.items.filter((run) => runFilter(run, action.key)).length
				}
			})
		case REQUEST_IMPORT:
			return Object.assign({}, state, {
				isImporting: true
			})
		case RECEIVE_IMPORT_SUCCESS:
			return Object.assign({}, state, {
				isImporting: false,
			   	didInvalidate: action.newActivities ? true : false,
				lastImported: action.receivedAt,
				newActivities: action.newActivities
			})
		case RECEIVE_IMPORT_FAILURE:
			return Object.assign({}, state, {
				isImporting: false
			})
		case OPEN_IMPORT_MODAL:
			return Object.assign({}, state, {
				showImportModal: true
			})
		case CLOSE_IMPORT_MODAL:
			return Object.assign({}, state, {
				showImportModal: false
			})
		case SET_STATS:
			return Object.assign({}, state, {
				stats: action.key
			})
    	default:
			return state
	} 
}

module.exports.reducer = reducer;
