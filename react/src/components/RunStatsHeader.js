var React = require('react');
var connect = require('react-redux').connect;
var RunStatsHeaderImport = require('./RunStatsHeaderImport').Component;
var fetchTotal = require('../actions/actions').fetchTotal;

class RunStatsHeader extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
	componentDidMount() {
		//this.props.dispatch(fetchTotal());
	}
	
 	render() {
		return (
			<div>
				<div className="pull-right controls">
					<RunStatsHeaderImport />
				</div>
				<div className="bg-primary pane pull-right">
					{this.props.total.count} activities, {this.props.total.distance} km
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		total: state.runs.grouped.all.total
	}
}

RunStatsHeader = connect(mapStateToProps, null)(RunStatsHeader);

module.exports.Component = RunStatsHeader;
