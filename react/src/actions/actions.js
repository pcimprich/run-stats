require('es6-promise').polyfill();
require('isomorphic-fetch');

// action types

const SET_TABS = 'SET_TABS';
const REQUEST_RUNS = 'REQUEST_RUNS';
const RECEIVE_RUNS_SUCCESS = 'RECEIVE_RUNS_SUCCESS';
const RECEIVE_RUNS_FAILURE = 'RECEIVE_RUNS_FAILURE';
const INVALIDATE_RUNS = 'RECEIVE_RUNS_FAILURE';

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

module.exports = {
	SET_TABS,
	REQUEST_RUNS,
	RECEIVE_RUNS_SUCCESS,
	RECEIVE_RUNS_FAILURE,
	INVALIDATE_RUNS,
	setTabs,
	requestRuns,
	receiveRunsSuccess,
	receiveRunsFailure,
	invalidateRuns,
	fetchRuns
}
