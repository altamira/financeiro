import format from 'number-format.js';

import api from './../api/'

import React, { Component } from 'react';

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

      lancamento: {

        data: new Date().toISOString(),
        documento: '',
        descricao: '',
        valor: '0,00',

        operacao: 'D',
        liquidado: false,

      },

      ...this.props,

    }

    // conta
    this.handleSelectBanco = this.handleSelectBanco.bind(this);
    this.handleSelectAgencia = this.handleSelectAgencia.bind(this);
    this.handleSelectConta = this.handleSelectConta.bind(this);

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleOperacao = this.handleOperacao.bind(this);
    this.handleLiquidado = this.handleLiquidado.bind(this);
  }

  handleSelectBanco(element) {
    let banco = this.state.contas.find( banco => banco.codigo === element.target.value) || {
      codigo: '',
      nome: '',
      agencias: [
        {
          agencia: '',
          contas: [
            {
              conta: '',
              saldo: 0.00
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
      conta: conta
    });
  }

  handleSelectAgencia(element) {
    let agencia = this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value) || {
      agencia: '',
      contas: [
        {
          conta: '',
          saldo: 0.00
        }
      ]
    }

    let conta = agencia.contas[0]

    this.setState({
      agencia: agencia,
      conta: conta
    });
  }

  handleSelectConta(element) {
    let conta = this.state.agencia.contas.find( conta => conta.conta === element.target.value) || {
      conta: '',
      saldo: 0.00
    }

    this.setState({conta: conta});
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
        [element.target.name]: element.target.value
      }
    });
  }

  handleOperacao(operacao) {
    console.log('operacao: ' + this.state.operacao);

    this.setState({
      lancamento: {
        ...this.state.lancamento,
        operacao: operacao
      }
    })
  }

  handleLiquidado() {
    console.log('liquidado: ' + this.state.lancamento.liquidado);

    this.setState({
      lancamento: {
        ...this.state.lancamento,
        liquidado: !this.state.lancamento.liquidado
      }
    })
  }

  // Validações
  onValidateDate(propriedade) {
    let data_valida = new Date();
    data_valida.setTime(data_valida.getTime() - (30 * 24 * 60 * 60 * 1000))
    var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(201[6-9]|202[0-9])$/;
    return regex.test(new Date(this.state.lancamento[propriedade]).toLocaleDateString()) && 
      new Date(this.state.lancamento[propriedade]).getTime() > data_valida.getTime();
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

  handleSave() {
    let lancamento = {

      ...this.state.lancamento,

      banco: this.state.banco.codigo,
      agencia: this.state.agencia.agencia,
      conta: this.state.conta.conta,

      valor: parseFloat(this.state.lancamento.valor.replace('.', '').replace(',', '.'))

    }

    console.log(JSON.stringify(lancamento, null, 2));

    api.cc.movimento.save(lancamento, this.handleReset);
  }

  handleReset(lancamento) {
    this.setState({
      lancamento: {

        data: new Date().toISOString(),
        documento: '',
        descricao: '',
        valor: '0,00',

        operacao: 'D',
        liquidado: false,

      }
    }, this.props.onSave.bind(null, lancamento))
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
                  <FormControl name="banco" componentClass="select" placeholder="Banco" value={this.state.banco.codigo} onChange={this.handleSelectBanco} >
                  {this.state.contas && this.state.contas.map( (banco, index) =>
                    <option key={'banco-' + index} value={banco.codigo} >{banco.codigo} - {banco.nome}</option>
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
                  
                  <FormControl name="conta" componentClass="select" placeholder="Conta" value={this.state.conta.conta} onChange={this.handleSelectConta} >
                  {this.state.agencia && this.state.agencia.contas.map( (conta, index) =>
                    <option key={'conta-' + index} value={conta.conta}>{conta.conta}</option>
                  )}
                  </FormControl>
                </FormGroup>
              </Col>

              <Col md={2}>Saldo</Col>
              <Col md={4}>
                <FormGroup validationState="success">
                  
                  <FormControl type="text" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', this.state.conta.saldo)} readOnly />
                </FormGroup>
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
                  
                  <FormControl type="text" name="documento" value={this.state.lancamento.documento} onChange={this.handleChange} />
                  {/*<FormControl.Feedback />*/}
                </FormGroup>
              </Col>

            </Row>

            <Row>
              <Col md={2}>Descrição</Col>
              <Col md={10}>
                <FormGroup validationState={this.onValidateNotEmpty('descricao', 100) ? 'success' : 'error'} >
                  <FormControl type="text" name="descricao" value={this.state.lancamento.descricao} onChange={this.handleChange} />
                  {/*<FormControl.Feedback />*/}
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={2}>Valor</Col>
              <Col md={3}>
                <FormGroup validationState={this.onValidateMoney('valor') ? 'success' : 'error'} >
                  <FormControl type="text" name="valor" value={this.state.lancamento.valor} onChange={this.handleChange} />
                  {/*<FormControl.Feedback />*/}
                </FormGroup>
              </Col>

              {/*<Col md={4}>Operação</Col>*/}
              <Col md={6}>
                <FormGroup>
                  <InputGroup>
                    {this.state.lancamento.operacao === 'D' ?
                      (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'C')} ><Glyphicon glyph="minus" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'D')} ><Glyphicon glyph="minus" /></Button>)
                    } <ControlLabel style={{marginLeft: '10px'}}>Debito</ControlLabel>
                    {this.state.lancamento.operacao === 'C' ?
                      (<Button bsStyle="success" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={this.handleOperacao.bind(null, 'D')} ><Glyphicon glyph="plus" /></Button>) :                                 
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
              onClick={this.handleSave.bind(this)} 
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