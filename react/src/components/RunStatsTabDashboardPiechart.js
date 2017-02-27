var React = require('react');
var {PieChart, Pie, Cell} = require('recharts');

const RunStatsTabDashboardPiechart = (props) => {
	
 	return (
		<PieChart width={280} height={210}>
			<Pie data={props.data} innerRadius={30} outerRadius={80} startAngle={180} endAngle={-180} fill="#82ca9d">
				<Cell fill={props.colors[0]}/>
				<Cell fill={props.colors[1]}/>
			</Pie>
		</PieChart>
  	);
}

module.exports.Component = RunStatsTabDashboardPiechart;