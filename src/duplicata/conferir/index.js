
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

import Calcular from './Calcular';
import Excluir from './Excluir';

import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

import process from './process.svg';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      _id: '',
      numero: '',
      pedido: '',
      emissao: new Date().toISOString(),
      entrega: new Date().toISOString(),
      cnpj: '',
      representante: '',
      nome: '',
      parcelas: [],

      // campos de controle, não armazenar
      topics: {},
      hasChanges: true,
      dialog: null,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEmissaoChange = this.handleEmissaoChange.bind(this);
    this.handleEntregaChange = this.handleEntregaChange.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleCalc = this.handleCalc.bind(this);

    this.handleError = this.handleError.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

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
        'financeiro/duplicata/erros/' + clientId, 
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

    // carrega os parametros da tarefa
    axios
      .get('http://sistema/api/task/' + this.props.params.id)
      .then( (response) => {
        if (response.data instanceof Array && response.data.length === 1) {
          this.setState(JSON.parse(response.data[0].params));
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.\nErro: ' + error.message);
      })    
  }

  componentWillUnmount() {
    this.state.topics.forEach( (t) =>
      this.client.unsubscribe(
        t.topic, 
        function(err) { 
          err && console.log('Erro ao retirar a inscrição ao topico: ' + t.topic)
        }
      )
    )
    this.client.end();
  }

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleClick() {
    this.setState({isLoading: true});

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }, 2000);
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  handleClose() {
    browserHistory.push('/');
  }

  handleSave(data) {
    this.client.subscribe('financeiro/duplicata/alterado/' + this.state._id, function(err, granted) {
      if (err) {
        console.log('Erro ao se inscrever no topico: ' + granted[0].topic)
      } else {
        this.setState(
          {
            topics: assign(this.state.topics, {[granted[0].topic]: this.handleSaveOk.bind(this)})
          },
          this.client.publish.bind(
            this.client, 
            'financeiro/duplicata/alterar/' + clientId, 
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

  handleDelete(id) {
    this.setState({dialog: <Excluir onClose={this.handleCloseDialog} />})
  }

  handlePrint(data) {
    this.setState({dialog: <PDF file={'http://localhost/financeiro/duplicatas/bordero'} onClose={this.handleCloseDialog} />})
  }

  handleCalc(data) {
    this.setState({dialog: <Calcular onClose={this.handleCloseDialog} />})
  }

  handleChange(value) {
    // value is an ISO String. 
    if (this.state[value.target.id] != value.target.value) {
      this.setState({
        [value.target.id]: value.target.value,
        persist: true
      });
    }
  }

  handleEmissaoChange(value) {
    // value is an ISO String. 
    if (this.state['Emissao'] != value) {
      this.setState({
        ['Emissao']: value,
        persist: true
      });
    }
  }

  handleEntregaChange(value) {
    // value is an ISO String. 
    if (this.state['Entrega'] != value) {
      this.setState({
        ['Entrega']: value,
        persist: true
      });
    }
  }

  render() {
    const canSave = true;

    return (

      <div>

        <Panel header={'Conferência das Duplicadas Emitidas no Pedido de Venda ' + (this.state.pedido)} bsStyle="primary" >

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
                      <FormGroup controlId="numero" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl ref="numero" type="text" value={this.state.numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup controlId="emissao" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker ref="emissao" value={this.state.emissao} onChange={this.handleEmissaoChange} />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Data da Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup controlId="entrega" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker ref="entrega" value={this.state.entrega} onChange={this.handleEntregaChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Pedido</Col>
                    <Col xs={12} md={2}>
                      <FormGroup controlId="pedido" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="pedido" value={this.state.pedido} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup controlId="cnpj" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="cnpj" value={this.state.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={2}>
                      <FormGroup controlId="representante" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="representante" value={this.state.representante} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup controlId="nome" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="nome" value={this.state.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Valor da Duplicata</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.parcelas.map( (k, i) => 
                            <tr key={'tr-' + i} >
                              <td><Checkbox value={k.selecionada} /></td>
                              <td>{k.vencto}</td>
                              <td>{k.valor}</td>
                            </tr>
                          )}
   
                          <tr>
                            <td></td>
                            <td colSpan="2">Total das Parcelas: R$ 3.572,96</td>
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
