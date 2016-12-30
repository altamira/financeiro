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

import moment from 'moment';

import CopyToClipboard from 'react-copy-to-clipboard';
import DatePicker from 'react-bootstrap-date-picker';

export default class Bordero extends Component {
	constructor(props) {
		super(props);

		this.state = props.bordero;

		this.handleChange = this.handleChange.bind(this);
		this.onValidate = this.onValidate.bind(this);
		this.parseStateToFloatNumbers = this.parseStateToFloatNumbers.bind(this);
	}

	componentWillMount() {
		console.log(JSON.stringify(this.state, null, 2));
	}

	parseStateToFloatNumbers() {
		return Object.keys(this.state).reduce( (newState, key) => 
			{
				newState[key] = parseFloat(Number(this.state[key].toString().replace(',', '-').replace('.', '').replace('-', '.')).toFixed(2));
				return newState;
			}
		, {})
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.parseStateToFloatNumbers());
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	onValidate(propriedade) {
	    var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{2}$/;
	    return regex.test(this.state[propriedade]) && this.state[propriedade].length < 10;
	}

	render() {

		let state = this.parseStateToFloatNumbers();

		console.log(JSON.stringify({
			valor_bruto: state.valor_bruto, 
			valor_liquido: state.valor_bruto - state.valor_operacao - state.valor_tarifa - state.valor_juros - state.valor_iof,
			valor_liquido: state.valor_liquido, 
			valor_operacao: state.valor_operacao,
			valor_tarifa: state.valor_tarifa,
			valor_iof: state.valor_iof,
			valor_juros: state.valor_juros,
			taxa_juros: this.state.carteira.taxa_juros,
		}, null, 2))

		return(

	        <Modal.Dialog>
	          <Modal.Body style={{padding: '0px'}}>

	          	<Panel 
	          		header={'Borderô'} 
	          		bsStyle="primary" 
	          		style={{marginBottom: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} >

		   			<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('bruto') ? 'success' : 'error'} >
						      	<ControlLabel>Valor Títulos (Bruto)</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} name="valor_bruto" readOnly value={this.state.valor_bruto} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('operacao') ? 'success' : 'error'} >
						      	<ControlLabel>Valor da Tarifa Operação/Contratação</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} type="text" name="valor_operacao" value={this.state.valor_operacao} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('tarifa') ? 'success' : 'error'} >
						      	<ControlLabel>Valor da Tarifa de Títulos</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="valor_tarifa" value={this.state.valor_tarifa} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('juros') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do Juros</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} name="valor_juros" value={this.state.valor_juros} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('taxa') ? 'success' : 'error'} >
						      	<ControlLabel>Taxa de Juros</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} type="text" name="taxa_juros" value={this.state.taxa_juros} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('iof') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do IOF</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="iof" value={this.state.valor_iof} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('liquido') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do Crédito (Líquido)</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="liquido" value={this.state.valor_liquido} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Cancelar</Button>
							<Button 
								bsStyle="success" 
								onClick={this.handleSaveAndClose.bind(this)} 
								disabled={!(
									this.onValidate('bruto') &&
									this.onValidate('juros') &&
									this.onValidate('taxa') &&
									this.onValidate('operacao') &&
									this.onValidate('tarifa') &&
									this.onValidate('iof') &&
									this.onValidate('liquido') && 
									state.valor_liquido === state.valor_bruto - state.valor_operacao - state.valor_tarifa - state.valor_juros - state.valor_iof /*&& 
									state.iof === state.bruto * (state.taxa / 100) */
								)} style={{margin: '5px'}} >Emitir Borderô</Button>							
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}