var React = require('react');
var moment = require('moment');
var RunStatsTabDashboardPiechart = require('./RunStatsTabDashboardPiechart').Component;
var RunStatsTabDashboardValues = require('./RunStatsTabDashboardValues').Component;
var conf = require('../../../config.json');
var {currentPeriodValues} = require('../utils/auxiliary.js');

const RunStatsTabDashboardMonth = (props) => {
	
	const current = moment().year() + 'm' + (moment().month()+1);
	const val = currentPeriodValues(props.month, current);
	const ratio = 100 * val.distance / conf.goalMonthly;
	
	const data = [
		{name: 'Done', value: val.distance}, 
		{name: 'TBD', value: conf.goalMonthly <= val.distance ? 0 : conf.goalMonthly - val.distance}
	]
	const colors = ['#82ca9d', '#cacaca']
	
 	return (
		<div className="row">
			<div className="col-md-5">
				<h4>This Month <span className="ring">{ratio}%</span></h4>
				<RunStatsTabDashboardPiechart data={data} colors={colors}/>
			</div>
			<div className="col-md-5">
				<RunStatsTabDashboardValues val={val}/>
			</div>
	  	</div>
  	);
}

module.exports.Component = RunStatsTabDashboardMonth;