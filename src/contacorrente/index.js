import format from 'number-format.js';

import api from './../api/'

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
  ControlLabel,
  FormControl,
  Table,
  Tooltip
} from 'react-bootstrap';

import Spinner from 'react-spinkit';

import Add from './Add';
import Edit from './Edit';
import Search from './Search';

export default class ContaCorrente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contas: [],

      banco: {
        id: 0,
        codigo: '',
        nome: '',
        agencias: []
      },

      agencia: {
        agencia: '',
        contas: []
      },

      conta: {
        id: 0,
        conta: '',
        saldo: 0.00,
        ativo: false
      },

      movimento: [
        /*{
          id: 0,
          banco: '',
          agencia: '',
          conta: '',
          data: new Date().toISOString(),
          documento: '',
          descricao: '',
          valor: 0.00,
          operacao: 'D',
          liquidado: false,
        }*/
      ]

    }

    this.loadContas = this.loadContas.bind(this);

    // conta
    this.handleSelectBanco = this.handleSelectBanco.bind(this);
    this.handleSelectAgencia = this.handleSelectAgencia.bind(this);
    this.handleSelectConta = this.handleSelectConta.bind(this);

    // manipulação dos lancamentos
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAfterAdd = this.handleAfterAdd.bind(this);
    this.handleAfterEdit = this.handleAfterEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.handleLiquidar = this.handleLiquidar.bind(this);
    this.handleLiquidado = this.handleLiquidado.bind(this);
    this.handleAfterLiquidado = this.handleAfterLiquidado.bind(this);

  }

  componentWillMount() {
    api.cc.conta.list(this.loadContas);
  }

  loadContas(contas) {
    let banco = contas[0] || {
      id: 0,
      codigo: '',
      nome: '',
      agencias: [
        {
          agencia: '',
          contas: [
            {
              id: 0,
              conta: '',
              saldo: 0.00,
              ativo: false
            }
          ]
        }
      ]
    }

    let agencia = banco.agencias[0]

    let conta = agencia.contas[0]

    this.setState({
      contas: contas,

      banco: banco,

      agencia: agencia,

      conta: conta

    }, this.getMovimento)
  }

  handleSelectBanco(element) {
    let banco = this.state.contas.find( banco => banco.id === parseInt(element.target.value, 10)) || {
      id: 0,
      codigo: '',
      nome: '',
      agencias: [
        {
          agencia: '',
          contas: [
            {
              id: 0,
              conta: '',
              saldo: 0.00,
              ativo: false
            }
          ]
        }
      ]
    }

    let agencia = banco.agencias[0]

    let conta = agencia.contas[0]

    this.setState({

      banco: banco,

      agencia: agencia,

      conta: conta,

      movimento: []

    }, this.getMovimento);
  }

  handleSelectAgencia(element) {
    let agencia = this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value) || {
      agencia: '',
      contas: [
        {
          id: 0,
          conta: '',
          saldo: 0.00,
          ativo: false
        }
      ]
    }

    let conta = agencia.contas[0]

    this.setState({

      agencia: agencia,

      conta: conta,

      movimento: []

    }, this.getMovimento);
  }

  handleSelectConta(element) {
    let conta = this.state.agencia.contas.find( conta => conta.id === parseInt(element.target.value, 10)) || {
      id: 0,
      conta: '',
      saldo: 0.00,
      ativo: false
    }

    this.setState({

      conta: conta,

      movimento: []

    }, this.getMovimento);
  }

  getMovimento() {
    if (this.state.conta.id) {
      this.setState({
        isLoading: true
      }, api.cc.movimento.list(this.state.conta.id, false, this.handleResult.bind(this)) )
    }
  }

  handleResult(result) {
    if (!Array.isArray(result) || !result.length) {
      this.setState({
        isLoading: undefined
      }, window.errHandler.bind(null, {erro: 0, mensagem: 'Nenhum lançamento encontrado.'}) )
    } else {
      
      console.log('Saldo conferido: ' + format('R$ ###.###.##0,00', result.find( lancamento => !lancamento.id).valor || 0))

      this.setState({

        conta: {
          ...this.state.conta,
          saldo: result.find( lancamento => !lancamento.id).valor || 0
        },

        movimento: result, 

        isLoading: undefined

      })
    }
  }

  handleLiquidar(lancamento) {
    api.cc.movimento.liquidar({
      ...lancamento,
      liquidado: !lancamento.liquidado
    }, this.handleLiquidado)
  }

  handleLiquidado(liquidado) {
    liquidado.liquidado = !!liquidado.liquidado

    let movimento = this.state.movimento;
    let index = movimento.findIndex( l => l.id === liquidado.id)

    movimento[index] = liquidado
    this.setState({
      movimento: movimento, 
      dialog: undefined
    })
  }

  handleNew() {
    this.setState({dialog: <Add 

      contas={this.state.contas}
      banco={this.state.banco}
      agencia={this.state.agencia}
      conta={{
        ...this.state.conta,
        saldo: this.state.movimento.filter( lancamento => lancamento.id).reduce( (saldo, lancamento) => saldo + lancamento.valor, (this.state.conta.saldo || 0.00)) 
      }}

      onAdd={this.handleAfterAdd.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />
    })
  }

  handleAfterAdd(lancamento) {
    if (lancamento.conta === this.state.conta.id) {

      lancamento.liquidado = !!lancamento.liquidado
      
      let movimento = this.state.movimento;
      movimento.push(lancamento)

      this.setState({
        movimento: movimento.sort( (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      })

    }
  }

  handleEdit(lancamento) {
    this.setState({dialog: <Edit 

      contas={this.state.contas}
      banco={this.state.banco}
      agencia={this.state.agencia}
      conta={{
        ...this.state.conta,
        saldo: this.state.movimento.filter( lancamento => lancamento.id).reduce( (saldo, lancamento) => saldo + lancamento.valor, (this.state.conta.saldo || 0.00)) 
      }}

      lancamento={lancamento}

      onEdit={this.handleAfterEdit.bind(this)} 
      onDelete={this.handleAfterDelete.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />
    })
  }

  handleAfterEdit(original, alterado) {
    if (alterado.conta === this.state.conta.id) {

      alterado.liquidado = !!alterado.liquidado
      
      let movimento = this.state.movimento;
      let index = movimento.findIndex( l => l.id === alterado.id)

      if (index < 0) {
        movimento.push(alterado)
      } else {
        movimento[index] = alterado  
      }

      this.setState({
        movimento: movimento.sort( (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      })

    } else {

      let movimento = this.state.movimento;
      let index = movimento.findIndex( l => l.id === alterado.id)

      if (index >= 0) {
        movimento.splice(index, 1)
      }

      this.setState({
        movimento: movimento
      })

    }
  }

  handleAfterLiquidado(original, alterado) {
    if (alterado.conta === this.state.conta.id) {

      alterado.liquidado = !!alterado.liquidado
      
      let conta = this.state.conta;
      let movimento = this.state.movimento;
      let index = movimento.findIndex( l => l.id === alterado.id)

      if (index < 0) {
        conta.saldo -= alterado.valor
        movimento.push(alterado)
      } else {
        movimento[index] = alterado  
      }

      this.setState({
        conta: conta,
        movimento: movimento.sort( (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      })

    }
  }

  handleAfterDelete(original, excluido) {
    let movimento = this.state.movimento;
    let index = movimento.findIndex( l => l.id === excluido.id)

    if (index >= 0) {
      movimento.splice(index, 1)
    }

    this.setState({
      movimento: movimento, 
      dialog: undefined
    })
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  handleSearch() {
    this.setState({
      dialog: 
        <Search 
          
          banco={this.state.banco}
          agencia={this.state.agencia}
          conta={this.state.conta}

          onLiquidado={this.handleAfterLiquidado.bind(this)} 
          onEdit={this.handleEdit.bind(this)} 
          onClose={this.handleCloseDialog.bind(this)} 
          
        />
    })
  }

  render() {

    let saldo = (this.state.conta && this.state.conta.saldo) || 0;

    let saldo_conferido = this.state.movimento
                        .filter( lancamento => lancamento.id && lancamento.liquidado)
                        .reduce( (saldo, lancamento) => saldo + lancamento.valor, (this.state.conta.saldo || 0.00))

    let saldo_conta = this.state.movimento
                        .filter( lancamento => lancamento.id)
                        .reduce( (saldo, lancamento) => saldo + lancamento.valor, (this.state.conta.saldo || 0.00))

    return (

      <div>

        <Panel header={'Lançamentos de Conta Corrente'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>

            <Col md={3} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Novo Lançamento</Tooltip>)}
              >
                  <Button
                    onClick={this.handleNew}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="plus" />
                    <div><span>Incluir</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col md={3} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Visualizar os últimos 100 lançamentos liquidados</Tooltip>)}
              >
                  <Button
                    onClick={this.handleSearch}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="search" />
                    <div><span>Visualizar</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col md={3} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Atualizar tela para mostrar somente os lançamentos em aberto</Tooltip>)}
              >
                  <Button
                    onClick={this.getMovimento.bind(this)}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="refresh" />
                    <div><span>Atualizar</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col md={3} style={{textAlign: 'right'}} >

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

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingTop: 20}}>

            <Col xs={12} md={4}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Banco</ControlLabel>
                <FormControl name="banco" componentClass="select" placeholder="Banco" value={this.state.banco.id} onChange={this.handleSelectBanco} >
                {this.state.contas && this.state.contas.map( (banco, index) =>
                  <option key={'banco-' + index} value={banco.id}>{banco.codigo} - {banco.nome}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={2}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Empresa</ControlLabel>
                <FormControl name="agencia" componentClass="select" placeholder="Agencia" value={this.state.agencia.agencia} onChange={this.handleSelectAgencia} >
                {this.state.banco && this.state.banco.agencias.map( (agencia, index) =>
                  <option key={'agencia-' + index} value={agencia.agencia}>{agencia.agencia}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={2}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Conta</ControlLabel>
                <FormControl name="conta" componentClass="select" placeholder="Conta" value={this.state.conta.id} onChange={this.handleSelectConta} >
                {this.state.agencia && this.state.agencia.contas.map( (conta, index) =>
                  <option key={'conta-' + index} value={conta.id}>{conta.conta}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup validationState="success">
                <ControlLabel>Saldo da Conta</ControlLabel>
                <FormControl 
                  type="text" 
                  style={{textAlign: 'right', color: saldo_conta < 0 ? 'red' : 'blue'}} 
                  value={format('R$ ###.###.##0,00', saldo_conta)} 
                  readOnly 
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup validationState="success">
                <ControlLabel>Saldo Conferido</ControlLabel>
                <FormControl 
                  type="text" 
                  style={{textAlign: 'right', color: saldo_conferido < 0 ? 'red' : 'blue'}} 
                  value={format('R$ ###.###.##0,00', saldo_conferido)} 
                  readOnly 
                />
              </FormGroup>
            </Col>

          </Row>

          <Row style={{paddingTop: 10}}>
            <Col xs={12} md={12}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Data</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Descricao</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Documento</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Liquidado</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center', width: 20}}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movimento
                    .filter( lancamento => lancamento.id)
                    .map( (lancamento, index) => {
                      saldo += lancamento.id ? lancamento.valor : 0;

                      return (
                        <tr key={'tr-' + index} id={'tr-' + index} >
                          <td style={{textAlign: 'center', cursor: 'pointer'}}><a onClick={this.handleEdit.bind(null, lancamento)}>{new Date(lancamento.data).fromUTC().toLocaleDateString()}</a></td>
                          <td style={{}}>{lancamento.descricao}</td>
                          <td style={{textAlign: 'center'}}>{lancamento.documento}</td>
                          <td style={{textAlign: 'center'}}>
                            {lancamento.liquidado ?
                              (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidar.bind(null, lancamento)} ><Glyphicon glyph="ok" /></Button>) :                                 
                              (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidar.bind(null, lancamento)} ><Glyphicon glyph="dot" /></Button>)
                            }
                          </td>
                          <td style={{textAlign: 'right', whiteSpace: 'nowrap', color: lancamento.valor < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', lancamento.valor)}</td>
                          <td style={{textAlign: 'right', whiteSpace: 'nowrap', color: saldo < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', saldo)}</td>
                          <td>
                            <Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={this.handleEdit.bind(null, lancamento)} ><Glyphicon glyph="edit" /></Button>
                          </td>
                        </tr>                              
                      )
                    }
                    
                  )}

                </tbody>
              </Table>

              {this.state.isLoading && 
                <div style={{textAlign: 'center'}}>
                  <Spinner spinnerName="three-bounce" />
                </div>
              }

            </Col>
          </Row>

        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
