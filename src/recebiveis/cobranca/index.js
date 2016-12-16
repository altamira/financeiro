
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
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import Error from './../../Error';

import Confirm from './Confirm';

import { assign, omit } from 'lodash';
import axios from 'axios';

import process from './process.svg';

/*! FUNCTION: ARRAY.KEYSORT(); **/
Array.prototype.sortByKey = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}

export default class Cobranca extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tarefa: {},

      // titulos a enviar para cobranca bancária
      cobranca: [],

      // campos de controle, não apagar
      carteira: null,

      carteiras: [],

      // campos de controle, não armazenar
      dialog: null,

    }

    // comandos
    this.handleSaveAndClose = this.handleSaveAndClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.handleSelectCarteira = this.handleSelectCarteira.bind(this);

    this.handleOrderBy = this.handleOrderBy.bind(this);

  }

  componentWillMount() {
    axios
      .get('http://financeiro:1880/api/financeiro/carteira/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            carteiras: response.data.map( c => 
            {
              c.remessa_total = c.remessa;
              return c;
            })
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })         

    // carrega os parametros da tarefa
    axios
      .get('http://financeiro:1880/api/tarefa/' + this.props.params.id)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            tarefa: response.data, 
            cobranca: response.data.documento
          }
        );
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleCloseDialog.bind(this)} />})
      })  

    // carrega documento
    /*axios
      .get('http://financeiro:1880/api/financeiro/cobranca')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2));
        this.setState({documento: response.data, carteira: null});
      })
      .catch( error => {
        alert('Erro ao obter a documento.\nErro: ' + error.message);
      })  */

  }

  componentWillReceiveProps(nextProps) {
  }
  
  handleSaveAndClose() {
    axios
      .post('http://financeiro:1880/api/tarefa/' + this.props.params.id, {
        ...this.state.tarefa, 
        documento: { 
          carteira: this.state.carteira, 
          cobranca: this.state.cobranca
        }
      })
      .then( (response) => {
        console.log(response.data);
        this.props.router.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  handleComplete(data) {
    console.log(JSON.stringify({
      ...this.state.tarefa, 
      documento: { 
        carteira: this.state.carteira, 
        cobranca: this.state.cobranca
      }
    }, null, 2));

    // carrega os parametros da tarefa
    axios
      .post('http://financeiro:1880/api/financeiro/recebiveis/cobranca/tarefa/' + this.props.params.id, {
        ...this.state.tarefa, 
        documento: { 
          carteira: this.state.carteira, 
          cobranca: this.state.cobranca
        }
      })
      .then( (response) => {
        console.log(response.data);
        this.props.router.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error 
          erro={error.response ? error.response.data.erro : 0} 
          mensagem={error.message + (error.response.data.mensagem || JSON.stringify(error.response.data, null, 2))} 
          onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  handleSelectCarteira(carteira, index) {
    this.setState({
      carteiras: this.state.carteiras.map( c => {
        c.remessa_total = c.remessa;
        return c;
      }), 
      carteira: {
        ...carteira, 
        remessa_total: this.state.cobranca.reduce( (total, c) => 
          total + c.parcelas.reduce( (soma, p) => 
            soma + (p.selected ? p.valor : 0)
          , 0.0)
        , 0.0)
      }
    })
  }

  handleSelect(nosso_numero, parcela) {
    this.setState({
      cobranca: this.state.cobranca.map( c => {
        if (c.nosso_numero === nosso_numero) {
          c.parcelas = c.parcelas.map( p => {
            if (p.parcela === parcela) {
              p.selected = true;
            }
            return p;
          });
        }
        return c;
      })
    });
  }

  handleUnselect(nosso_numero, parcela) {
    this.setState({
      cobranca: this.state.cobranca.map( c => {
        if (c.nosso_numero === nosso_numero) {
          c.parcelas = c.parcelas.map( p => {
            if (p.parcela === parcela) {
              delete p.selected;
            }
            return p;
          });
        }
        return c;
      })
    });
  }

  handleConfirm(item) {
    this.setState({dialog: <Confirm item={item} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleCloseDialog() {
    this.setState({dialog: undefined})
  }

  // formulario
  handleChange(value) {
    this.setState({[value.target.id]: value.target.value});
  }

  handleOrderBy(key) {
    let order = {nosso_numero: null, vencto: null, nome: null, parcela: null, valor: null};
    let parcelas = this.state.parcelas;
    order[key] = !this.state.order[key];
    this.setState({parcelas: parcelas.sortByKey(key, order[key]), order: order });
  }

  render() {

    let total = this.state.cobranca.reduce( (total, cobranca) => 
      total + (cobranca.parcelas.reduce( (soma, parcela) => 
        soma + (parcela.selected ? parcela.valor: 0), 0.0) || 0)
      , 0.0) || 0;

    return (

      <div>

        <Panel header={'Cobrança Bancária e Antecipaçao de Recebíveis'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Tarefa concluída</Tooltip>)}
              >
                  <Button
                    disabled={!(this.state.cobranca.find( cobranca => cobranca.parcelas.find( parcela => !parcela.carteira && parcela.selected)) && this.state.carteira !== null)}
                    onClick={this.handleComplete}
                    style={{width: 150}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Enviar Cobrança</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} />

            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Deixar para terminar depois, as alteração serão salvas.</Tooltip>)}
              >
                  <Button
                    onClick={this.handleSaveAndClose}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="time" />
                    <div><span>Terminar depois</span></div>
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
                            <th>Carteira</th>
                            <th style={{textAlign: 'right'}}>Limite</th>
                            <th style={{textAlign: 'right'}}>Utilizado</th>
                            <th style={{textAlign: 'right'}}>Saldo</th>
                            <th style={{textAlign: 'right'}}>Defasagem</th>
                            <th style={{textAlign: 'right'}}>Enviar</th>
                            <th style={{textAlign: 'right'}}>Remessa</th>
                            <th style={{textAlign: 'right'}}>Retorno</th>
                            <th style={{width: '1%'}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.carteiras.map( (carteira, index) => {
                            return (
                              <tr key={'tr-carteiras-' + index} style={{background: this.state.carteira && this.state.carteira.id === carteira.id ? 'gold' : ''}} >
                                <td style={{textAlign: 'left'}}><b>{carteira.nome}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.limite.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.utilizado.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.saldo.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.defasagem.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.descoberto.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.remessa_total || 0).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(carteira.retorno).toLocaleString()}</b></td>
                                <td><Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleSelectCarteira.bind(null, carteira, index)} ><Glyphicon glyph="ok" /></Button></td>
                              </tr>                              
                            )
                          }
                            
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th style={{textAlign: 'center'}}>Número</th>
                            <th style={{textAlign: 'center'}}>Pedido</th>
                            <th style={{textAlign: 'center'}}>Vencimento</th>
                            <th style={{textAlign: 'center'}}>Parcela</th>
                            <th style={{textAlign: 'center'}}>Prazo</th>
                            <th style={{textAlign: 'right'}}>Valor da Parcela</th>
                            <th>CARTEIRA</th>
                            <th>Data Envio</th>
                            <th style={{width: '1%'}}></th>
                          </tr>
                        </thead>

                          {this.state.cobranca.map( (cobranca, index) => <Recebivel key={'recebivel-' + cobranca.nosso_numero} {...cobranca} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}
                        
                      </Table>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={0} md={8}></Col>
                    <Col xs={12} md={4}>
                      {this.state.cobranca.find( cobranca => cobranca.parcelas.find( parcela => parcela.selected)) && this.state.carteira !== null ? 

                        <Table striped bordered condensed hover>
                          <thead>
                            <tr>
                              <th style={{textAlign: 'right'}}>DESCONTOS</th>
                              <th style={{textAlign: 'right'}}>VALOR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Valor Bruto</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number(total.toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>IOF ({Number((this.state.carteira.iof / 100).toFixed(2)).toLocaleString()}%)</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total * (this.state.carteira.iof / 100)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Juros ({Number((this.state.carteira.juros / 100).toFixed(2)).toLocaleString()}%)</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total * (this.state.carteira.juros / 100)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Taxa do Borderô</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((this.state.carteira.bordero).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Valor Líquido</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total - (total * ((this.state.carteira.iof + this.state.carteira.juros) / 100) + this.state.carteira.bordero)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                          </tbody>
                        </Table>
                          
                        : null
                      }
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

const Recebivel = (cobranca) =>
  <tbody>
    <tr>
      <td colSpan={8}><h4><b>{cobranca.cliente.nome}</b></h4></td>
    </tr>
    {cobranca.parcelas.map ( (parcela, index) =>
      <Parcela key={'parcela-' + parcela.nosso_numero + '-' + index} {...parcela} nosso_numero={cobranca.nosso_numero} pedido={cobranca.pedido} index={index} handleSelect={cobranca.handleSelect} handleUnselect={cobranca.handleUnselect} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr style={{background: !parcela.carteira && parcela.selected ? 'gold' : ''}} >
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'right'}}><b>R$ {Number(parcela.valor).toLocaleString()}</b></td>
    <td ><b>{parcela.carteira}</b></td>
    <td style={{textAlign: 'center'}}><b>{parcela.carteira && new Date(parcela.remessa).toLocaleDateString()}</b></td>
    <td>
      {!parcela.carteira ? (!parcela.selected ? 
        (<Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="ok" /></Button>) :                                 
        (<Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="remove" /></Button>)) : null
      }
    </td>
  </tr>
