var React = require('react');
var prettyPeriod = require('../utils/auxiliary.js').prettyPeriod;

const RunStatsTabStatisticsList = (props) => {

	return (
        <table className="table table-striped">
  		  	<thead>
  	        	<tr>
					<th></th>
  			  		<th className="right">Distance</th>
					<th className="right">Activities</th>
  		      		<th className="right">Duration</th>
					<th className="right">Elevation Gain</th>
					<th className="right">Energy</th>
					<th className="right">Maximal Distance</th>
					<th></th>
  	        	</tr>
  		  	</thead>
  		  	<tbody>
			  	{Object.keys(props.runs.grouped[props.runs.stats]).map((period, index) => {
					const data = props.runs.grouped[props.runs.stats][period];
					var duration = data.duration.replace(/^00:/, '');
					duration = duration.replace(/^0/, '');
					return (
						<tr key={period}>
							<td>{prettyPeriod(period)}</td>
							<td className="right">{data.distance} km</td>
			      	  		<td className="right">{data.count}</td>
			      	  		<td className="right">{duration}</td>
							<td className="right">{data.elevation} m</td>
							<td className="right">{data.kcal} kcal</td>
							<td className="right">{data.maxDistance} km</td>
						</tr>
					);
				}	
		 	 )}
			</tbody>
  		 </table>
	);
}

module.exports.Component = RunStatsTabStatisticsList;
