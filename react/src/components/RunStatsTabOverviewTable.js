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
	  			{Object.keys(props.overview).sort((a,b)=>(a < b ? 1 : -1)).map((year, index) => {
					return (
						<tr key={year}>
							<td>{year}</td>
							<td>{props.overview[year].m01}</td>
							<td>{props.overview[year].m02}</td>
							<td>{props.overview[year].m03}</td>
							<td>{props.overview[year].m04}</td>
							<td>{props.overview[year].m05}</td>
							<td>{props.overview[year].m06}</td>
							<td>{props.overview[year].m07}</td>
							<td>{props.overview[year].m08}</td>
							<td>{props.overview[year].m09}</td>
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
