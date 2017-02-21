import moment from 'moment';
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

import Confirm from './Confirm';
import Bordero from './Bordero.jsx';

import bordero from './bordero';
import PrintPreview from './../lancamento/PrintPreview';

import process from './process.svg';

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
      cobranca: {
        "tipo": "cobranca",
        "nosso_numero": 0,
        "pedido": 0,
        "cliente": {
          "cnpj": "",
          "inscricao": "",
          "fantasia": "",
          "nome": "",
          "logradouro": "",
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
        "parcelas": []
      },

      // calculo bordero
      bordero: bordero,

      // campos de controle, não armazenar
      dialog: null,

    }

    // comandos
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    this.handlePrint = this.handlePrint.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.setTarefa = this.setTarefa.bind(this);

    this.setCarteiras = this.setCarteiras.bind(this);
    this.handleSelectCarteira = this.handleSelectCarteira.bind(this);

  }

  componentWillMount() {
    api.tarefa.get(this.props.params.id, this.setTarefa); 
    api.carteira.list(this.setCarteiras);        
  }

  componentWillReceiveProps(props) {
    api.tarefa.get(props.params.id, this.setTarefa);
  }
  
  setTarefa(tarefa) {
    console.log(JSON.stringify(tarefa, null, 2))

    this.setState({
      tarefa: tarefa, 
      cobranca: {
        ...tarefa.documento,
        parcelas: tarefa.documento.parcelas.map( parcela => {
          parcela.vencto = new Date(parcela.vencto).fromUTC().toISOString()

          return parcela;
        })
      }
    }) 

  }

  setCarteiras(carteiras) {
    this.setState({carteiras: carteiras});
  }

  handleSave() {
    let { carteira, cobranca, bordero } = this.state;

    api.tarefa.save(
      {
        ...this.state.tarefa, 
        documento: { 
          carteira: carteira, 
          cobranca: {
            ...cobranca,
            parcelas: cobranca.parcelas.map( parcela => {
              parcela.vencto = new Date(parcela.vencto).toUTC().toISOString()

              return parcela;
            })
          },
          bordero: bordero.calculo(carteira, cobranca)
        }
      }, 
      this.handleClose.bind(this)
    )
  }

  handleComplete() {
    let { carteira, cobranca, bordero } = this.state;

    let state = {
      ...this.state.tarefa, 
      documento: { 
        carteira: carteira, 
        cobranca: cobranca,
        bordero: bordero.calculo(carteira, cobranca)
      }
    }
    console.log(JSON.stringify(state, null, 2));

    api.cobranca.concluir(state, this.handleClose.bind(this))

  }

  handleClose() {
    this.props.router.push('/');
  }

  handleSelectCarteira(carteira, index) {
    this.setState({carteira: carteira})
  }

  handleSelect(nosso_numero, parcela) {
    this.setState({
      cobranca: {
        ...this.state.cobranca,
        parcelas: this.state.cobranca.parcelas.map( p => {
          if (p.parcela === parcela) {
            p.selected = true;
          }
          return p;
        })
      }
    });
  }

  handleUnselect(nosso_numero, parcela) {
    this.setState({
      cobranca: {
        ...this.state.cobranca,
        parcelas: this.state.cobranca.parcelas.map( p => {
          if (p.parcela === parcela) {
            delete p.selected;
          }
          return p;
        })
      }
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

  handlePrint() {
    this.setState({dialog: <PrintPreview nosso_numero={this.state.cobranca.nosso_numero} onClose={this.handleCloseDialog.bind(this)} />})
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
                    disabled={!(cobranca.parcelas.find( parcela => !parcela.carteira && parcela.selected) && carteira !== null)}
                    onClick={this.handleComplete}
                    style={{width: 150}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Enviar Cobrança</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Imprimir Título</Tooltip>)}
              >
                  <Button
                    onClick={this.handlePrint}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="print" />
                    <div><span>Imprimir</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

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
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: '1%'}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.carteiras.map( (c, index) => {
                            return (
                              <tr key={'tr-carteiras-' + index} style={{background: carteira && carteira.id === c.id ? 'gold' : ''}} >
                                <td style={{textAlign: 'left'}}><b>{c.nome}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.limite)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.utilizado)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.saldo)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.defasagem)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.descoberto)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.remessa)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', c.retorno)}</b></td>
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

                          <Pagador key={'recebivel-' + cobranca.nosso_numero} {...cobranca} {...bordero} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} />
                        
                      </Table>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={0} md={6}></Col>
                    <Col xs={12} md={6}>
                      {cobranca.parcelas.find( parcela => parcela.selected) && carteira !== null ? 
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
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo_vencto === "DDP" ? 'SINAL' : parcela.tipo_vencto === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'center'}}>{moment(parcela.vencto).diff(moment(parcela.data_operacao), 'days') + ' dia(s)'}</td>
    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', parcela.valor)}</b></td>
    <td ><b>{parcela.carteira}</b></td>
    <td style={{textAlign: 'center'}}><b>{parcela.carteira && new Date(parcela.remessa).toLocaleDateString()}</b></td>
    <td>
      {!parcela.carteira && moment(parcela.vencto).diff(moment(parcela.data_operacao), 'days') >= 0 ? (!parcela.selected ? 
        (<Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="ok" /></Button>) :                                 
        (<Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela.nosso_numero, parcela.parcela)} ><Glyphicon glyph="remove" /></Button>)) : null
      }
    </td>
  </tr>
