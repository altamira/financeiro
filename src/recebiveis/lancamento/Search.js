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

import PrintPreview from './PrintPreview';

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

		this.handleEdit = this.handleEdit.bind(this);
		this.handlePrint = this.handlePrint.bind(this);
	}

	componentWillMount(){
		api.consulta.lancamentos.get(this.handleResult.bind(this))
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

	handlePrint(item) {
		this.setState({dialog: <PrintPreview nosso_numero={item.nosso_numero} onClose={this.handleCloseDialog.bind(this)} />})
	}

	handleEdit(item) {
		this.props.onSelect && this.props.onSelect({
			...item,
			data: new Date(item.data).fromUTC().toISOString(),
			documento: item.documento || ''
		});
	}


	handleCloseDialog() {
		this.setState({dialog: null})
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

							  	{this.state.recebiveis.map( (r, index) => <Pagador key={'titulo-' + r.nosso_numero} {...r} index={index} handlePrint={this.handlePrint} handleEdit={this.handleEdit} /> )}

							</Table>

	                    </Col>
	                
	                </Row>

				</Panel>

				{this.state.dialog}

		    </div>

		);

	}
}

const Pagador = (recebivel) =>
  <tbody>
    <tr style={{borderBottom: '2px solid black'}} >
      <td colSpan={6} ><h4><b>{recebivel.nome}</b></h4></td>
      <td style={{textAlign: 'center'}}>
    	{/*<Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={parcela.handleEdit.bind(null, parcela)} ><Glyphicon glyph="edit" /></Button>*/}
      	<Button bsStyle="primary" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={recebivel.handlePrint.bind(null, recebivel)} ><Glyphicon glyph="print" /></Button>
	  </td>
    </tr>
    {recebivel.parcelas.map ( (parcela, index) =>
      <Parcela key={'parcela-' + recebivel.nosso_numero + '-' + index} {...parcela} nosso_numero={recebivel.nosso_numero} pedido={recebivel.pedido} cliente={recebivel.cliente} recebivel_index={recebivel.index} parcela_index={index} handlePrint={recebivel.handlePrint} handleEdit={recebivel.handleEdit} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr>
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido.numero}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).fromUTC().toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', parcela.valor)}</b></td>
  </tr>
