var React = require('react');
var connect = require('react-redux').connect;
var RunStatsTabOverviewTable = require('./RunStatsTabOverviewTable').Component;
var RunStatsTabOverviewLineChart = require('./RunStatsTabOverviewLineChart').Component;
var {l0} = require('../utils/auxiliary.js');

var RunStatsTabOverview  = (props) => {

	const data = props.runs.grouped.month;
	const oInd = {}; // each individual month
	const oAgg = {}; // aggregated since the beginning of year
	const gAgg = [];
	
	for (let y of Object.keys(props.runs.grouped.year)) {
		oInd[y] = {};
		oAgg[y] = {};
		oInd[y].m01 = data[y + 'm01'] ? data[y + 'm01'].distance : '-';
		oAgg[y].m01 = data[y + 'm01'] ? data[y + 'm01'].distance : 0;
		
		for (let i = 2; i <= 12; i++) {
			oInd[y]['m' + l0(i)] = data[y + 'm' + l0(i)] ? data[y + 'm' + l0(i)].distance : '-';
			oAgg[y]['m' + l0(i)] = oInd[y]['m' + l0(i)] != '-' ? data[y + 'm' + l0(i)].distance + oAgg[y]['m' + l0(i-1)] : '-';
		}
	}
	
	const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	for (let m of months) {
		var Month = {name: m};
		for (let y of Object.keys(props.runs.grouped.year)) {
			if (oAgg[y]['m' + m]) Month[y] = oAgg[y]['m' + m]; 
		}
		gAgg.push(Month);
	}
	
	//console.log(gAgg);
		
	return (
		<div className="tabContent">
			<RunStatsTabOverviewTable overview={oInd} target="100" />
			<RunStatsTabOverviewLineChart data={gAgg} />
			<RunStatsTabOverviewTable overview={oAgg} target="1000" />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabOverview = connect(mapStateToProps, null)(RunStatsTabOverview);

module.exports.Component = RunStatsTabOverview;