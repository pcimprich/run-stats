var React = require('react');
var connect = require('react-redux').connect;
var fetchTotal = require('../actions/actions').fetchTotal;

class RunStatsHeader extends React.Component {
	constructor(props) {
    	super(props);
  	}
	
	componentDidMount() {
		this.props.dispatch(fetchTotal());
	}
	
 	render() {
		const data = this.props.total.data;
		
		return (
			<div className="pull-right bg-primary pane">
				{data.count} activities, {data.distance} km
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		total: state.stats.total
	}
}

RunStatsHeader = connect(mapStateToProps, null)(RunStatsHeader);

module.exports.Component = RunStatsHeader;
