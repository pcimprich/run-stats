var React = require('react');
var connect = require('react-redux').connect;
var fetchRuns = require('../actions/actions').fetchRuns;
var RunStatsTabActivitiesFilter = require('./RunStatsTabActivitiesFilter').Component;

class RunStatsTabActivities extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
	componentDidMount() {
		this.props.dispatch(fetchRuns());
	}
	
 	render() {

		return (
		<div className="tabContent">
			<RunStatsTabActivitiesFilter runs={this.props.runs} dispatch={this.props.dispatch}/>
        	<table className="table table-striped">
  		  		<thead>
  	        		<tr>
						<th></th>
  		      			<th className="right">Date</th>
  			  			<th className="right">Distance</th>
  		      			<th className="right">Duration</th>
						<th className="right">Avg Pace</th>
						<th className="right">Elevation Gain</th>
						<th className="right">Energy</th>
						<th></th>
  	        		</tr>
  		  		</thead>
  		  		<tbody>
			  		{this.props.runs.items.filter((run) => { return 1 }).map((run, index) => {
						var duration = run.duration.replace(/^00:/, '');
						duration = duration.replace(/^0/, '');
						
						const pace = run.pace.replace(/^00:/, '');
						
						var sourceImg = 'watch'; //Garmin
						if (run.source == 'Runtastic') sourceImg = 'phone_iphone'; //Runtastic
						if (run.source == 'Manual') sourceImg = 'pan_tool'; //Manual
						
						return (
							<tr key={run.id}>
			      	  			<td><i className="material-icons">directions_run</i> Run</td>
								<td className="right">{run.date}</td>
			      	  			<td className="right">{run.distance} km</td>
			      	  			<td className="right">{duration}</td>
								<td className="right">{pace}</td>
								<td className="right">{run.elevation} m</td>
								<td className="right">{run.kcal} kcal</td>
								<td className="right"><i className="material-icons">{sourceImg}</i></td>
							</tr>
						);
					}	
		 	  )}
			</tbody>
  		  </table>
		</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabActivities = connect(mapStateToProps, null)(RunStatsTabActivities);

module.exports.Component = RunStatsTabActivities;
