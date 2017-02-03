"use strict";

const SET_TABS = require('../actions/actions').SET_TABS;

const reducer = (state = 'act', action) => {

  	switch (action.type) {
		case SET_TABS:
			return action.tab
    	default:
			return state;
  	  } 
}

module.exports.reducer = reducer;
