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
	componentWillMount() {
		console.log(JSON.stringify(this.props, null, 2));
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.props);
	}

	handleCopy() {

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
							      	<FormControl type="text" value={this.props.valor_bruto} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do Juros</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.valor_juros} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Taxa de Juros</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={this.props.taxa_juros} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor da Tarifa Contratação</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.valor_contratacao} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor da Tarifa de Títulos</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.valor_tarifa} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do IOF</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.valor_iof} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup>
						      	<ControlLabel>Valor do Crédito (Líquido)</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.valor_liquido} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Fechar</Button>
							{ this.props.aceito ? 
								(<Button bsStyle="success" onClick={this.handleSaveAndClose.bind(this)} style={{margin: '5px'}} >Titulo Aceito</Button>) :
								(<Button bsStyle="danger" onClick={this.handleSaveAndClose.bind(this)} style={{margin: '5px'}} >Titulo Rejeitado</Button>)
							}
							
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}