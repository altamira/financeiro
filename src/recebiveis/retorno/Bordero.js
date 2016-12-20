import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Panel,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import CopyToClipboard from 'react-copy-to-clipboard';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

export default class Bordero extends Component {
	constructor(props) {
		super(props);

		this.state = props.bordero;

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		console.log(JSON.stringify(this.state, null, 2));
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.state);
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	render() {

		return(

	        <Modal.Dialog>
	          <Modal.Body style={{padding: '0px'}}>

	          	<Panel 
	          		header={'Borderô'} 
	          		bsStyle="primary" 
	          		style={{marginBottom: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} >

		   			<Row>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor Títulos (Bruto)</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" name="bruto" value={this.state.bruto} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do Juros</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" name="juros" value={this.state.juros} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Taxa de Juros</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" name="taxa" value={this.state.taxa} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor da Tarifa Operação/Contratação</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" name="operacao" value={this.state.operacao} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor da Tarifa de Títulos</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="tarifa" value={this.state.tarifa} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do IOF</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="iof" value={this.state.iof} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do Crédito (Líquido)</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="liquido" value={this.state.liquido} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Cancelar</Button>
							<Button bsStyle="success" onClick={this.handleSaveAndClose.bind(this)} style={{margin: '5px'}} >Emitir Borderô</Button>							
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}