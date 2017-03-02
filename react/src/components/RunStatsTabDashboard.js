var React = require('react');
var connect = require('react-redux').connect;
var fetchRuns = require('../actions/actions').fetchRuns;
var RunStatsTabDashboardWeek = require('./RunStatsTabDashboardWeek').Component;
var RunStatsTabDashboardMonth = require('./RunStatsTabDashboardMonth').Component;

class RunStatsTabDashboard extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
	componentDidMount() {
		this.props.dispatch(fetchRuns());
	}
	
 	render() {
		return (
			<div className="row tabContent">
  	  			<div className="col-md-5 dashboard">
					<RunStatsTabDashboardWeek week={this.props.runs.groupedByWeek}/>
				</div>
  	  			<div className="col-md-5 dashboard">
					<RunStatsTabDashboardMonth month={this.props.runs.groupedByMonth}/>
				</div>
			</div>
  		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsTabDashboard = connect(mapStateToProps, null)(RunStatsTabDashboard);

module.exports.Component = RunStatsTabDashboard;