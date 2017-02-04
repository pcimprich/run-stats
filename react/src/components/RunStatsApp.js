var React = require('react');
var RunStatsTabs = require('./RunStatsTabs').Component;
var RunStatsHeader = require('./RunStatsHeader').Component;

const RunStatsApp = (props) => {
	
 	return (
		<div>
			<RunStatsHeader />
			<RunStatsTabs />
	  	</div>
  	);
}

module.exports.Component = RunStatsApp;