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
} from 'react-bootstrap';

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

		console.log(JSON.stringify(state, null, 2))

		return(

	        <Modal.Dialog>
	          <Modal.Body style={{padding: '0px'}}>

	          	<Panel 
	          		header={'Borderô'} 
	          		bsStyle="primary" 
	          		style={{marginBottom: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} >

		   			<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_titulos') ? 'success' : 'error'} >
						      	<ControlLabel>Valor dos Títulos</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} name="valor_titulos" value={this.state.valor_titulos} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_operacao') ? 'success' : 'error'} >
						      	<ControlLabel>Valor da Tarifa Operação/Contratação</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} type="text" name="valor_operacao" value={this.state.valor_operacao} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_tarifa') ? 'success' : 'error'} >
						      	<ControlLabel>Valor da Tarifa de Títulos</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="valor_tarifa" value={this.state.valor_tarifa} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_juros') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do Juros</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} name="valor_juros" value={this.state.valor_juros} onChange={this.handleChange} />
								<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('taxa_juros') ? 'success' : 'error'} >
						      	<ControlLabel>Taxa de Juros</ControlLabel>
						      	<FormControl style={{textAlign: 'right'}} type="text" name="taxa_juros" value={this.state.taxa_juros} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_iof') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do IOF</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="valor_iof" value={this.state.valor_iof} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={6}>
							<FormGroup validationState={this.onValidate('valor_liquido') ? 'success' : 'error'} >
						      	<ControlLabel>Valor do Crédito (Líquido)</ControlLabel>
								<FormControl style={{textAlign: 'right'}} type="text" name="valor_liquido" value={this.state.valor_liquido} onChange={this.handleChange} />
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
									this.onValidate('valor_titulos') &&
									this.onValidate('valor_juros') &&
									this.onValidate('taxa_juros') &&
									this.onValidate('valor_operacao') &&
									this.onValidate('valor_tarifa') &&
									this.onValidate('valor_iof') &&
									this.onValidate('valor_liquido') && 
									state.valor_liquido === Number((state.valor_titulos - state.valor_operacao - state.valor_tarifa - state.valor_juros - state.valor_iof).toFixed(2)) /*&& 
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