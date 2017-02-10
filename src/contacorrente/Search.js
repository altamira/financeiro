import api from './../api/'

import format from 'number-format.js';

import React, { Component } from 'react';

import {  
  Col, 
  Row, 
  Table,
  Modal,
  Button,
  Glyphicon,
  FormControl
} from 'react-bootstrap';

import Spinner from 'react-spinkit';

export default class Buscar extends Component {
	constructor(props) {
		super(props);

		this.state = {

			data: new Date().toISOString(),
			descricao: '',

			conta: this.props.conta,

			search: ''

		}

		this.handleChange = this.handleChange.bind(this);

		this.handleEdit = this.handleEdit.bind(this);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleResult = this.handleResult.bind(this);

		this.handleLiquidar = this.handleLiquidar.bind(this);
    	this.handleLiquidado = this.handleLiquidado.bind(this);

	}

	componentWillMount(){
		this.handleSearch()
	}

	handleChange(event) {
		this.setState({search: event.target.value.toUpperCase()});
	}

	handleEdit(item) {
		this.props.onEdit && this.props.onEdit({
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

	handleResult(movimento) {
		if (!Array.isArray(movimento) || !movimento.length) {
			this.setState({
				isLoading: undefined
			}, window.errHandler.bind(null, {erro: 0, mensagem: 'Nenhum lançamento encontrado.'}) )
		} else {
			this.setState({movimento: movimento, isLoading: undefined})
		}
	}

	handleLiquidar(lancamento) {
		api.cc.movimento.liquidar({
		  ...lancamento,
		  liquidado: !lancamento.liquidado
		}, this.handleLiquidado.bind(null, lancamento))
	}

	handleLiquidado(original, liquidado) {
		liquidado.liquidado = !!liquidado.liquidado

		let movimento = this.state.movimento;
		let index = movimento.findIndex( l => l.id === liquidado.id)

		movimento[index] = liquidado
		this.setState({
		  movimento: movimento, 
		  dialog: undefined
		}, this.props.onLiquidado.bind(null, original, liquidado))
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

	                <Row style={{marginBottom: '10px'}}>
		              <Col md={12}><h5>Banco: {this.state.conta.banco}, Empresa: {this.state.conta.agencia}, Conta: {this.state.conta.conta}</h5></Col>
		            </Row>

					<Row style={{marginBottom: '10px'}}>

		              <Col md={2}>Busca</Col>
		              <Col md={10}>
		                  <FormControl type="text" name="documento" value={this.state.search} onChange={this.handleChange} />
		              </Col>

		            </Row>

					<Row>
	                    <Col md={12}>
	                    	<div  style={{
	                    		height: '300px',
	                    			
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
									    {this.state.movimento && this.state.movimento
									    	.filter( item => this.state.search.trim().length === 0 || 
									    		new Date(item.data).fromUTC().toLocaleDateString().search(this.state.search.toUpperCase()) >= 0 ||
									    		item.descricao.toUpperCase().search(this.state.search.toUpperCase()) >= 0 ||
								    			item.documento.toUpperCase().search(this.state.search.toUpperCase()) >= 0 ||
								    			item.valor.toFixed(2).replace('.', ',').toUpperCase().search(this.state.search.toUpperCase()) >= 0
								    		)
									    	.map( (item, index) =>
									      <tr style={{cursor: 'pointer'}} key={item.id} >
									      	<td>{index + 1}</td>
									        <td>{new Date(item.data).fromUTC().toLocaleDateString()}</td>
									        <td>{item.liquidacao && new Date(item.liquidacao).fromUTC().toLocaleDateString()}</td>
									        <td>{item.descricao}</td>
									        <td style={{textAlign: 'center'}}>{item.documento}</td>
									        <td style={{textAlign: 'center'}}>
				                            	{item.liquidado ?
				                              		(<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidar.bind(null, item)} ><Glyphicon glyph="ok" /></Button>) :                                 
				                              		(<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidar.bind(null, item)} ><Glyphicon glyph="dot" /></Button>)
				                            	}
				                          	</td>
									        <td style={{textAlign: 'right', whiteSpace: 'nowrap', color: item.valor < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', item.valor)}</td>
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