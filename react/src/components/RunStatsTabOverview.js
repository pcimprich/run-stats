var React = require('react');
var connect = require('react-redux').connect;
var RunStatsTabOverviewTable = require('./RunStatsTabOverviewTable').Component;

class RunStatsTabOverview extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
 	render() {
		const data = this.props.runs.grouped.month;
	 	const oInd = {}; // each individual month
		const oAgg = {}; // aggregated since the beginning of year
	 	for (let y of Object.keys(this.props.runs.grouped.year)) {
			oInd[y] = {};
			oAgg[y] = {};
			oInd[y].m1 = data[y + 'm1'] ? data[y + 'm1'].distance : '-';
			oAgg[y].m1 = data[y + 'm1'] ? data[y + 'm1'].distance : 0;
			for (let i = 2; i <= 12; i++) {
				oInd[y]['m' + i] = data[y + 'm' + i] ? data[y + 'm' + i].distance : '-';
				oAgg[y]['m' + i] = data[y + 'm' + i] ? data[y + 'm' + i].distance + oAgg[y]['m' + (i-1)] : oAgg[y]['m' + (i-1)];
			}
	 	}
		
		return (
			<div className="tabContent">
				<RunStatsTabOverviewTable overview={oInd} />
				<RunStatsTabOverviewTable overview={oAgg} />
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