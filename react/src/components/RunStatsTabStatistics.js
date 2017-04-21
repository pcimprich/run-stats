var React = require('react');
var connect = require('react-redux').connect;
var RunStatsTabStatisticsType = require('./RunStatsTabStatisticsType').Component;
var RunStatsTabStatisticsList = require('./RunStatsTabStatisticsList').Component;

class RunStatsTabStatistics extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
 	render() {
		return (
			<div className="tabContent">
				<RunStatsTabStatisticsType runs={this.props.runs} dispatch={this.props.dispatch} />
				<RunStatsTabStatisticsList runs={this.props.runs} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabStatistics = connect(mapStateToProps, null)(RunStatsTabStatistics);

module.exports.Component = RunStatsTabStatistics;