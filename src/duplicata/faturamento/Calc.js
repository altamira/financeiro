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
import DatePicker from 'react-bootstrap-date-picker';

export default class Calcular extends Component {
  
  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Calcular Datas</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Calcular Datas...
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