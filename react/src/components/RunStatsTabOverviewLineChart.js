var React = require('react');
var {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} = require('recharts');

const RunStatsTabOverviewLineChart = (props) => (

	<LineChart width={850} height={400} data={props.data}
		margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
	  	<CartesianGrid strokeDasharray="3 3" />
	  	<XAxis dataKey="name" />
	  	<YAxis />
	  	<Tooltip />
	  	<Legend />
	  	<Line type="monotone" dataKey="2014" stroke="#00008B" />
		<Line type="monotone" dataKey="2015" stroke="#006400" />
		<Line type="monotone" dataKey="2016" stroke="#8B008B" />
		<Line type="monotone" dataKey="2017" stroke="#8B0000" />
	</LineChart>
)

module.exports.Component = RunStatsTabOverviewLineChart;
