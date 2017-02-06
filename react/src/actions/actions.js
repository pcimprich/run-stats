require('es6-promise').polyfill();
require('isomorphic-fetch');

// action types

const SET_TABS = 'SET_TABS';
const REQUEST_RUNS = 'REQUEST_RUNS';
const RECEIVE_RUNS_SUCCESS = 'RECEIVE_RUNS_SUCCESS';
const RECEIVE_RUNS_FAILURE = 'RECEIVE_RUNS_FAILURE';
const INVALIDATE_RUNS = 'INVALIDATE_RUNS';
const REQUEST_TOTAL = 'REQUEST_TOTAL';
const RECEIVE_TOTAL_SUCCESS = 'RECEIVE_TOTAL_SUCCESS';
const RECEIVE_TOTAL_FAILURE = 'RECEIVE_TOTAL_FAILURE';
const SET_FILTER = 'SET_FILTER';

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

const setFilter = (key) => ({
  	type: SET_FILTER,
  	key: key
})

module.exports = {
	SET_TABS,
	REQUEST_RUNS,
	RECEIVE_RUNS_SUCCESS,
	RECEIVE_RUNS_FAILURE,
	INVALIDATE_RUNS,
	REQUEST_TOTAL,
	RECEIVE_TOTAL_SUCCESS,
	RECEIVE_TOTAL_FAILURE,
	SET_FILTER,
	setTabs,
	requestRuns,
	receiveRunsSuccess,
	receiveRunsFailure,
	invalidateRuns,
	fetchRuns,
	requestTotal,
	receiveTotalSuccess,
	receiveTotalFailure,
	fetchTotal,
	setFilter
}
