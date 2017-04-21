var React = require('react');
var {Nav, NavItem} = require('react-bootstrap');
var setStats = require('../actions/actions').setStats;

class RunStatsTabStatisticsType extends React.Component {
	constructor(props) {
    	super(props);
		this.handleSelect = this.handleSelect.bind(this);
  	}
	
	handleSelect(key) {
		this.props.dispatch(setStats(key));
	}
	
 	render() {
 		return (
			<div>
 				<Nav bsStyle="pills" pullLeft={true} activeKey={this.props.runs.stats} onSelect={this.handleSelect}>
    				<NavItem eventKey="week">Weeks</NavItem>
    				<NavItem eventKey="month">Months</NavItem>
					<NavItem eventKey="year">Years</NavItem>
					<NavItem eventKey="all">Total</NavItem>
				</Nav>
			</div>
  		);
	}
}

module.exports.Component = RunStatsTabStatisticsType;