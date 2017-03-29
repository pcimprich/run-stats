var React = require('react');
var {PieChart, Pie, Cell} = require('recharts');

const RunStatsTabDashboardPiechart = (props) => {
	
	const colors = ['#82ca9d', '#cacaca']
	
 	return (
		<PieChart width={280} height={210}>
			<Pie data={props.data} innerRadius={30} outerRadius={90} startAngle={180} endAngle={-180}>
				<Cell fill={colors[0]}/>
				<Cell fill={colors[1]}/>
			</Pie>
		</PieChart>
  	);
}

module.exports.Component = RunStatsTabDashboardPiechart;