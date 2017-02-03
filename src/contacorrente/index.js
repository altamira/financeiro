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

import Edit from './Edit';
import Search from './Search';

export default class ContaCorrente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contas: [],

      banco: {
        codigo: '',
        nome: '',
        agencias: []
      },

      agencia: {
        agencia: '',
        contas: []
      },

      conta: {
        conta: '',
        saldo: 0.00
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
    this.handleAfterSave = this.handleAfterSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.handleSelectLancamento = this.handleSelectLancamento.bind(this);

  }

  componentWillMount() {
    api.cc.conta.list(this.loadContas);
  }

  loadContas(contas) {
    this.setState({contas: contas})
  }

  handleSelectBanco(element) {
    this.setState({

      banco: this.state.contas.find( banco => banco.codigo === element.target.value),

      agencia: this.state.contas.find( banco => banco.codigo === element.target.value).agencias[0] || {
        agencia: '',
        contas: []
      },

      conta: (this.state.contas.find( banco => banco.codigo === element.target.value).agencias[0] || {
        agencia: '',
        contas: []
      }).contas[0] || {
        conta: '',
        saldo: 0.00
      },

      movimento: []

    }, this.getMovimento);
  }

  handleSelectAgencia(element) {
    this.setState({

      agencia: this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value),

      conta: this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value).contas[0] || {
        conta: '',
        saldo: 0.00
      },

      movimento: []

    }, this.getMovimento);
  }

  handleSelectConta(element) {
    this.setState({

      conta: this.state.agencia.contas.find( conta => conta.conta === element.target.value),

      movimento: []

    }, this.getMovimento);
  }

  getMovimento() {
    api.cc.movimento.list(this.state.banco.codigo, this.state.agencia.agencia, this.state.conta.conta, false, this.loadMovimento.bind(this))  
  }

  loadMovimento(movimento) {
    this.setState({

      movimento: movimento.map( lancamento => {
        lancamento.data = new Date(lancamento.data).fromUTC().toISOString();
        return lancamento;
      })

    })
  }

  handleSelectLancamento(lancamento) {

    console.log(JSON.stringify(lancamento, null, 2));

    this.setState({

      movimento: this.state.movimento.map( l => {
        if (lancamento.id === l.id) {
          l.liquidado = !l.liquidado
        }
        return l;
      })

    })

  }

  // manipuladores da lista de parcelas
  handleNew() {
    this.setState({dialog: <Edit 

      contas={this.state.contas}
      banco={this.state.banco}
      agencia={this.state.agencia}
      conta={this.state.conta}

      lancamento={
        {
          id: 0,
          banco: '',
          agencia: '',
          conta: '',
          data: new Date().toISOString(),
          documento: '',
          descricao: '',
          valor: '0,00',
          operacao: 'D',
          liquidado: false,
        }
      }      

      onSave={this.handleAfterSave.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleEdit(lancamento, index) {
    this.setState({dialog: <Edit 

      contas={this.state.contas}
      banco={this.state.banco}
      agencia={this.state.agencia}
      conta={this.state.conta}

      lancamento={
        {
          ...lancamento,
          valor: lancamento.valor.toFixed(2).replace('-', '').replace('.', ',')
        }
      }

      onSave={this.handleAfterSave.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleAfterSave(lancamento) {
    if (lancamento.banco === this.state.banco.codigo &&
      lancamento.agencia === this.state.agencia.agencia &&
      lancamento.conta === this.state.conta.conta) {

      let movimento = this.state.movimento;

      let index = movimento.findIndex( l => l.id === lancamento.id);

      movimento.splice(index, index < 0 ? 0 : index, index < 0 ? lancamento : null)
      
      this.setState({movimento: movimento, dialog: undefined})
    }
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  handleSearch() {
    this.setState({dialog: <Search 
      onSelect={this.handleEdit.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  render() {

    let saldo = this.state.conta && this.state.conta.saldo || 0;

    return (

      <div>

        <Panel header={'Lançamentos de Conta Corrente'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>

            <Col xs={4} md={4} >

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

            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Procurar um Lançamento</Tooltip>)}
              >
                  <Button
                    onClick={this.handleSearch}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="search" />
                    <div><span>Busca</span></div>
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

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingTop: 20}}>

            <Col xs={12} md={4}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Banco</ControlLabel>
                <FormControl name="banco" componentClass="select" placeholder="Banco" value={this.state.banco.codigo} onChange={this.handleSelectBanco} >
                {this.state.contas && this.state.contas.map( (banco, index) =>
                  <option key={'banco-' + index} value={banco.codigo} >{banco.codigo} - {banco.nome}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={2}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Agencia</ControlLabel>
                <FormControl name="agencia" componentClass="select" placeholder="Agencia" value={this.state.agencia.agencia} onChange={this.handleSelectAgencia} >
                {this.state.banco && this.state.banco.agencias.map( (agencia, index) =>
                  <option key={'agencia-' + index} value={agencia.agencia} >{agencia.agencia}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={2}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Conta</ControlLabel>
                <FormControl name="conta" componentClass="select" placeholder="Conta" value={this.state.conta.conta} onChange={this.handleSelectConta} >
                {this.state.agencia && this.state.agencia.contas.map( (conta, index) =>
                  <option key={'conta-' + index} value={conta.conta}>{conta.conta}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup validationState="success">
                <ControlLabel>Saldo da Conta</ControlLabel>
                <FormControl type="text" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', (this.state.conta.saldo || 0.00))} readOnly />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup validationState="success">
                <ControlLabel>Saldo Conferido</ControlLabel>
                <FormControl type="text" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', (this.state.conta.saldo || 0.00) + this.state.movimento.filter( lancamento => lancamento.liquidado).reduce( (saldo, lancamento) => saldo + lancamento.valor, 0.00)) } readOnly />
              </FormGroup>
            </Col>

          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Data</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Descricao</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Documento</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}} >Liquidado</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}} >Valor</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                    {/*<th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center', width: 20}}></th>*/}
                  </tr>
                </thead>
                <tbody>
                  {this.state.movimento.map( (lancamento, index) => {
                    let data = new Date(lancamento.data);
                    saldo += lancamento.valor;

                    return (
                      <tr key={'tr-' + index} id={'tr-' + index} >
                        <td style={{textAlign: 'center', cursor: 'pointer'}}><a onClick={this.handleEdit.bind(null, lancamento)}>{data.toLocaleDateString()}</a></td>
                        <td style={{}}>{lancamento.descricao}</td>
                        <td style={{textAlign: 'center'}}>{lancamento.documento}</td>
                        <td style={{textAlign: 'center'}}>
                          {lancamento.liquidado ?
                            (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleSelectLancamento.bind(null, lancamento)} ><Glyphicon glyph="ok" /></Button>) :                                 
                            (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleSelectLancamento.bind(null, lancamento)} ><Glyphicon glyph="dot" /></Button>)
                          }
                        </td>
                        <td style={{textAlign: 'right', color: lancamento.valor < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', lancamento.valor)}</td>
                        <td style={{textAlign: 'right', color: saldo < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', saldo)}</td>
                        {/*<td>
                          <Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={this.handleEdit.bind(null, lancamento)} ><Glyphicon glyph="edit" /></Button>
                        </td>*/}
                      </tr>                              
                    )
                  }
                    
                  )}

                </tbody>
              </Table>
            </Col>
          </Row>

        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
