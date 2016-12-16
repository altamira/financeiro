
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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
  Label,
  InputGroup
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import Error from './../../Error';

import DatePicker from 'react-bootstrap-date-picker';

//import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
//import Calc from './Calc';

import { omit, cloneDeep } from 'lodash';
import axios from 'axios';

import process from './process.svg';

export default class Faturamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "documento": {
        "nosso_numero": 0,
        "empresa": "",
        "numero": 0,
        "emissao": new Date().toISOString(),
        "entrega": new Date().toISOString(),
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
          "desconto": false
        },
        "condicao": "",
        "representante": {
          "codigo": "",
          "nome": ""
        },
        "comissao": 0,
        "desconto": 0,
        "totais": {
          "produtos": 0,
          "ipi": 0,
          "total": 0
        },
        "parcelas": []
      },

      // campos de controle, não armazenar
      dialog: null,
    }

    // comandos
    this.handleSaveAndClose = this.handleSaveAndClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    // manipulação da lista de parcelas
    this.handleFormAdd = this.handleFormAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handleNossoNumero = this.handleNossoNumero.bind(this);

  }

  componentWillMount() {
    this.loadTarefas(this.props.params.id || 0);
  }

  componentWillReceiveProps(nextProps) {
    this.loadTarefas(nextProps.params.id);    
  }
  
  loadTarefas(tarefa) {
    // carrega os parametros da tarefa
    axios
      .get('http://financeiro:1880/api/tarefa/' + tarefa)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))

        if (response.data.concluido) {
          this.setState({...response.data, dialog: <Error erro={0} mensagem={'Esta tarefa já foi concluída !'} onClose={this.handleSaveAndCloseDialog.bind(this)} />})
        } else {
          this.setState(response.data, this.handleNossoNumero);
        }
        
      })
      .catch( error => {
        alert('Erro ao obter a tarefa: ' + tarefa + '.\nErro: ' + error.message);
      })      
  }

  handleSaveAndClose() {
    axios
      .post('http://financeiro:1880/api/tarefa/' + this.props.params.id, omit(this.state, ['dialog']))
      .then( (response) => {
        console.log(response.data);
        browserHistory.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleSaveAndCloseDialog.bind(this)} />})
      })
  }

  handleComplete(data) {
    console.log(JSON.stringify(omit(this.state, ['dialog']), null, 2));
    // carrega os parametros da tarefa
    axios
      .post('http://financeiro:1880/api/financeiro/recebiveis/lancamento/tarefa/' + this.props.params.id, omit(this.state, ['dialog']))
      .then( (response) => {
        console.log(response.data);
        browserHistory.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleSaveAndCloseDialog.bind(this)} />})
      })
  }

  // manipuladores da lista de parcelas
  handleFormAdd() {
    this.setState({dialog: <Edit 
      parcela={{
          origem: 'VENDA',
          forma_pagto: 'COBRANCA',
          tipo_vencto: 'DDL',
          emissao: this.state.documento.emissao, 
          entrega: this.state.documento.entrega, 
          inicial: this.state.documento.entrega,
          vencto: this.state.documento.entrega,
          parcela: this.state.documento.parcelas.length + 1,
          prazo: 0,
          porcentagem: 0,
          descricao: "",
          valor: 0.0
        }}      
      onSave={this.handleAdd.bind(this)} 
      onClose={this.handleSaveAndCloseDialog.bind(this)} />})
  }

  handleAdd(parcela) {
    this.setState({documento: {...this.state.documento, parcelas: this.state.documento.parcelas.concat([parcela])}, dialog: null});
  }

  handleFormEdit(parcela, index) {
    this.setState({dialog: <Edit 
      parcela={{...parcela, 
          emissao: this.state.documento.emissao, 
          entrega: this.state.documento.entrega, 
          inicial: this.state.documento.tipo === 'DDP' ? this.state.documento.emissao : this.state.documento.entrega
        }} 
      index={index}
      onSave={this.handleUpdate.bind(this)} 
      onClose={this.handleSaveAndCloseDialog.bind(this)} />})
  }

  handleUpdate(parcela, index) {
    let parcelas = this.state.documento.parcelas;
    parcelas.splice(index, 1, parcela);
    this.setState({documento: {...this.state.documento, parcelas: parcelas}, dialog: undefined})
  }

  handleDeleteConfirm(parcela, index) {
    this.setState({dialog: <Delete parcela={parcela} index={index} onSave={this.handleDelete.bind(this)} onClose={this.handleSaveAndCloseDialog.bind(this)} />})
  }

  handleDelete(parcela, index) {
    this.setState(
    {
      documento: 
      {
        ...this.state.documento, 
        parcelas: 
          this.state.documento.parcelas
          .filter( (parcela, i) => i != index)
          .map( (parcela, i) => {
            parcela.parcela = i + 1;
            return parcela;
          })
      }, 
      dialog: undefined
    });
  }

  handleCopy(parcela, index) {
    this.setState(
    {
      documento: 
      {
        ...this.state.documento, 
        parcelas: 
          this.state.documento.parcelas.concat([cloneDeep(this.state.documento.parcelas[index])])
          .map( (p, i) => {
            p.parcela = i + 1;
            return p;
          })
      }
    });
  }

  handleSaveAndCloseDialog() {
    this.setState({dialog: null})
  }

  // formulario
  handleChange(value) {
    this.setState({documento: {...this.state.documento, [value.target.id]: value.target.value}});
  }

  handleNossoNumero() {
    axios
      .get('http://financeiro:1880/api/financeiro/recebiveis/lancamento/nosso_numero1')
      .then( (response) => {
        this.setState({documento: {...this.state.documento, nosso_numero: response.data.nosso_numero + 1}})
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleSaveAndCloseDialog.bind(this)} />})
      })
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

    return (

      <div>

        <Panel header={'Gerar lançamentos para Contas a Receber - Pedido ' + (this.state.numero)} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Confirmar lançamentos</Tooltip>)}
              >
                  <Button
                    onClick={this.handleComplete}
                    disabled={!this.state.documento.parcelas.length}
                    style={{width: 120}}
                    bsStyle="success"
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
                    onClick={this.handleSaveAndClose}
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

                  <Row style={{paddingTop: 20}} >
                    <Col xs={12} md={2}>Nosso Número</Col>
                    <Col xs={12} md={3}>
                      <FormGroup>
                        <InputGroup>
                        <FormControl type="text" id="nosso_numero" value={this.state.documento.nosso_numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                        <InputGroup.Addon className='btn-success' style={{cursor: 'pointer'}} >
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nosso_numero'}>Atualizar Nosso Número</Tooltip>}>
                            <Glyphicon glyph="transfer" style={{color: '#fff'}} onClick={this.handleNossoNumero} />
                        </OverlayTrigger>
                        </InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={7}></Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={2}>Pedido</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        <FormControl type="text" id="numero" value={this.state.documento.numero} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker id="emissao" value={this.state.documento.emissao} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker id="entrega" value={this.state.documento.entrega} onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} id="cnpj" value={this.state.documento.cliente.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={5}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" id="representante" value={this.state.documento.representante.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" id="nome" value={this.state.documento.cliente.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Valor Produtos</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.documento.totais.produtos.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>IPI</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.documento.totais.ipi.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Total</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} value={'R$ ' + Number(this.state.documento.totais.total.toFixed(2)).toLocaleString()} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th style={{textAlign: 'center'}}>Origem</th>
                            <th style={{textAlign: 'center'}}>Forma Pagto</th>
                            <th>Vencimento</th>
                            <th>Parcela</th>
                            <th>Prazo</th>
                            <th style={{textAlign: 'right'}}>Valor da Parcela</th>
                            <th style={{width: '1%'}}><Button style={{width: '110px'}} bsStyle="success" bsSize="small" onClick={this.handleFormAdd}><Glyphicon glyph="plus" /> Incluir</Button></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.documento.parcelas.map( (parcela, index) => {
                            return (
                              <tr key={'tr-' + index} id={'tr-' + index} >
                                <td style={{textAlign: 'center'}}>{origem[parcela.origem]}</td>
                                <td style={{textAlign: 'center'}}>{forma_pagto[parcela.forma_pagto]}</td>
                                <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela}/{this.state.documento.parcelas.length}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo_vencto === "DDP" ? 'SINAL' : parcela.prazo + ' ' + tipo_vencto[parcela.tipo_vencto]}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(parcela.valor.toFixed(2)).toLocaleString()}</td>
                                <td>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_duplicar' + index} >Duplicar</Tooltip>}>
                                    <Button bsStyle="info" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleCopy.bind(null, parcela, index)}>
                                      <Glyphicon glyph="random" />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_alterar' + index} >Alterar</Tooltip>}>
                                    <Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleFormEdit.bind(null, parcela, index)}>
                                      <Glyphicon glyph="edit" />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_excluir' + index}>Excluir</Tooltip>}>
                                    <Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={this.handleDeleteConfirm.bind(null, parcela, index)}>
                                      <Glyphicon glyph="remove" />
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>                              
                            )
                          }
                            
                          )}
   
                          <tr>
                            <td colSpan={4}></td>
                            <td style={{textAlign: 'right'}}><b>Total das Parcelas</b></td>
                            <td style={{textAlign: 'right'}}><b>R$ {Number(this.state.documento.parcelas.reduce( (soma, parcela) => soma + parcela.valor, 0.0).toFixed(2)).toLocaleString()}</b></td>
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
