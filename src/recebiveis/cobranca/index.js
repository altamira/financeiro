
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
import Bordero from './Bordero.jsx';

import { assign, omit } from 'lodash';
import axios from 'axios';
import moment from 'moment';

import bordero from './bordero';

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

      // carteira selecionada
      carteira: null,

      // lista de carteiras
      carteiras: [],

      // titulos a enviar para cobranca bancária
      cobranca: [],

      // calculo bordero
      bordero: bordero,

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
            carteiras: response.data
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
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
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

  componentWillReceiveProps(props) {
    axios
      .get('http://financeiro:1880/api/financeiro/carteira/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            carteiras: response.data
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })         

    // carrega os parametros da tarefa
    axios
      .get('http://financeiro:1880/api/tarefa/' + props.params.id)
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
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })  
  }
  
  handleSaveAndClose() {
    let { carteira, cobranca, bordero } = this.state;

    axios
      .post('http://financeiro:1880/api/tarefa/' + this.props.params.id, {
        ...this.state.tarefa, 
        documento: { 
          carteira: carteira, 
          cobranca: cobranca,
          bordero: bordero.calculo(carteira, cobranca)
        }
      })
      .then( (response) => {
        console.log(response.data);
        this.props.router.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  handleComplete(data) {
    let { carteira, cobranca, bordero } = this.state;

    console.log(JSON.stringify({
      ...this.state.tarefa, 
      documento: { 
        carteira: carteira, 
        cobranca: cobranca,
        bordero: bordero.calculo(carteira, cobranca)
      }
    }, null, 2));

    // carrega os parametros da tarefa
    axios
      .post('http://financeiro:1880/api/financeiro/recebiveis/cobranca/tarefa/' + this.props.params.id, {
        ...this.state.tarefa, 
        documento: { 
          carteira: carteira, 
          cobranca: cobranca,
          bordero: bordero
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
    this.setState({carteira: carteira})
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

    let { carteira, cobranca, bordero } = this.state;

    bordero.calculo(carteira, cobranca);

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
                    disabled={!(cobranca.find( c => c.parcelas.find( parcela => !parcela.carteira && parcela.selected)) && carteira !== null)}
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

            <Col xs={4} md={4} style={{textAlign: 'right'}} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Salvar alterações e terminar depois.</Tooltip>)}
              >
                  <Button
                    onClick={this.handleClose}
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
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Carteira</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Limite</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Utilizado</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Defasagem</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Enviar</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Remessa</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Retorno</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: '1%'}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.carteiras.map( (c, index) => {
                            return (
                              <tr key={'tr-carteiras-' + index} style={{background: carteira && carteira.id === c.id ? 'gold' : ''}} >
                                <td style={{textAlign: 'left'}}><b>{c.nome}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.limite.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.utilizado.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.saldo.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.defasagem.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.descoberto.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.remessa.toFixed(2)).toLocaleString()}</b></td>
                                <td style={{textAlign: 'right'}}><b>{Number(c.retorno.toFixed(2)).toLocaleString()}</b></td>
                                <td><Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleSelectCarteira.bind(null, c, index)} ><Glyphicon glyph="ok" /></Button></td>
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
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Número</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Pedido</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Vencimento</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Condição Pagto</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Dias do Vencto</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor da Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >CARTEIRA</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Data Envio</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: '1%'}}></th>
                          </tr>
                        </thead>

                          {cobranca.map( (c, index) => <Pagador key={'recebivel-' + c.nosso_numero} {...c} {...bordero} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}
                        
                      </Table>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={0} md={6}></Col>
                    <Col xs={12} md={6}>
                      {cobranca.find( c => c.parcelas.find( parcela => parcela.selected)) && carteira !== null ? 
                        <Bordero carteira={carteira} bordero={bordero} /> : null
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

const Pagador = (cobranca) =>
  <tbody>
    <tr>
      <td colSpan={10} style={{borderBottom: '2px solid black'}} ><h4><b>{cobranca.cliente.nome}</b></h4></td>
    </tr>
    {cobranca.parcelas.map ( (parcela, index) =>
      <Parcela key={'parcela-' + parcela.nosso_numero + '-' + index} {...parcela} {...cobranca} nosso_numero={cobranca.nosso_numero} pedido={cobranca.pedido} index={index} handleSelect={cobranca.handleSelect} handleUnselect={cobranca.handleUnselect} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr style={{background: !parcela.carteira && parcela.selected ? 'gold' : ''}} >
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'center'}}>{moment(parcela.vencto).diff(moment(parcela.data_operacao), 'days') + ' dia(s)'}</td>
    <td style={{textAlign: 'right'}}><b>R$ {Number(parcela.valor).toLocaleString()}</b></td>
    <td ><b>{parcela.carteira}</b></td>
    <td style={{textAlign: 'center'}}><b>{parcela.carteira && new Date(parcela.remessa).toLocaleDateString()}</b></td>
    <td>
      {!parcela.carteira && moment(parcela.vencto).diff(moment(parcela.data_operacao), 'days') >= 0 ? (!parcela.selected ? 
        (<Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="ok" /></Button>) :                                 
        (<Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="remove" /></Button>)) : null
      }
    </td>
  </tr>
