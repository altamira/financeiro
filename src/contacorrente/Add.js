import format from 'number-format.js';

import api from './../api/'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { 
  Modal,
  Row,
  Col, 
  Glyphicon, 
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  InputGroup
} from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';

const BrazilianDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const BrazilianMonthLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Octubro', 'Novembro', 'Dezembro'];

export default class Add extends Component {
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

      lancamento : {
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
      },

      ...this.props

    }

    // conta
    this.handleSelectBanco = this.handleSelectBanco.bind(this);
    this.handleSelectAgencia = this.handleSelectAgencia.bind(this);
    this.handleSelectConta = this.handleSelectConta.bind(this);

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleOperacao = this.handleOperacao.bind(this);
    this.handleLiquidado = this.handleLiquidado.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.documento).focus()
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

      lancamento: {
        ...this.state.lancamento,
        banco: banco.id,
        agencia: agencia.agencia,
        conta: conta.id
      }
    });
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

      lancamento: {
        ...this.state.lancamento,
        agencia: agencia.agencia,
        conta: conta.id
      }
    });
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

      lancamento: {
        ...this.state.lancamento,
        conta: conta.conta
      }
    });
  }

  handleChangeData(data) {
    this.setState({
      lancamento: {
        ...this.state.lancamento,
        data: data
      }
    })
  }
 
  handleChange(element) {
    this.setState({
      lancamento: {
        ...this.state.lancamento,
        [element.target.name]: element.target.value.toUpperCase()
      }
    });
  }

  handleOperacao(operacao) {
    this.setState({
      lancamento: {
        ...this.state.lancamento,
        operacao: operacao
      }
    })
  }

  handleLiquidado() {
    this.setState({
      lancamento: {
        ...this.state.lancamento,
        liquidado: !this.state.lancamento.liquidado
      }
    })
  }

  // Validações
  onValidateDate(propriedade) {
    let data_retroativa = new Date();
    data_retroativa.setTime(data_retroativa.getTime() - (30 * 24 * 60 * 60 * 1000))
    var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(201[6-9]|202[0-9])$/;
    return regex.test(new Date(this.state.lancamento[propriedade]).toLocaleDateString()) && 
      new Date(this.state.lancamento[propriedade]).getTime() > data_retroativa.getTime();
  }

  onValidateMoney(propriedade) {
    var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{2}$/;
    return this.state.lancamento[propriedade] &&
      regex.test(this.state.lancamento[propriedade]) && 
      this.state.lancamento[propriedade].length <= 10 &&
      isNaN(this.state.lancamento[propriedade]) && 
      parseFloat(this.state.lancamento[propriedade].replace('.', '').replace(',', '.')) > 0
      ;
  }

  onValidateEmpty(propriedade, maxLength) {
    return this.state.lancamento[propriedade] !== null && this.state.lancamento[propriedade].trim().length <= maxLength;
  }

  onValidateNotEmpty(propriedade, maxLength) {
    return this.state.lancamento[propriedade] !== null && this.state.lancamento[propriedade].trim().length > 2 && this.state.lancamento[propriedade].length <= maxLength;
  }

  handleAdd() {
    let lancamento = {

      ...this.state.lancamento,

      conta: this.state.conta.id,

      valor: parseFloat(this.state.lancamento.valor.replace('.', '').replace(',', '.'))

    }

    console.log(JSON.stringify(lancamento, null, 2));

    api.cc.movimento.add(lancamento, this.handleReset);
  }

  handleReset(lancamento) {
    this.setState({

      conta: {
        ...this.state.conta,
        saldo: this.state.conta.saldo + lancamento.valor
      },

      lancamento: {

        ...lancamento,

        id: 0,

        documento: '',
        descricao: '',
        valor: '0,00',

        liquidado: false,

      }

    }, this.props.onAdd.bind(null, lancamento))

    ReactDOM.findDOMNode(this.refs.documento).focus()
  }

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Lancamento</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            
            <Row>
              <Col md={2}>Banco</Col>
              <Col md={10}>
                <FormGroup validationState={'success'} >

                  <FormControl name="banco" componentClass="select" placeholder="Banco" value={this.state.banco.id} onChange={this.handleSelectBanco} >
                  {this.state.contas && this.state.contas.map( (banco, index) =>
                    <option key={'banco-' + index} value={banco.id} >{banco.codigo} - {banco.nome}</option>
                  )}
                  </FormControl>

                </FormGroup>
              </Col>

            </Row>
            
            <Row>

              <Col md={2}>Empresa</Col>
              <Col md={4}>
                <FormGroup validationState={'success'} >

                  <FormControl name="agencia" componentClass="select" placeholder="Agencia" value={this.state.agencia.agencia} onChange={this.handleSelectAgencia} >
                    {this.state.banco && this.state.banco.agencias.map( (agencia, index) =>
                      <option key={'agencia-' + index} value={agencia.agencia} >{agencia.agencia}</option>
                    )}
                  </FormControl>

                </FormGroup>
              </Col>

            </Row>
            
            <Row>

              <Col md={2}>Conta</Col>
              <Col md={4}>
                <FormGroup validationState={'success'} >
                  
                  <FormControl name="conta" componentClass="select" placeholder="Conta" value={this.state.conta.id} onChange={this.handleSelectConta} >
                  {this.state.agencia && this.state.agencia.contas.map( (conta, index) =>
                    <option key={'conta-' + index} value={conta.id}>{conta.conta}</option>
                  )}
                  </FormControl>

                </FormGroup>
              </Col>

              <Col md={2}>Saldo</Col>
              <Col md={4}>

                {
                  // TODO: Este caso justifica o uso de Redux para atualizar o saldo da conta e 
                  // atualizar o saldo e os lançamentos da conta na tela de lançamento que esta visivel embaixo desta
                  this.props.banco.codigo === this.state.banco.codigo && 
                  this.props.agencia.agencia === this.state.agencia.agencia && 
                  this.props.conta.conta === this.state.conta.conta && (
                    <FormGroup validationState="success">

                      <FormControl type="text" style={{textAlign: 'right', color: this.state.conta.saldo < 0 ? 'red' : 'blue'}} value={format('R$ ###.###.##0,00', this.state.conta.saldo)} readOnly />

                    </FormGroup>
                  )
                }     

              </Col>  

            </Row>

            <Row>

              <Col md={2}>Data</Col>
              <Col md={4}>
                <FormGroup validationState={this.onValidateDate('data') ? 'success' : 'error'} >

                  <DatePicker name="data" value={this.state.lancamento.data} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} onChange={this.handleChangeData} />
                
                </FormGroup>
              </Col>

            </Row>

            <Row>

              <Col md={2}>Documento</Col>
              <Col md={4}>
                <FormGroup validationState={this.onValidateEmpty('documento', 50) ? 'success' : 'error'} >
                  
                  <FormControl 
                    type="text" 
                    ref="documento"
                    name="documento" 
                    onFocus={ input => input.target.setSelectionRange(0, input.target.value.length)}
                    onKeyPress={ e => e.key === 'Enter' && ReactDOM.findDOMNode(this.refs.descricao).focus()}
                    value={this.state.lancamento.documento} 
                    onChange={this.handleChange} 
                  />
                  {/*<FormControl.Feedback />*/}

                </FormGroup>
              </Col>

            </Row>

            <Row>
              <Col md={2}>Descrição</Col>
              <Col md={10}>
                <FormGroup validationState={this.onValidateNotEmpty('descricao', 100) ? 'success' : 'error'} >

                  <FormControl 
                    type="text" 
                    ref="descricao" 
                    name="descricao" 
                    value={this.state.lancamento.descricao} 
                    onFocus={ input => input.target.setSelectionRange(0, input.target.value.length)}
                    onKeyPress={ e => e.key === 'Enter' && ReactDOM.findDOMNode(this.refs.valor).focus()}
                    onChange={this.handleChange} 
                  />
                  {/*<FormControl.Feedback />*/}

                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={2}>Valor</Col>
              <Col md={3}>
                <FormGroup validationState={this.onValidateMoney('valor') ? 'success' : 'error'} >
                  
                  <FormControl 
                    type="text" 
                    ref="valor"
                    name="valor" 
                    value={this.state.lancamento.valor} 
                    onFocus={ input => input.target.setSelectionRange(0, input.target.value.length)}
                    onKeyPress={ e => e.key === 'Enter' && this.setState({
                      lancamento: {
                        ...this.state.lancamento,
                        valor: format('###.###.##0,00', parseFloat(this.state.lancamento.valor.replace('.', '').replace(',','.')))
                      }
                    })}
                    onChange={this.handleChange} 
                    onBlur={ input => this.setState({
                      lancamento: {
                        ...this.state.lancamento,
                        valor: format('###.###.##0,00', parseFloat(this.state.lancamento.valor.replace('.', '').replace(',','.')))
                      }
                    })}
                  />
                  {/*<FormControl.Feedback />*/}

                </FormGroup>
              </Col>

              {/*<Col md={4}>Operação</Col>*/}
              <Col md={6}>
                <FormGroup>
                  <InputGroup>
                    {this.state.lancamento.operacao === 'D' ?
                      (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'D')} ><Glyphicon glyph="minus" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'D')} ><Glyphicon glyph="minus" /></Button>)
                    } <ControlLabel style={{marginLeft: '10px'}}>Debito</ControlLabel>
                    {this.state.lancamento.operacao === 'C' ?
                      (<Button bsStyle="success" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'C')} ><Glyphicon glyph="plus" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'C')} ><Glyphicon glyph="plus" /></Button>)
                    } <ControlLabel style={{marginLeft: '10px'}}>Credito</ControlLabel>
                  </InputGroup>
                  {/*<FormControl.Feedback />*/}
                </FormGroup>
              </Col>
              
            </Row>
            
            <Row>
              <Col md={2}>Liquidado</Col>
              <Col md={10}>
                <FormGroup>
                  <InputGroup>
                    {this.state.lancamento.liquidado ?
                      (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidado} ><Glyphicon glyph="ok" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidado} ><Glyphicon glyph="dot" /></Button>)
                    }
                  </InputGroup>
                  {/*<FormControl.Feedback />*/}
                </FormGroup>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Fechar</Button>
            <Button 
              bsStyle="success" 
              onClick={this.handleAdd.bind(this)} 
              disabled={!(
                this.state.banco.codigo.length &&
                this.state.agencia.agencia.length &&
                this.state.conta.conta.length && 
                this.onValidateDate('data') &&
                this.onValidateNotEmpty('descricao', 100) &&
                this.onValidateMoney('valor')
              )} 
              style={{margin: '5px'}} 
            >Gravar</Button> 
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}