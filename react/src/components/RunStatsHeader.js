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
			<div>
				<div className="pull-right controls">
					<button className="btn btn-default btn-sm" type="button">
						<i className="fa fa-upload fa-lg" aria-hidden="true"></i>
					</button>
				</div>
				<div className="bg-primary pane pull-right">
					{data.count} activities, {data.distance} km
				</div>
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
