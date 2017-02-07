import api from './../api/'

import format from 'number-format.js';

import React, { Component } from 'react';

import {  
  Col, 
  Row, 
  Table,
  Modal,
  Button,
  Glyphicon
} from 'react-bootstrap';

import Spinner from 'react-spinkit';

export default class Buscar extends Component {
	constructor(props) {
		super(props);

		this.state = {

			data: new Date().toISOString(),
			descricao: '',

			conta: this.props.conta

		}

		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleEdit = this.handleEdit.bind(this);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleResult = this.handleResult.bind(this);
	}

	componentWillMount(){
		this.handleSearch()
	}

	handleChangeData(data) {
		this.setState({data : data});
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	// Validações
	onValidateDate(propriedade) {
		var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(201[7-9]|202[0-9])$/;
		return regex.test(new Date(this.state[propriedade]).toLocaleDateString());
	}

	onValidateMoney(propriedade) {
		var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{2}$/;
		return regex.test(this.state[propriedade]) && this.state[propriedade].length <= 10;
	}

	handleEdit(item) {
		this.props.onSelect && this.props.onSelect({
			...item,
			data: new Date(item.data).fromUTC().toISOString(),
			documento: item.documento || ''
		});
	}

	handleSearch() {
		if (this.state.conta.banco && 
			this.state.conta.agencia &&
			this.state.conta.conta) {
			this.setState({
				isLoading: true
			}, api.cc.movimento.search.bind(null, this.state.conta.banco, this.state.conta.agencia, this.state.conta.conta, true, this.handleResult.bind(this)) )
		}
	}

	handleResult(lista) {
		if (!Array.isArray(lista) || !lista.length) {
			this.setState({
				isLoading: undefined
			}, window.errHandler.bind(null, {erro: 0, mensagem: 'Nenhum lançamento encontrado.'}) )
		} else {
			this.setState({lista: lista, isLoading: undefined})
		}
	}

	render() {

		return(

			<div className="static-modal">
		        <Modal.Dialog bsSize="large" >
		          <Modal.Header>
		            <Modal.Title>Buscar Lançamento</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>

	                  {/*<Row>

						<Col md={4}>Data</Col>
	                    <Col md={4}>
	                      <FormGroup>
	                        <DatePicker name="data" value={this.state.data} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} onChange={this.handleChangeData} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>

	                  </Row>

	                  <Row>

	                  	<Col md={4}>Documento</Col>
	                    <Col md={4}>
	                      <FormGroup>
	                        <FormControl type="text" id="documento" value={this.state.documento} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>

	                  </Row>

	                  <Row>
	                    <Col md={4}>Descrição</Col>
	                    <Col md={8}>
	                      <FormGroup>
	                        <FormControl type="text" id="descricao" value={this.state.descricao} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>
	                  </Row>*/}

					<Row>
	                    <Col md={12}>
	                    	<div  style={{
	                    		height: '400px',
	                    			
								    overflowX: 'hidden',
								    overflowY: 'auto'
								}}
							>

								<Table striped bordered condensed hover>
								    <thead>
								      <tr>
								      	<th>#</th>
								        <th>Lançado</th>
								        <th>Liquidação</th>
								        <th>Descricao</th>
								        <th>Documento</th>
								        <th>Liquidado</th>
								        <th>Valor</th>
								        <th style={{textAlign: 'center', width: 20}}></th>
								      </tr>
								    </thead>
								    <tbody>
									    {this.state.lista && this.state.lista.map( (item, index) =>
									      <tr style={{cursor: 'pointer'}} key={item.id} >
									      	<td>{index + 1}</td>
									        <td>{new Date(item.data).fromUTC().toLocaleDateString()}</td>
									        <td>{item.liquidacao && new Date(item.liquidacao).fromUTC().toLocaleDateString()}</td>
									        <td>{item.descricao}</td>
									        <td>{item.documento}</td>
									        <td style={{textAlign: 'center'}}>
					                          {item.liquidado ? (<Glyphicon glyph="ok" />) : (<Glyphicon glyph="dot" />) }
					                        </td>
									        <td style={{textAlign: 'right', whiteSpace: 'nowrap'}}>{format('R$ ###.###.##0,00', item.valor)}</td>
									        <td>
					                          <Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={this.handleEdit.bind(null, item)} ><Glyphicon glyph="edit" /></Button>
					                        </td>
									      </tr>
									    )}
									</tbody>
	  							</Table>

	  							{this.state.isLoading && 
									<div style={{textAlign: 'center'}}>
										<Spinner spinnerName="three-bounce" />
									</div>
								}

	  						</div>
		                </Col>
	                </Row>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button onClick={this.props.onClose} >Fechar</Button>
		            {/*<Button 
		            	bsStyle="primary" 
		            	onClick={this.handleSearch}
		            	disabled={!(
							this.onValidateDate('data') &&
							this.state.conta.banco.length &&
							this.state.conta.agencia.length &&
							this.state.conta.conta.length 
						)} 
		            >Visualizar
		            </Button>*/}
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}