
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

import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
//import Calc from './Calc';

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
           "vencto": "2017-01-06T00:00:00.000Z",
           "tipo": "DDL",
           "sequencia": 1,
           "dias": 21,
           "porcentagem": 100,
           "descricao": "DDL 021; POR 100000",
           "valor": 5219.928
        }
      ],

      // campos de controle, não armazenar
      dialog: null,
    }

    // comandos
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    // manipulação da lista de parcelas
    this.handleFormAdd = this.handleFormAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

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
      .post('http://sistema/api/financeiro/duplicata/conferencia/concluir/' + this.props.params.id, omit(this.state, ['topics', 'dialog']))
      .then( (response) => {
        alert('Tarefa concluida com sucesso');
        //browserHistory.push('/');
      })
      .catch( error => {
        alert('Erro ao concluir a tarefa.\nErro: ' + error.message);
      })
  }

  // manipuladores da lista de parcelas
  handleFormAdd() {
    this.setState({dialog: <Add onSave={this.handleAdd.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleAdd(item) {
    let p = this.state.parcelas;
    item.sequencia = this.state.parcelas.length + 1;
    p.push(item)
    this.setState({parcelas: p, dialog: null});
  }

  handleFormEdit(item) {
    this.setState({dialog: <Edit item={item} onSave={this.handleUpdate.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleUpdate(item) {
    let p = this.state.parcelas;
    p.splice(item.index, 1, item);
    this.setState({parcelas: p, dialog: null})
  }

  handleDeleteConfirm(item) {
    this.setState({dialog: <Delete item={item} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleDelete(index) {
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

  render() {

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
                    onClick={this.handleComplete}
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
                    <Col xs={12} md={2}>Pedido</Col>
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
                    <Col xs={12} md={2}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={this.state.cliente.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={5}>
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
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.produtos.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>IPI</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.ipi.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Total</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.totais.total.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={2}></Col>
                    <Col xs={12} md={10}>
                      <Checkbox value={this.state.desconto} onChange={this.handleChange} >
                        <Label bsSize="large" bsStyle="danger">Cliente não aceita desconto de duplicata</Label>
                      </Checkbox>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>Vencimento</th>
                            <th>Parcela</th>
                            <th>Prazo</th>
                            <th style={{textAlign: 'right'}}>Valor da Parcela</th>
                            <th style={{width: '1%'}}><Button style={{width: '70px'}} bsStyle="success" bsSize="small" onClick={this.handleFormAdd}><Glyphicon glyph="plus" /> Incluir</Button></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.parcelas.map( (parcela, index) => {
                            return (
                              <tr key={'tr-' + index} >
                                <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{parcela.sequencia}/{this.state.parcelas.length}</td>
                                <td style={{textAlign: 'center'}}>{parcela.sequencia === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.dias + ' dia(s) do PEDIDO' :  parcela.dias + ' dia(s) da ENTREGA'}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(parcela.valor.toFixed(2)).toLocaleString()}</td>
                                <td>
                                  <Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleFormEdit.bind(null, {...parcela, index})}><Glyphicon glyph="edit" /></Button>
                                  <Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={this.handleDeleteConfirm.bind(null, {...parcela, index})}><Glyphicon glyph="remove" /></Button>
                                </td>
                              </tr>                              
                            )
                          }
                            
                          )}
   
                          <tr>
                            <td></td>
                            <td></td>
                            <td style={{textAlign: 'right'}}><b>Total das Parcelas</b></td>
                            <td style={{textAlign: 'right'}}><b>R$ {Number(this.state.parcelas.reduce( (soma, parcela) => soma + parcela.valor, 0.0).toFixed(2)).toLocaleString()}</b></td>
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
