var React = require('react');
var connect = require('react-redux').connect;
var RunStatsTabOverviewTable = require('./RunStatsTabOverviewTable').Component;
var {leadingZero} = require('../utils/auxiliary.js');

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
			oInd[y].m01 = data[y + 'm01'] ? data[y + 'm01'].distance : '-';
			oAgg[y].m01 = data[y + 'm01'] ? data[y + 'm01'].distance : 0;
			for (let i = 2; i <= 12; i++) {
				oInd[y]['m' + leadingZero(i)] = data[y + 'm' + leadingZero(i)] ? data[y + 'm' + leadingZero(i)].distance : '-';
				oAgg[y]['m' + leadingZero(i)] = data[y + 'm' + leadingZero(i)] ? data[y + 'm' + leadingZero(i)].distance + oAgg[y]['m' + leadingZero(i-1)] : oAgg[y]['m' + leadingZero(i-1)];
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