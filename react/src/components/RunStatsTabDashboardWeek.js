var React = require('react');
var moment = require('moment');
var RunStatsTabDashboardPiechart = require('./RunStatsTabDashboardPiechart').Component;
var RunStatsTabDashboardValues = require('./RunStatsTabDashboardValues').Component;
var RunStatsTabDashboardBars = require('./RunStatsTabDashboardBars').Component;
var conf = require('../../../config.json');
var {currentPeriodValues, recentKeysW} = require('../utils/auxiliary.js');

const RunStatsTabDashboardWeek = (props) => {
	
	const keys = recentKeysW(10);
	const val = currentPeriodValues(props.week, keys[0]);
	const ratio = 100 * val.distance / conf.goalWeekly;
	
	const data = [
		{name: 'Done', value: val.distance}, 
		{name: 'TBD', value: conf.goalWeekly <= val.distance ? 0 : conf.goalWeekly - val.distance}
	]
	const colors = ['#82ca9d', '#cacaca']
	
	const bars = keys.map((k) => { return {name: k, value: props.week[k] ? props.week[k].distance : 0} })
	
 	return (
		<div>
			<div className="row">
				<div className="col-md-5">
					<h4>This Week <span className="ring">{ratio}%</span></h4>
					<RunStatsTabDashboardPiechart data={data} colors={colors}/>
				</div>
				<div className="col-md-5">
					<RunStatsTabDashboardValues val={val}/>
				</div>
	  		</div>
			<div className="row">
				<RunStatsTabDashboardBars data={bars}/>
			</div>
		</div>
  	);
}

module.exports.Component = RunStatsTabDashboardWeek;