// this file is obsolete

"use strict";

const {REQUEST_TOTAL, RECEIVE_TOTAL_SUCCESS, 
		RECEIVE_TOTAL_FAILURE} = require('../actions/actions');

const initState = { 
	total: {
  		isFetching: false,
  		data: {}
	}
}

const reducer = (state = initState, action) => {

  	switch (action.type) {

		case REQUEST_TOTAL:
			return Object.assign({}, state, {
				total: Object.assign({}, state.total, {
					isFetching: true
				})
			})
		case RECEIVE_TOTAL_SUCCESS:
			return Object.assign({}, state, {
				total: Object.assign({}, state.total, {
					isFetching: false,
					lastUpdated: action.receivedAt,
					data: action.data
				})
			})
		case RECEIVE_TOTAL_FAILURE:
			return Object.assign({}, state, {
				total: Object.assign({}, state.total, {
					isFetching: false
				})
			})		
    	default:
			return state;
  	  } 
}

module.exports.reducer = reducer;
