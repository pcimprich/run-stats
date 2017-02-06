"use strict";

var runFilter = require('../utils/filters').runFilter;

const {REQUEST_RUNS, RECEIVE_RUNS_SUCCESS, 
		RECEIVE_RUNS_FAILURE, INVALIDATE_RUNS, SET_FILTER} = require('../actions/actions');

const initState = {
  	isFetching: false,
  	didInvalidate: false,
  	items: [],
	filter: {key: 'yr:2016'}
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
				})
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
    	default:
			return state
	} 
}

module.exports.reducer = reducer;
