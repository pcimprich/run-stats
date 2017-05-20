var React = require('react');
var prettyPeriod = require('../utils/auxiliary.js').prettyPeriod;

const RunStatsTabOverviewTable = (props) => {

	return (
        <table className="table table-bordered">
  		  	<thead>
  	        	<tr>
					<th></th>
  			  		<th>Jan</th>
					<th>Feb</th>
  		      		<th>Mar</th>
					<th>Apr</th>
					<th>May</th>
					<th>Jun</th>
					<th>Jul</th>
					<th>Aug</th>
					<th>Sep</th>
					<th>Oct</th>
					<th>Nov</th>
					<th>Dec</th>
  	        	</tr>
  		  	</thead>
  		  	<tbody>
	  			{Object.keys(props.overview).map((year, index) => {
					return (
						<tr key={year}>
							<td>{year}</td>
							<td>{props.overview[year].m1}</td>
							<td>{props.overview[year].m2}</td>
							<td>{props.overview[year].m3}</td>
							<td>{props.overview[year].m4}</td>
							<td>{props.overview[year].m5}</td>
							<td>{props.overview[year].m6}</td>
							<td>{props.overview[year].m7}</td>
							<td>{props.overview[year].m8}</td>
							<td>{props.overview[year].m9}</td>
							<td>{props.overview[year].m10}</td>
							<td>{props.overview[year].m11}</td>
							<td>{props.overview[year].m12}</td>
						</tr>
					);
				   }		
 			  	)}
			</tbody>
  		 </table>
	);
}

module.exports.Component = RunStatsTabOverviewTable;
