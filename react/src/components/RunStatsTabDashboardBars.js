var React = require('react');
var {BarChart, Bar, XAxis, Cell, Text} = require('recharts');

const RunStatsTabDashboardBars = (props) => {
	
 	return (
		<BarChart width={480} height={150} data={props.data}>
		<XAxis dataKey="value" axisLine={false} tickLine={false}/>
        	<Bar dataKey='value'>
			{
		      props.data.map((entry, index) => (
		        <Cell key={`bar-${index}`} fill={index == 0 ? '#82ca9d' : '#428bca'}/>
		      ))
		    }
			</Bar>
      	</BarChart>
  	);
}

module.exports.Component = RunStatsTabDashboardBars;