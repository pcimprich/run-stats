var React = require('react');

const RunStatsTabActivitiesList = (props) => {
		
	const runFilter = (run) => {
		switch (props.runs.filter) {
			case 'yr:2017':
				return run.year == 2017 ? 1 : 0
			case 'yr:2016':
				return run.year == 2016 ? 1 : 0
			case 'yr:2015':
				return run.year == 2015 ? 1 : 0
			case 'yr:2014':
				return run.year == 2014 ? 1 : 0
			case 'km:10':
				return run.distance >= 10 ? 1 : 0
			case 'km:15':
				return run.distance >= 15 ? 1 : 0
			default:
				return 1
		}
	}

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
			  	{props.runs.items.filter((run) => runFilter(run)).map((run, index) => {
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
