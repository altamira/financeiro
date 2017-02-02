import api from './../api/'

import format from 'number-format.js';

import React, { Component } from 'react';

import {  
  Col, 
  Row, 
  FormGroup,
  FormControl,
  Table,
  Modal,
  Button
} from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';

const BrazilianDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const BrazilianMonthLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Octubro', 'Novembro', 'Dezembro'];

export default class Buscar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: new Date().toISOString(),
			conta: {},
			descricao: ''
		}

		// conta
    	this.handleSelectConta = this.handleSelectConta.bind(this);

		this.handleClose = this.handleClose.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.loadContas = this.loadContas.bind(this);
	}

	componentWillMount() {
		api.cc.conta.list(this.loadContas);
	}

	loadContas(contas) {
		if (contas.length) {
		  this.setState({conta: contas[0], contas: contas})  
		}
	}

	handleSelectConta(element) {
		this.setState({conta: this.state.contas[parseInt(element.target.value, 10)]});
	}

	handleClose() {
		this.onClose && this.onClose();
	}

	handleSelect(item) {
		this.props.onSelect && this.props.onSelect(item);
	}

	handleSearch() {
		api.cc.movimento.list(this.state.conta, false, this.loadResult.bind(this))
	}

	loadResult(lista) {
		this.setState({lista: lista})
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Buscar Lançamento</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>

	                  <Row>

						<Col md={4}>Data</Col>

	                    <Col md={4}>
	                      <FormGroup>
	                        {/*<ControlLabel>Data</ControlLabel>*/}
	                        <DatePicker name="data" value={this.state.data} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} onChange={this.handleChangeData} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>

	                  </Row>

	                  <Row>

	                  	<Col md={4}>Cheque</Col>

	                    <Col md={4}>
	                      <FormGroup>
	                        {/*<ControlLabel>Cheque</ControlLabel>*/}
	                        <FormControl type="text" id="cheque" value={this.state.cheque} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>

	                  </Row>

	                  <Row>
	                    	<Col md={4}>Conta</Col>
	                    	<Col md={8}>
			                <FormGroup validationState={'success'} >
			                  <FormControl name="origem" componentClass="select" placeholder="Conta Corrente" value={this.state.conta} onChange={this.handleSelectConta} >
			                  {this.state.contas && this.state.contas.map( (conta, index) =>
			                    <option key={'option-' + index} value={index}>{conta.codigo} {conta.nome} {conta.agencia} {conta.conta}</option>
			                  )}
			                  </FormControl>
			                </FormGroup>
			              </Col>
	                  </Row>

	                  <Row>
	                    <Col md={4}>Descrição</Col>
	                    <Col md={8}>
	                      <FormGroup>
	                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
	                        <FormControl type="text" id="nome" value={this.state.nome} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>
	                  </Row>

					<Row>
	                    <Col md={12}>
							<Table striped bordered condensed hover>
							    <thead>
							      <tr>
							        <th>Data</th>
							        <th>Descricao</th>
							        <th>Cheque</th>
							        <th>Liquidado</th>
							        <th>Valor</th>
							      </tr>
							    </thead>
							    <tbody>
								    {this.state.lista && this.state.lista.map( item =>
								      <tr style={{cursor: 'pointer'}} key={item.sequencia} onClick={this.handleSelect.bind(null, item)}>
								        <td>{new Date(item.data).toLocaleDateString()}</td>
								        <td>{item.descricao}</td>
								        <td>{item.cheque}</td>
								        <td>{item.liquidado}</td>
								        <td>{format('R$ ###.###.##0,00', item.valor)}</td>
								      </tr>
								    )}
								</tbody>
  							</Table>
		                </Col>
	                </Row>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button onClick={this.props.onClose} >Fechar</Button>
		            <Button bsStyle="primary" onClick={this.handleSearch}>Buscar</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}