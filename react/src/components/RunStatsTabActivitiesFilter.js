var React = require('react');
var {Nav, NavItem} = require('react-bootstrap');
var setFilter = require('../actions/actions').setFilter;

class RunStatsTabActivitiesFilter extends React.Component {
	constructor(props) {
    	super(props);
		this.handleSelect = this.handleSelect.bind(this);
  	}
	
	handleSelect(key) {
		this.props.dispatch(setFilter(key));
	}
	
 	render() {
 		return (
			<div>
 				<Nav bsStyle="pills" pullLeft={true} activeKey={this.props.runs.filter.key} onSelect={this.handleSelect}>
    				<NavItem eventKey="yr:2017">2017</NavItem>
    				<NavItem eventKey="yr:2016">2016</NavItem>
					<NavItem eventKey="yr:2015">2015</NavItem>
					<NavItem eventKey="yr:2014">2014</NavItem>
					<NavItem eventKey="km:10">10km+</NavItem>
					<NavItem eventKey="km:15">15km+</NavItem>
				</Nav>
				<div className="pull-right bg-info pane">{this.props.runs.filter.count} activities</div>
			</div>
  		);
	}
}

module.exports.Component = RunStatsTabActivitiesFilter;