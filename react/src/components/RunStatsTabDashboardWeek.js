var React = require('react');
var moment = require('moment');
var RunStatsTabDashboardPiechart = require('./RunStatsTabDashboardPiechart').Component;
var RunStatsTabDashboardValues = require('./RunStatsTabDashboardValues').Component;
var conf = require('../../../config.json');
var {currentPeriodValues} = require('../utils/auxiliary.js');

const RunStatsTabDashboardWeek = (props) => {
	
	const current = moment().year() + 'w' + moment().isoWeek();
	const val = currentPeriodValues(props.week, current);
	const ratio = 100 * val.distance / conf.goalWeekly;
	
	const data = [
		{name: 'Done', value: val.distance}, 
		{name: 'TBD', value: conf.goalWeekly <= val.distance ? 0 : conf.goalWeekly - val.distance}
	]
	const colors = ['#82ca9d', '#cacaca']
	
 	return (
		<div className="row">
			<div className="col-md-5">
				<h4>This Week <span className="ring">{ratio}%</span></h4>
				<RunStatsTabDashboardPiechart data={data} colors={colors}/>
			</div>
			<div className="col-md-5">
				<RunStatsTabDashboardValues val={val}/>
			</div>
	  	</div>
  	);
}

module.exports.Component = RunStatsTabDashboardWeek;