var React = require('react');
var connect = require('react-redux').connect;
var fetchRuns = require('../actions/actions').fetchRuns;
var RunStatsTabActivitiesFilter = require('./RunStatsTabActivitiesFilter').Component;
var RunStatsTabActivitiesList = require('./RunStatsTabActivitiesList').Component;

class RunStatsTabActivities extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
 	render() {
		return (
			<div className="tabContent">
				<RunStatsTabActivitiesFilter runs={this.props.runs} dispatch={this.props.dispatch} />
				<RunStatsTabActivitiesList runs={this.props.runs} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabActivities = connect(mapStateToProps, null)(RunStatsTabActivities);

module.exports.Component = RunStatsTabActivities;
