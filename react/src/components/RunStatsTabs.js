var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var RunStatsTabActivities = require('./RunStatsTabActivities').Component;
var RunStatsTabStatistics = require('./RunStatsTabStatistics').Component;
var setTabs = require('../actions/actions').setTabs;

class RunStatsTabs extends React.Component {
	constructor() {
    	super();
  	}
	
	render() {
	  return (
 	    <Tabs activeKey={this.props.tab} onSelect={this.props.onSelect} id="competition-tabs">
        	<Tab eventKey="act" title="Activities">
		    	<RunStatsTabActivities />
		  	</Tab>
          	<Tab eventKey="sta" title="Statistics">
		       	<RunStatsTabStatistics />
		  	</Tab>
       	</Tabs>
	  );
  	}
}

const mapStateToProps = (state) => {
	return {
		tab: state.tab
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSelect: (key) => {
			dispatch(setTabs(key))
		}
	}
}

RunStatsTabs = connect(mapStateToProps, mapDispatchToProps)(RunStatsTabs);

module.exports.Component = RunStatsTabs;