var React = require('react');
var moment = require('moment');
var RunStatsTabDashboardPiechart = require('./RunStatsTabDashboardPiechart').Component;
var RunStatsTabDashboardValues = require('./RunStatsTabDashboardValues').Component;
var RunStatsTabDashboardBars = require('./RunStatsTabDashboardBars').Component;
var conf = require('../../../config.json');
var {currentPeriodValues, recentKeysM} = require('../utils/auxiliary.js');

const RunStatsTabDashboardMonth = (props) => {
	
	const keys = recentKeysM(12);
	const val = currentPeriodValues(props.month, keys[0]);
	const ratio = 100 * val.distance / conf.goalMonthly;
	
	const data = [
		{name: 'Done', value: val.distance}, 
		{name: 'TBD', value: conf.goalMonthly <= val.distance ? 0 : conf.goalMonthly - val.distance}
	]
	
	const bars = keys.map((k) => { return {name: k, value: props.month[k] ? props.month[k].distance : 0} })
	
 	return (
		<div>
			<div className="row">
				<div className="col-md-7">
					<h4>This Month <span className="ring">{ratio}%</span></h4>
					<RunStatsTabDashboardPiechart data={data}/>
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

module.exports.Component = RunStatsTabDashboardMonth;