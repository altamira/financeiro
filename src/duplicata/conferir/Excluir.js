import React, { Component } from 'react';

import { 
  PageHeader, 
  ButtonGroup, 
  OverlayTrigger, 
  Button, 
  Popover, 
  Glyphicon, 
  Panel, 
  ListGroup, 
  ButtonToolbar, 
  Col, 
  Row, 
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Checkbox,
  Tooltip,
  Modal
} from 'react-bootstrap';

export default class Excluir extends Component {
	
	render() {

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Excluir</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>
		            Excluir Duplicatas...
		          </Modal.Body>

		          <Modal.Footer>
		            <Button onClick={this.props.onClose} >Close</Button>
		            <Button bsStyle="primary">Save changes</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}		