var React = require('react');
var connect = require('react-redux').connect;
var RunStatsTabOverviewTable = require('./RunStatsTabOverviewTable').Component;

class RunStatsTabOverview extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
 	render() {
		return (
			<div className="tabContent">
				<RunStatsTabOverviewTable runs={this.props.runs} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabOverview = connect(mapStateToProps, null)(RunStatsTabOverview);

module.exports.Component = RunStatsTabOverview;