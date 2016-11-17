
import React, { Component } from 'react';

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
  Tooltip
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import DatePicker from 'react-bootstrap-date-picker';
//import PDF from 'react-pdf';

import Incluir from './Incluir';
import Excluir from './Excluir';
import Calcular from './Calcular';

import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

import process from './process.svg';

const TOPIC = '/financeiro/duplicata/conferir';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

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
        "contato": ""
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
           "tipo": "DDL",
           "sequencia": 1,
           "dias": 21,
           "porcentagem": 100,
           "descricao": "DDL 021; POR 100000",
           "valor": 5219.928
        }
      ],

      // campos de controle, não armazenar
      topics: {},
      hasChanges: true,
      dialog: null,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleComplete = this.handleComplete.bind(this);

    this.handleError = this.handleError.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  componentWillMount() {
    var opts = {
      host: '192.168.0.1', //'test.mosquitto.org'
      port: 61614,
      protocol: 'ws',
      qos: 0,
      retain: false,
      clean: true,
      keepAlive: 30, // 30 sec.
      clientId: clientId
    }

    this.client = mqtt.connect(opts)

    this.client.on('connect', function() {
      let topics = {};

      this.client.subscribe(
        TOPIC + '/erros/' + clientId, 
        function(err, granted) { 
          !err ? 
            this.setState({
              topics: assign(this.state.topics, {[granted[0].topic]: this.handleError})}) : 
            console.log('Erro ao se inscrever no topico: ' + err)
        }.bind(this)
      );

    }.bind(this));
    
    this.client.on('message', function (topic, message) {
      // message is Buffer
      console.log('\n' + topic + ':\n' + message.toString())
      
      this.state.topics[topic] && this.state.topics[topic](message.toString());

    }.bind(this))
  
  }

  componentWillUnmount() {
    this.state.topics && this.state.topics.forEach( (t) =>
      this.client.unsubscribe(
        t.topic, 
        function(err) { 
          err && console.log('Erro ao retirar a inscrição ao topico: ' + t.topic)
        }
      )
    )
    this.client.end();
  }

  componentWillReceiveProps(nextProps) {

    // carrega os parametros da tarefa
    axios
      .get('http://sistema/api/tarefa/' + nextProps.params.id)
      .then( (response) => {
        if (response.data instanceof Array && response.data.length === 1) {
          this.setState(JSON.parse(response.data[0].payload));
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.\nErro: ' + error.message);
      })  
  }
  
  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleClose() {
    browserHistory.push('/');
  }

  handleComplete(data) {
    this.client.subscribe(TOPIC + '/alterado/' + this.state._id, function(err, granted) {
      if (err) {
        console.log('Erro ao se inscrever no topico: ' + granted[0].topic)
      } else {
        this.setState(
          {
            topics: assign(this.state.topics, {[granted[0].topic]: this.handleSaveOk.bind(this)})
          },
          this.client.publish.bind(
            this.client, 
            TOPIC + '/alterar/' + clientId, 
            JSON.stringify(omit(this.state, ['topics', 'hasChanges', 'dialog']))
          )  
        );
      }
      
    }.bind(this));    
  }

  handleSaveOk(msg) {
    let data = JSON.parse(msg); 
    let newState = this.state;
    delete newState.hasChanges;
    this.setState(
      newState, 
      //alert('Dados gravados com sucesso !')
    );
  }

  handleAdd() {
    this.setState({dialog: <Incluir onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleDelete(index) {
    //this.setState({dialog: <Excluir onClose={this.handleCloseDialog.bind(this)} />})
    let pedido = this.state;
    pedido.parcelas.splice(index, 1);
    this.setState(pedido);
  }

  handleSave() {
    this.setState({dialog: null})
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  handleChange(value) {
    // value is an ISO String. 
    /*if (this.state[value.target.id] != value.target.value) {
      this.setState({
        [value.target.id]: value.target.value,
        persist: true
      });
    }*/
  }

  render() {
    const canSave = true;

    return (

      <div>

        <Panel header={'Conferência das Duplicadas Emitidas no Pedido de Venda ' + (this.state.numero)} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Confirmar duplicatas conferidas</Tooltip>)}
              >
                  <Button
                    onClick={this.handleInsert}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Conferido</span></div>
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
                  <Row style={{paddingTop: 20}} >
                    <Col xs={12} md={2}>Nosso Número</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" value={this.state.numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker ref="emissao" value={this.state.emissao} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker value={this.state.entrega} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Pedido</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" value={this.state.numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={this.state.cliente.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" value={this.state.representante.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" value={this.state.cliente.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Valor Produtos</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.produtos.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Valor IPI</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.ipi.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Total do Pedido</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.total.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>Vencimento</th>
                            <th>Prazo</th>
                            <th>Valor da Parcela</th>
                            <th style={{width: '1%'}}><Button style={{width: '70px'}} bsStyle="success" bsSize="small" onClick={this.handleAdd}><Glyphicon glyph="plus" /> Incluir</Button></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.parcelas.map( (parcela, i) => {
                            let vencto = new Date(this.state.emissao);
                            vencto.setTime( vencto.getTime() + parcela.dias * 86400000 );
                            return (
                              <tr key={'tr-' + i} >
                                <td style={{textAlign: 'center'}}>{vencto.toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{parcela.sequencia === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.dias + ' dia(s) do PEDIDO' :  parcela.dias + ' dia(s) da ENTREGA'}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(parcela.valor.toFixed(2)).toLocaleString()}</td>
                                <td><Button bsStyle="danger" style={{width: '70px'}} bsSize="small" onClick={this.handleDelete.bind(null, i)}><Glyphicon glyph="remove" /> Excluir</Button></td>
                              </tr>                              
                            )
                          }
                            
                          )}
   
                          <tr>
                            <td></td>
                            <td colSpan="2" style={{textAlign: 'right'}}><b>Total das Parcelas</b></td>
                            <td style={{textAlign: 'right'}}><b>R$ {Number(this.state.totais.total.toFixed(2)).toLocaleString()}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </Tab>
            <Tab eventKey={2} title="Procedimento">
              <img src={process} style={{width: '100%', height: '100%'}} />
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
