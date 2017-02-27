var React = require('react');
var conf = require('../../../config.json');

const RunStatsTabDashboardValues = (props) => {
	
 	return (
		<div>
			<div className="bg-primary pane pull-left indent-top2"><strong className="large">{props.val.distance}</strong> km</div>
			<div className="clearfix"/>
			<div className="bg-info pane pull-left indent-top"><strong className="large">{props.val.count}</strong> activities</div>
			<div className="clearfix"/>
			<div className="bg-success pane pull-left indent-top">{props.val.duration} <i className="fa fa-hourglass-end" aria-hidden="true"></i></div>
			<div className="clearfix"/>
			<div className="bg-success pane pull-left indent-top">{props.val.maxDistance} km max</div>
			<div className="clearfix"/>
			<div className="bg-success pane pull-left indent-top">{props.val.kcal} kcal</div>
			<div className="clearfix"/>
			<div className="bg-success pane pull-left indent-top">{props.val.elevation} m <i className="fa fa-arrow-up" aria-hidden="true"></i></div>
		</div>
  	);
}

module.exports.Component = RunStatsTabDashboardValues;