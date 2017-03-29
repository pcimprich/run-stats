require('es6-promise').polyfill();
require('isomorphic-fetch');

// action types

const SET_TABS = 'SET_TABS';
const REQUEST_RUNS = 'REQUEST_RUNS';
const RECEIVE_RUNS_SUCCESS = 'RECEIVE_RUNS_SUCCESS';
const RECEIVE_RUNS_FAILURE = 'RECEIVE_RUNS_FAILURE';
const INVALIDATE_RUNS = 'INVALIDATE_RUNS';
//const REQUEST_TOTAL = 'REQUEST_TOTAL';
//const RECEIVE_TOTAL_SUCCESS = 'RECEIVE_TOTAL_SUCCESS';
//const RECEIVE_TOTAL_FAILURE = 'RECEIVE_TOTAL_FAILURE';
const SET_FILTER = 'SET_FILTER';
const REQUEST_IMPORT = 'REQUEST_IMPORT';
const RECEIVE_IMPORT_SUCCESS = 'RECEIVE_IMPORT_SUCCESS';
const RECEIVE_IMPORT_FAILURE = 'RECEIVE_IMPORT_FAILURE';
const OPEN_IMPORT_MODAL = 'OPEN_IMPORT_MODAL';
const CLOSE_IMPORT_MODAL = 'CLOSE_IMPORT_MODAL';
const SET_STATS = 'SET_STATS';

// action creators

const setTabs = (key) => ({
  	type: SET_TABS,
  	tab: key
})

const requestRuns = () => ({
    type: REQUEST_RUNS,
})

const receiveRunsSuccess = (json) => ({
    type: RECEIVE_RUNS_SUCCESS,
	items: json,
	receivedAt: Date.now()
})

const receiveRunsFailure = (error) => ({
    type: RECEIVE_RUNS_FAILURE,
	error: error,
	receivedAt: Date.now()
})

const invalidateRuns = () => ({
    type: INVALIDATE_RUNS
})

const fetchRuns = () => {
    return (dispatch) => {
		
    	dispatch(requestRuns());
		
		return fetch(`/api/runs`)
			.then( response => response.json() )
		  	.then( json => dispatch(receiveRunsSuccess(json)) )
			.catch( ex => dispatch(receiveRunsSuccess(ex)) );		     
	}
}
/*
const requestTotal = () => ({
    type: REQUEST_TOTAL,
})

const receiveTotalSuccess = (json) => ({
    type: RECEIVE_TOTAL_SUCCESS,
	data: json,
	receivedAt: Date.now()
})

const receiveTotalFailure = (error) => ({
    type: RECEIVE_TOTAL_FAILURE,
	error: error,
	receivedAt: Date.now()
})

const fetchTotal = () => {
    return (dispatch) => {
		
    	dispatch(requestTotal());
		
		return fetch(`/api/stats/total`)
			.then( response => response.json() )
		  	.then( json => dispatch(receiveTotalSuccess(json)) )
			.catch( ex => dispatch(receiveTotalSuccess(ex)) );		     
	}
}
*/
const setFilter = (key) => ({
  	type: SET_FILTER,
  	key: key
})

const requestImport = () => ({
    type: REQUEST_IMPORT,
})

const receiveImportSuccess = (json) => ({
    type: RECEIVE_IMPORT_SUCCESS,
	newActivities: json.newActivities,
	receivedAt: Date.now()
})

const receiveImportFailure = (error) => ({
    type: RECEIVE_IMPORT_FAILURE,
	error: error,
	receivedAt: Date.now()
})

const runImport = () => {
    return (dispatch) => {
		
    	dispatch(requestImport());
		
		return fetch(`/api/import`)
			.then( response => response.json() )
		  	.then( json => dispatch(receiveImportSuccess(json)) )
			.catch( ex => dispatch(receiveImportSuccess(ex)) );		     
	}
}

const openImportModal = () => ({
    type: OPEN_IMPORT_MODAL,
})

const closeImportModal = () => ({
    type: CLOSE_IMPORT_MODAL,
})

const setStats = (key) => ({
  	type: SET_STATS,
  	key: key
})

module.exports = {
	SET_TABS,
	REQUEST_RUNS,
	RECEIVE_RUNS_SUCCESS,
	RECEIVE_RUNS_FAILURE,
	INVALIDATE_RUNS,
	SET_FILTER,
	REQUEST_IMPORT,
	RECEIVE_IMPORT_SUCCESS,
	RECEIVE_IMPORT_FAILURE,
	OPEN_IMPORT_MODAL,
	CLOSE_IMPORT_MODAL,
	SET_STATS,
	setTabs,
	requestRuns,
	receiveRunsSuccess,
	receiveRunsFailure,
	invalidateRuns,
	fetchRuns,
	setFilter,
	requestImport,
	receiveImportSuccess,
	receiveImportFailure,
	runImport,
	openImportModal,
	closeImportModal,
	setStats
}
