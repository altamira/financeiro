import { omit } from 'lodash';
import format from 'number-format.js';

import api from './../../api/'

import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  Table,
  Tooltip,
  Tabs, 
  Tab,
  Image
} from 'react-bootstrap';

import Bordero from './Bordero';

import process from './process.svg';

export default class Retorno extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tarefa: {},

      "tipo": "retorno",
      "data": "2017-02-15T19:04:40.930Z",

      carteira: {
        "id": 15,
        "banco": "BRASIL",
        "agencia": "0",
        "conta": "0",
        "carteira": 0,
        "nome": "BRASIL - GARANTIA",
        "limite": 0,
        "utilizado": 0,
        "saldo": 0,
        "defasagem": 0,
        "descoberto": 0,
        "valor_operacao": 250,
        "valor_tarifa": 3.5,
        "taxa_juros": 3.5,
        "total_iof": 0,
        "total_juros": 0,
        "total_tarifas": 0,
        "remessa": 5952.91,
        "retorno": 0
      },

      bordero: {
        "data": new Date().toISOString(),
        "valor_titulos": 0,
        "total_dias": 0,
        "valor_juros": 0,
        "valor_base": 0,
        "numero_parcelas": 0,
        "iof_adicional": 0,
        "iof_diario": 0,
        "valor_iof_adicional": 0,
        "valor_iof_diario": 0,
        "valor_operacao": 0,
        "valor_tarifa": 0,
        "valor_liquido": 0,
        "valor_cet": 0,
        "cet": 0
      },

      retorno: {
        "nosso_numero": 216697,
        "cliente": {
          "cnpj": "68.870.997/0001-74",
          "inscricao": "278150401116",
          "fantasia": "BITZER COMPRESSORES LTDA",
          "nome": "BITZER COMPRESSORES LTDA",
          "logradouro": "AV",
          "endereco": "JOAO PAULO ABLAS",
          "numero": "777",
          "complemento": "",
          "bairro": "JARDIM DA GLORIA",
          "municipio": 3513009,
          "cidade": "COTIA",
          "CEP": "06711-250",
          "UF": "SP",
          "ddd": "11",
          "telefone": "4617-9156",
          "contato": "",
          "conta_contabil": "1.01.02.001.03902"
        },
        "parcelas": [
          {
            "vencto": "2017-03-24T03:00:00.000Z",
            "origem": "VENDA",
            "forma_pagto": "COBRANCA",
            "tipo_vencto": "DDL",
            "parcela": 1,
            "prazo": 21,
            "valor": 1506.71,
            "carteira": "BRASIL - GARANTIA"
          }
        ]
      }

    }

    // comandos
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.setTarefa = this.setTarefa.bind(this);
    this.setCarteiras = this.setCarteiras.bind(this);

  }

  componentWillMount() {
    api.tarefa.get(this.props.params.id, this.setTarefa); 
    //api.carteira.list(this.setCarteiras);        
  }

  componentWillReceiveProps(props) {
    api.tarefa.get(props.params.id, this.setTarefa);
  }

  setTarefa(tarefa) {
    console.log(JSON.stringify(tarefa, null, 2))

    this.setState({
      tarefa: omit(tarefa, 'documento'), 
      retorno: tarefa.documento.retorno,
      bordero: {}
    })

  }

  setCarteiras(carteiras) {
    this.setState({carteiras: carteiras});
  }

  handleComplete() {

    let state = {
      ...this.state.tarefa, 
      documento: { 
        carteira: this.state.carteira, 
        retorno: this.state.retorno,
        bordero: this.state.bordero,
      }
    }

    console.log(JSON.stringify(state, null, 2));

    this.setState({dialog: <Bordero 

      bordero={{
        ...this.state.bordero, 
        valor_titulos: format('########0,00', 
          this.state.retorno.parcelas.filter( p => p.aceito).reduce( (subtotal, parcela) => 
            subtotal + parcela.valor, 0.0)),
        valor_base: format('########0,00', this.state.bordero.valor_base || 0.0),
        valor_cet: format('########0,00', this.state.bordero.valor_cet || 0.0),
        valor_iof: format('########0,00', this.state.bordero.valor_iof || 0.0),
        valor_iof_adicional: format('########0,00', this.state.bordero.valor_iof_adicional || 0.0),
        valor_iof_diario: format('########0,00', this.state.bordero.valor_iof_diario || 0.0),
        valor_operacao: format('########0,00', this.state.bordero.valor_operacao || 0.0),
        valor_tarifa: format('########0,00', this.state.bordero.valor_tarifa || 0.0),
        valor_juros: format('########0,00', this.state.bordero.valor_juros || 0.0),
        taxa_juros: format('########0,00', this.state.bordero.taxa_juros || 0.0),
        valor_liquido: format('########0,00', this.state.bordero.valor_liquido || 0.0)
      }} 

      onClose={this.handleCloseDialog.bind(this)} 
      onSave={this.handleSaveAndClose.bind(this)} />
    })

  }

  handleClose() {
    this.props.router.push('/');
  }

  handleSaveAndClose(bordero) {
    let state = {
      ...this.state.tarefa, 
      documento: { 
        carteira: this.state.carteira, 
        retorno: this.state.retorno,
        bordero: bordero
      }
    }
    console.log(JSON.stringify(state, null, 2));

    api.retorno.concluir(state, this.handleClose.bind(this))

  }

  handleSelect(parcela, aceito) {
    this.setState({
      dialog: undefined,
      retorno: {

        ...this.state.retorno,

        parcelas: this.state.retorno.parcelas.map( (p, i) => {
        
          if (parcela.index === i) {
            p.aceito = aceito;
          } 

          return p;
        })

      }
    })
  }

  handleUnselect() {

  }

  handleConfirm(item) {
    //this.setState({dialog: <Confirm item={item} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleCloseDialog() {
    this.setState({dialog: undefined})
  }

  // formulario
  handleChange(value) {
    this.setState({[value.target.id]: value.target.value});
  }

  render() {

    let { carteira } = this.state;

    return (

      <div>

        <Panel header={'Retorno de Cobrança'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
          
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Tarefa concluída</Tooltip>)}
              >
                  <Button
                    disabled={!!this.state.retorno.parcelas.find( p => p.aceito === undefined)}
                    onClick={this.handleComplete}
                    style={{width: 150}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Emitir Borderô</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} />

            <Col xs={4} md={4} style={{textAlign: 'right'}} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Fechar</Tooltip>)}
              >
                  <Button
                    onClick={browserHistory.push.bind(null, '/')}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="remove" />
                    <div><span>Fechar</span></div>
                  </Button>

              </OverlayTrigger>

            </Col>

          </Row>

          <Row>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Formulário">
                <div style={{margin: 20}}>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
                        <thead>
                          <tr>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Carteira</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Limite</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Utilizado</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Defasagem</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Enviar</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Remessa</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Retorno</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td style={{textAlign: 'left'}}><h2><b>{carteira.nome}</b></h2></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.limite)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.utilizado)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.saldo)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.defasagem)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.descoberto)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.remessa)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.retorno)}</b></td>
                            </tr>                              
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

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

                          {this.state.retorno && (<Pagador key={'titulo-' + this.state.retorno.nosso_numero} {...this.state.retorno} index={0} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}
                        
                      </Table>
                    </Col>
                  </Row>
                              
                </div>
              </Tab>
              <Tab eventKey={2} title="Procedimento">
                <Image src={process} style={{width: '100%', height: '100%'}} />
              </Tab>
            </Tabs>
          </Row>
        </Panel>

        {this.state.dialog}

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
      <Parcela key={'parcela-' + retorno.nosso_numero + '-' + index} {...parcela} nosso_numero={retorno.nosso_numero} pedido={retorno.pedido} cliente={retorno.cliente} index={index} handleSelect={retorno.handleSelect} handleUnselect={retorno.handleUnselect} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr>
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo_vencto === "DDP" ? 'SINAL' : parcela.tipo_vencto === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', parcela.valor)}</b></td>
    
    {parcela.aceito === undefined ?
      (<td style={{textAlign: 'center'}}><OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_aceito' + parcela.parcela_index} >Aceito</Tooltip>}>
        <Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela, true)}>
          <Glyphicon glyph="thumbs-up" />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_naceito' + parcela.index}>Não Aceito</Tooltip>}>
        <Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela, false)}>
          <Glyphicon glyph="thumbs-down" />
        </Button>
      </OverlayTrigger></td>) 

      :

      (parcela.aceito ?

      (<td style={{textAlign: 'center'}}><OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_ok' + parcela.index} >Desfazer</Tooltip>}>
        <Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela)}>
          <Glyphicon glyph="ok" />
        </Button>
      </OverlayTrigger></td>)

      :

      (<td style={{textAlign: 'center'}}><OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_ok' + parcela.index} >Desfazer</Tooltip>}>
        <Button bsStyle="danger" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela)}>
          <Glyphicon glyph="ok" />
        </Button>
      </OverlayTrigger></td>))

    }
    
  </tr>

