var React = require('react');
var prettyPeriod = require('../utils/auxiliary.js').prettyPeriod;

const RunStatsTabOverviewTable = (props) => {
	
	const data = props.runs.grouped.month;
 	const oInd = {}; // each individual month
	const oAgg = {}; // aggregated since the beginning of year
 	for (let y of Object.keys(props.runs.grouped.year)) {
		oInd[y] = {};
		oAgg[y] = {};
		oInd[y].m1 = data[y + 'm1'] ? data[y + 'm1'].distance : '-';
		oAgg[y].m1 = data[y + 'm1'] ? data[y + 'm1'].distance : 0;
		for (let i = 2; i <= 12; i++) {
			oInd[y]['m' + i] = data[y + 'm' + i] ? data[y + 'm' + i].distance : '-';
			oAgg[y]['m' + i] = data[y + 'm' + i] ? data[y + 'm' + i].distance + oAgg[y]['m' + (i-1)] : oAgg[y]['m' + (i-1)];
		}
 	}

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
					<th>total</th>
  	        	</tr>
  		  	</thead>
  		  	<tbody>
	  			{Object.keys(oInd).map((year, index) => {
					return (
						<tr key={year}>
							<td>{year}</td>
							<td>{oInd[year].m1}</td>
							<td>{oInd[year].m2}</td>
							<td>{oInd[year].m3}</td>
							<td>{oInd[year].m4}</td>
							<td>{oInd[year].m5}</td>
							<td>{oInd[year].m6}</td>
							<td>{oInd[year].m7}</td>
							<td>{oInd[year].m8}</td>
							<td>{oInd[year].m9}</td>
							<td>{oInd[year].m10}</td>
							<td>{oInd[year].m11}</td>
							<td>{oInd[year].m12}</td>
						</tr>
					);
				   }		
 			  	)}
			</tbody>
  		 </table>
	);
}

module.exports.Component = RunStatsTabOverviewTable;
