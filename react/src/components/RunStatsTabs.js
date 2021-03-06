var React = require('react');
var connect = require('react-redux').connect;
var {Tabs, Tab} = require('react-bootstrap');
var RunStatsTabDashboard = require('./RunStatsTabDashboard').Component;
var RunStatsTabActivities = require('./RunStatsTabActivities').Component;
var RunStatsTabStatistics = require('./RunStatsTabStatistics').Component;
var RunStatsTabOverview = require('./RunStatsTabOverview').Component;
var setTabs = require('../actions/actions').setTabs;

var RunStatsTabs = (props) => (

	<Tabs activeKey={props.tab} onSelect={props.onSelect} id="competition-tabs">
    	<Tab eventKey="dsh" title="Dashboard">
			<RunStatsTabDashboard />
		</Tab>
       	<Tab eventKey="act" title="Activities">
			<RunStatsTabActivities />
		</Tab>
        <Tab eventKey="sta" title="Statistics">
		    <RunStatsTabStatistics />
		</Tab>
        <Tab eventKey="ovw" title="Overview">
		    <RunStatsTabOverview />
		</Tab>
	</Tabs>
)

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