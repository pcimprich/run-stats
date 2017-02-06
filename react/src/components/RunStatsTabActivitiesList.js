var React = require('react');
var runFilter = require('../utils/filters').runFilter;

const RunStatsTabActivitiesList = (props) => {

	return (
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
			  	{props.runs.items.filter((run) => runFilter(run, props.runs.filter.key)).map((run, index) => {
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
	);
}

module.exports.Component = RunStatsTabActivitiesList;
