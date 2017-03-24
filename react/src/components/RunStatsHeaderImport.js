var React = require('react');
var connect = require('react-redux').connect;
var {Button, Modal, OverlayTrigger, Tooltip} = require('react-bootstrap');
var {runImport, openImportModal, closeImportModal, fetchRuns, fetchTotal} = require('../actions/actions');

class RunStatsHeaderImport extends React.Component {
	constructor(props) {
    	super(props);
		this.openImport = this.openImport.bind(this);
		this.closeImport = this.closeImport.bind(this);
  	}
	
    openImport() {
		this.props.dispatch(runImport());
		this.props.dispatch(openImportModal());
    }
	
	closeImport() {
		this.props.dispatch(closeImportModal());
		
		if (this.props.runs.newActivities) {
			this.props.dispatch(fetchRuns());
			this.props.dispatch(fetchTotal());
		}
	}
	
 	render() {
		const msg = this.props.runs.newActivities 
			? this.props.runs.newActivities + ' new activities have been imported.'
				: 'No new activities available.';
				
		const butonLabel = this.props.runs.newActivities ? 'Close and Reload' : 'Close';
		
		return (
			<div>
				<Button bsStyle="default" bsSize="small" onClick={this.openImport}>
					<i className="fa fa-upload fa-lg" aria-hidden="true"></i>
				</Button>
			
 		   		<Modal show={this.props.runs.showImportModal} onHide={this.closeImport} autoFocus>
          			<Modal.Header closeButton>
            			<Modal.Title>Import of new activities</Modal.Title>
          			</Modal.Header>
          			<Modal.Body>
						<p>{msg}</p>
          			</Modal.Body>
          			<Modal.Footer>
           	 			<Button bsStyle="primary" onClick={this.closeImport}>{butonLabel}</Button>
          			</Modal.Footer>
       	 		</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		runs: state.runs
	}
}

RunStatsHeaderImport = connect(mapStateToProps, null)(RunStatsHeaderImport);

module.exports.Component = RunStatsHeaderImport;
