var React = require('react');
var {BarChart, Bar, XAxis} = require('recharts');

const RunStatsTabDashboardBars = (props) => {
	
 	return (
		<BarChart width={400} height={150} data={props.data}>
		<XAxis dataKey="value" axisLine={false} tickLine={false}/>
        	<Bar dataKey='value' fill='#428bca'/>
      	</BarChart>
  	);
}

module.exports.Component = RunStatsTabDashboardBars;