import api from './../../api/'

import format from 'number-format.js';

import React, { Component } from 'react';

import {  
  Col, 
  Row, 
  Table,
  Button,
  Glyphicon,
  Panel
} from 'react-bootstrap';

import Spinner from 'react-spinkit';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recebiveis: [
				{
					"nosso_numero": "",
					"numero": 0,
					"emissao": "2017-01-06T00:00:00.000Z",
					"entrega": "2017-02-25T00:00:00.000Z",
					"condicao": "13 ",
					"cliente": {
					  "cnpj": "",
					  "inscricao": "",
					  "fantasia": "",
					  "nome": "",
					  "logradouro": "R",
					  "endereco": "",
					  "numero": "",
					  "complemento": "",
					  "bairro": "",
					  "municipio": 0,
					  "cidade": "",
					  "CEP": "",
					  "UF": "",
					  "ddd": "",
					  "telefone": "",
					  "contato": "",
					  "conta_contabil": ""
					},
					"representante": {
					  "codigo": "",
					  "nome": "",
					  "comissao": 0
					},
					"totais": {
					  "produtos": 0,
					  "ipi": 0,
					  "total": 0
					},
					"parcelas": []
				}
			]
		}

		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillMount(){
		api.consulta.lancamentos.get.bind(null, this.handleResult.bind(this))
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

	handleResult(result) {
		if (!Array.isArray(result) || !result.length) {
			this.setState({
				isLoading: undefined
			}, window.errHandler.bind(null, {erro: 0, mensagem: 'Nenhum lançamento encontrado.'}) )
		} else {
			this.setState({recebiveis: result, isLoading: undefined})
		}
	}

	render() {

		let origem = {
	      VENDA: 'Venda de Produto',
	      DIFAL: 'Diferencial de ICMS'
	    }

	    let forma_pagto = {
	      COBRANCA: 'Cobrança Bancária',
	      DEPOSITO: 'Depósito Bancário',
	      BNDES: 'Cartão BNDES',
	      CHEQUE: 'Cheque',
	      DINHEIRO: 'Dinheiro'
	    }

	    let tipo_vencto = {
	      DDP: 'Dia(s) do Pedido',
	      DDL: 'Dia(s) da Entrega',
	      DDM: 'Dia(s) da Montagem'
	    }

		return(

			<div>

		        <Panel header={'Últimos Lançamento A Receber'} bsStyle="primary" >

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
						    <FormControl type="text" id="documento" value={this.state.recebiveis} onChange={this.handleChange} />
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

	                    <Col xs={12} md={12}>

							<Table striped bordered condensed hover>
								<thead>
								  <tr>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Número</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Pedido</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Vencimento</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Parcela</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Prazo</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor da Parcela</th>
								    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: '110px'}} ></th>
								  </tr>
								</thead>

							  	{this.state.recebiveis.map( (r, index) => <Pagador key={'titulo-' + r.nosso_numero} {...r} index={index} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}

							</Table>

	                    </Col>
	                
	                </Row>

				</Panel>

		    </div>

		);

	}
}

const Pagador = (retorno) =>
  <tbody>
    <tr>
      <td colSpan={8} style={{borderBottom: '2px solid black'}} ><h4><b>{retorno.cliente.nome}</b></h4></td>
    </tr>
    {retorno.parcelas.map ( (parcela, index) =>
      <Parcela key={'parcela-' + retorno.nosso_numero + '-' + index} {...parcela} nosso_numero={retorno.nosso_numero} pedido={retorno.pedido} cliente={retorno.cliente} retorno_index={retorno.index} parcela_index={index} handleSelect={retorno.handleSelect} handleUnselect={retorno.handleUnselect} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr>
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', parcela.valor)}</b></td>
    <td>
      <Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={this.handlePrint.bind(null, parcela)} ><Glyphicon glyph="print" /></Button>
    </td>
  </tr>
