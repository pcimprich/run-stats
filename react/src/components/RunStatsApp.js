var React = require('react');
var RunStatsTabs = require('./RunStatsTabs').Component;

const RunStatsApp = (props) => {
	
 	return (
		<div>
			<div>run-stats</div>
			<RunStatsTabs />
	  	</div>
  	);
}

module.exports.Component = RunStatsApp;