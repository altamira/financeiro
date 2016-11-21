
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  FormGroup,
  FormControl,
  Table,
  Checkbox,
  Tooltip,
  Label
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';
//import PDF from 'react-pdf';

import Confirm from './Confirm';

import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

import process from './process.svg';

const TOPIC = '/financeiro/duplicata/conferir';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

/*! FUNCTION: ARRAY.KEYSORT(); **/
Array.prototype.sortByKey = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "empresa": "01",
      "numero": 74700,
      "emissao": "2016-11-01T00:00:00.000Z",
      "entrega": "2016-12-16T00:00:00.000Z",
      "cliente": {
        "cnpj": "04.813.867/0001-17",
        "inscricao": "407450079113",
        "fantasia": "PENTAIR",
        "nome": "PENTAIR WATER DO BRASIL LTDA",
        "logradouro": "AV",
        "endereco": "MARGINAL NORTE DA VIA ANHANGUERA",
        "numero": "53.700",
        "complemento": "",
        "bairro": "JARDIM SERVILHA",
        "municipio": 3525904,
        "cidade": "JUNDIAI",
        "CEP": "13206-245",
        "UF": "SP",
        "ddd": "11",
        "telefone": "3378-5443",
        "contato": "",
        "desconto": 1
      },
      "condicao": "006",
      "representante": {
        "codigo": "008",
        "nome": "CLAYTON CAPELATTO REPRESENTAÇÕES"
      },
      "comissao": 0.04,
      "totais": {
        "produtos": 4971.36,
        "ipi": 248.568,
        "total": 5219.928
      },
      "parcelas": [
        {
           "vencto": "2017-01-06T00:00:00.000Z",
           "tipo": "DDL",
           "parcela": 1,
           "prazo": 21,
           "porcentagem": 100,
           "descricao": "DDL 021; POR 100000",
           "valor": 5219.928
        }
      ],

      // campos de controle, não armazenar
      dialog: null,

      // false = ascending order, true = descending order
      order: {
        nosso_numero: null, 
        vencto: null,
        nome: null,
        valor: null, 
      }
    }

    // comandos
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);


    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSendOrder = this.handleSendOrder.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.handleOrderBy = this.handleOrderBy.bind(this);

  }

  componentWillMount() {
    this.load(this.props.params.id || 0);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps.params.id);    
  }
  
  load(tarefa) {
    // carrega os parametros da tarefa
    axios
      .get('http://sistema/api/tarefa/' + tarefa)
      .then( (response) => {
        if (response.data instanceof Array && response.data.length === 1) {
          console.log(JSON.stringify(JSON.parse(response.data[0].payload), null, 2))
          this.setState(JSON.parse(response.data[0].payload));
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.\nErro: ' + error.message);
      })      
  }

  handleClose() {
    browserHistory.push('/');
  }

  handleComplete(data) {
    // carrega os parametros da tarefa
    axios
      .post('http://sistema/api/financeiro/duplicata/desconto/concluir/' + this.props.params.id, omit(this.state, ['dialog']))
      .then( (response) => {
        alert('Tarefa concluida com sucesso');
        //browserHistory.push('/');
      })
      .catch( error => {
        alert('Erro ao concluir a tarefa.\nErro: ' + error.message);
      })
  }

  handleSelect(parcela, index) {
    let parcelas = this.state.parcelas;
    parcelas[index].selected = true;
    this.setState({parcelas: parcelas})
  }

  handleUnselect(parcela, index) {
    let parcelas = this.state.parcelas;
    parcelas[index].selected = false;
    this.setState({parcelas: parcelas})
  }

  handleConfirm(item) {
    this.setState({dialog: <Confirm item={item} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleSendOrder(index) {
    let p = this.state.parcelas;
    p.splice(index, 1);
    p.forEach( (p, i) => p.sequencia = i + 1);
    this.setState({parcelas: p, dialog: null});
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  // formulario
  handleChange(value) {
    this.setState({[value.target.id]: value.target.value});
  }

  handleCheckboxChange(value) {
    let cliente = this.state.cliente;
    cliente.desconto = value.target.checked;
    this.setState({cliente: cliente});
  }

  handleOrderBy(key) {
    let order = {nosso_numero: null, vencto: null, nome: null, valor: null};
    let parcelas = this.state.parcelas;
    order[key] = !this.state.order[key];
    this.setState({parcelas: parcelas.sortByKey(key, order[key]), order: order });
  }

  render() {

    let total = this.state.parcelas.reduce( (soma, p) => soma + (p.selected ? p.valor : 0.0), 0.0);

    return (

      <div>

        <Panel header={'Ordem de Desconto de Duplicatas ' + (this.state.numero)} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Tarefa concluída</Tooltip>)}
              >
                  <Button
                    disabled={!this.state.parcelas.find( p => p.selected)}
                    onClick={this.handleComplete}
                    style={{width: 200}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Enviar Ordem de Desconto</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Apenas gravar as alterações</Tooltip>)}
              >

                  <Button
                    onClick={this.handleSave}
                    style={{width: 100}}
                  >
                    <Glyphicon glyph="floppy-disk" />
                    <div><span>Gravar</span></div>
                  </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Calcular Datas das Parcelas</Tooltip>)}
              >

                <Button
                  onClick={this.handleCalc}
                  style={{width: 100}}
                >
                  <Glyphicon glyph="calendar" />
                  <div><span>Calcular</span></div>
                </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Imprimir Espelho desta Duplicata</Tooltip>)}
              >

                <Button
                  disabled={this.state.hasChanges}
                  onClick={this.handlePrint}
                  style={{width: 100}}
                >
                  <Glyphicon glyph="print" />
                  <div><span>Imprimir</span></div>
                </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Deixar para fazer depois</Tooltip>)}
              >
                  <Button
                    onClick={this.handleClose}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="time" />
                    <div><span>Fazer depois</span></div>
                  </Button>

              </OverlayTrigger>

            </Col>
          </Row>

          <Row>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Formulário">
                <div style={{margin: 20}}>
                  <Row>
                    <Col md={4}>Tipo</Col>
                    <Col md={8}>
                      <FormGroup validationState="success">
                        <FormControl id="tipo" componentClass="select" placeholder="Tipo" value={this.state.tipo} onChange={this.handleChange} >
                          <option value="DDP">BANCO DO BRASIL - AG 3333-2 CONTA 2171-7</option>
                          <option value="DDL">BANCO ITAU - AG 0467 CONTA 20912-8</option>
                          <option value="DDM">BANCO BRADESCO - AG 3393 CONTA 20257</option>
                        </FormControl>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/*<Row style={{paddingTop: 20}} >
                    <Col xs={12} md={2}>Pedido</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        <FormControl type="text" value={this.state.numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        <DatePicker ref="emissao" value={this.state.emissao} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        <DatePicker value={this.state.entrega} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        <FormControl type="text" style={{textAlign: 'right'}} value={this.state.cliente.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={5}>
                      <FormGroup validationState="success">
                        <FormControl type="text" value={this.state.representante.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup validationState="success">
                        <FormControl type="text" value={this.state.cliente.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>*/}

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th><a href="#" onClick={this.handleOrderBy.bind(null, 'nosso_numero')}>Número</a> {this.state.order.nosso_numero !== null ? this.state.order.nosso_numero ? (<Glyphicon glyph="chevron-up" />) : <Glyphicon glyph="chevron-down" /> : null}</th>
                            <th><a href="#" onClick={this.handleOrderBy.bind(null, 'vencto')}>Vencimento</a> {this.state.order.vencto !== null ? this.state.order.vencto ? (<Glyphicon glyph="chevron-up" />) : <Glyphicon glyph="chevron-down" /> : null}</th>
                            <th>Parcela</th>
                            <th>Prazo</th>
                            <th><a href="#" onClick={this.handleOrderBy.bind(null, 'nome')}>Nome do Pagador</a> {this.state.order.nome !== null ? this.state.order.nome ? (<Glyphicon glyph="chevron-up" />) : <Glyphicon glyph="chevron-down" /> : null}</th>
                            <th style={{textAlign: 'right'}}><a href="#" onClick={this.handleOrderBy.bind(null, 'valor')}>Valor da Parcela</a> {this.state.order.valor !== null ? this.state.order.valor ? (<Glyphicon glyph="chevron-up" />) : <Glyphicon glyph="chevron-down" /> : null}</th>
                            <th style={{width: '1%'}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.parcelas.map( (parcela, index) => {
                            return (
                              <tr key={'tr-' + index} style={{background: parcela.selected ? 'gold' : ''}} >
                                <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
                                <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela}/{this.state.parcelas.length}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
                                <td style={{textAlign: 'center'}}>{this.state.cliente.nome}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(parcela.valor.toFixed(2)).toLocaleString()}</td>
                                <td>
                                  {!parcela.selected ? 
                                    (<Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleSelect.bind(null, parcela, index)} ><Glyphicon glyph="ok" /></Button>) :                                 
                                    (<Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={this.handleUnselect.bind(null, parcela, index)} ><Glyphicon glyph="remove" /></Button>)
                                  }
                                </td>
                              </tr>                              
                            )
                          }
                            
                          )}
   
                          <tr>
                              <td colSpan={4}></td>
                              <td style={{textAlign: 'right'}} colSpan={2}>
                                {this.state.parcelas.find( p => p.selected) ?
                                    
                                    <table style={{width: '100%'}}><tbody><tr>
                                      <td style={{textAlign: 'right', width: '70%'}}><b>Valor Bruto</b></td>
                                      <td style={{textAlign: 'right', width: '30%'}}><b>R$ {Number(total.toFixed(2)).toLocaleString()}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign: 'right', width: '70%'}}><b>IOF (0.46%)</b></td>
                                      <td style={{textAlign: 'right', width: '30%'}}><b>R$ {Number((total * (0.46 / 100)).toFixed(2)).toLocaleString()}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign: 'right', width: '70%'}}><b>Juros (1.71%)</b></td>
                                      <td style={{textAlign: 'right', width: '30%'}}><b>R$ {Number((total * (1.71 / 100)).toFixed(2)).toLocaleString()}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign: 'right', width: '70%'}}><b>Taxa do Borderô</b></td>
                                      <td style={{textAlign: 'right', width: '30%'}}><b>R$ {Number((190).toFixed(2)).toLocaleString()}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign: 'right', width: '70%'}}><b>Valor Líquido</b></td>
                                      <td style={{textAlign: 'right', width: '30%'}}><b>R$ {Number((total - (total * ((0.46 + 1.71) / 100) + 190)).toFixed(2)).toLocaleString()}</b></td>
                                    </tr></tbody></table>
                                    : null
                                }
                              </td>
                              <td></td>
                            </tr>
                        </tbody>
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

export default App;
