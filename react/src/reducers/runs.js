"use strict";

const REQUEST_RUNS = require('../actions/actions').REQUEST_RUNS;
const RECEIVE_RUNS_SUCCESS = require('../actions/actions').RECEIVE_RUNS_SUCCESS;
const RECEIVE_RUNS_FAILURE = require('../actions/actions').RECEIVE_RUNS_FAILURE;
const INVALIDATE_RUNS = require('../actions/actions').INVALIDATE_RUNS;
const SET_FILTER = require('../actions/actions').SET_FILTER;

const initState = {
  	isFetching: false,
  	didInvalidate: false,
  	items: [],
	filter: 'yr:2016'
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
				items: action.items
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
			   	filter: action.filter
			})	
    	default:
			return state
	} 
}

module.exports.reducer = reducer;
