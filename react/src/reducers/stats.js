"use strict";

const REQUEST_TOTAL = require('../actions/actions').REQUEST_TOTAL;
const RECEIVE_TOTAL_SUCCESS = require('../actions/actions').RECEIVE_TOTAL_SUCCESS;
const RECEIVE_TOTAL_FAILURE = require('../actions/actions').RECEIVE_TOTAL_FAILURE;

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
