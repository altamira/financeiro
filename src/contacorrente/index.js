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

      conta: {
        saldo: 0
      },

      movimento: [
        {
          sequencia: 0,
          banco: '',
          agencia: '',
          conta: '',
          data: new Date().toISOString(),
          cheque: '',
          liquidado: false,
          descricao: '',
          valor: 0.00,
          operacao: 'D',
          investimento: false
        }
      ]

    }

    // conta
    this.handleSelectConta = this.handleSelectConta.bind(this);

    // manipulação dos lancamentos
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.loadContas = this.loadContas.bind(this);

  }

  componentWillMount() {
    api.cc.conta.list(this.loadContas);
  }

  loadContas(contas) {
    if (contas.length) {
      this.setState({conta: contas[0], contas: contas})  
    }
  }

  handleSelectConta(element) {
    this.setState({conta: this.state.contas[parseInt(element.target.value, 10)]}, this.getMovimento.bind(this));
  }

  getMovimento() {
    api.cc.movimento.list(this.state.conta, false, this.loadMovimento.bind(this))
  }

  loadMovimento(movimento) {
    this.setState({movimento: movimento})
  }

  handleSelect(lancamento) {

    console.log(JSON.stringify(lancamento, null, 2));

    this.setState({
      movimento: this.state.movimento.map( l => {
        if (lancamento.sequencia === l.sequencia) {
          l.liquidado = l.liquidado === '1' ? '0' : '1'
        }
        return l;
      })
    })

  }

  handleUnselect() {
  }

  // manipuladores da lista de parcelas
  handleNew() {
    this.setState({dialog: <Edit 
      lancamento={
        {
          sequencia: 0,
          banco: '',
          agencia: '',
          conta: '',
          data: new Date().toISOString(),
          cheque: '',
          liquidado: false,
          descricao: '',
          valor: 0.00,
          operacao: 'D',
          investimento: false
        }
      }      
      onSave={this.handleAdd.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleAdd(lancamento) {
    this.setState({dialog: null});
  }

  handleEdit(lancamento, index) {
    this.setState({dialog: <Edit 
      lancamento={lancamento} 
      index={index}
      onSave={this.handleUpdate.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleUpdate(lancamento, index) {
    let movimento = this.state.movimento;
    movimento.splice(index, 1, {
      ...lancamento   
    });
    this.setState({movimento: movimento, dialog: undefined})
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

    let saldo = this.state.conta.saldo_inicial || 0;

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
                <FormControl name="origem" componentClass="select" placeholder="Conta Corrente" value={this.state.conta} onChange={this.handleSelectConta} >
                {this.state.contas && this.state.contas.map( (conta, index) =>
                  <option key={'option-' + index} value={index}>{conta.codigo} {conta.nome} {conta.agencia} {conta.conta}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Agencia</ControlLabel>
                <FormControl name="origem" componentClass="select" placeholder="Conta Corrente" value={this.state.conta} onChange={this.handleSelectConta} >
                {this.state.contas && this.state.contas.map( (conta, index) =>
                  <option key={'option-' + index} value={index}>{conta.codigo} {conta.nome} {conta.agencia} {conta.conta}</option>
                )}
                </FormControl>
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup validationState={'success'} >
                <ControlLabel>Conta</ControlLabel>
                <FormControl name="origem" componentClass="select" placeholder="Conta Corrente" value={this.state.conta} onChange={this.handleSelectConta} >
                {this.state.contas && this.state.contas.map( (conta, index) =>
                  <option key={'option-' + index} value={index}>{conta.codigo} {conta.nome} {conta.agencia} {conta.conta}</option>
                )}
                </FormControl>
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
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Cheque</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}} >Liquidado</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}} >Valor</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                    <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center', width: 20}}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.movimento.map( (lancamento, index) => {
                    let data = new Date(lancamento.data);
                    saldo += lancamento.valor;

                    return (
                      <tr key={'tr-' + index} id={'tr-' + index} >
                        <td style={{textAlign: 'center'}}><a onClick={this.handleEdit.bind(null, lancamento)}>{data.toLocaleDateString()}</a></td>
                        <td style={{}}>{lancamento.descricao}</td>
                        <td style={{textAlign: 'center'}}>{lancamento.cheque}</td>
                        <td style={{textAlign: 'center'}}>
                          {lancamento.liquidado === '1' ?
                            (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleSelect.bind(null, lancamento)} ><Glyphicon glyph="ok" /></Button>) :                                 
                            (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleSelect.bind(null, lancamento)} ><Glyphicon glyph="dot" /></Button>)
                          }
                        </td>
                        <td style={{textAlign: 'right', color: lancamento.valor < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', lancamento.valor)}</td>
                        <td style={{textAlign: 'right', color: saldo < 0 ? 'red' : 'blue'}}>{format('R$ ###.###.##0,00', saldo)}</td>
                        <td>
                          <Button bsStyle="primary" style={{width: '33px'}} bsSize="small" onClick={this.handleEdit.bind(null, lancamento)} ><Glyphicon glyph="edit" /></Button>
                        </td>
                      </tr>                              
                    )
                  }
                    
                  )}

                  <tr>
                    <td colSpan={4}></td>
                    <td style={{textAlign: 'right'}}><b>Saldo Conferido</b></td>
                    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', this.state.movimento.reduce( (soma, lancamento) => soma + lancamento.valor, 0.0))}</b></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/*<Row>
            <Col xs={12} md={2}>Saldo Conferido</Col>
            <Col xs={12} md={10}>
              <FormGroup validationState="success">
                <FormControl type="text" value={this.state.conta.saldo} readOnly />
              </FormGroup>
            </Col>
          </Row>*/}

        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
