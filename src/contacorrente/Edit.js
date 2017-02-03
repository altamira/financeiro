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

export default class Edit extends Component {
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

    this.handleDebitoCredito = this.handleDebitoCredito.bind(this);
    this.handleLiquidado = this.handleLiquidado.bind(this);
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
      }
    }, this.getMovimento);
  }

  handleSelectAgencia(element) {
    this.setState({
      agencia: this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value),
      conta: this.state.banco.agencias.find( agencia => agencia.agencia === element.target.value).contas[0] || {
        conta: '',
        saldo: 0.00
      }
    }, this.getMovimento);
  }

  handleSelectConta(element) {
    this.setState({conta: this.state.agencia.contas.find( conta => conta.conta === element.target.value)}, this.getMovimento.bind(this));
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

  handleDebitoCredito(operacao) {
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
    var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(201[7-9]|202[0-9])$/;
    return regex.test(new Date(this.state.lancamento[propriedade]).toLocaleDateString());
  }

  onValidateMoney(propriedade) {
    var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{2}$/;
    return regex.test(this.state.lancamento[propriedade]) && this.state.lancamento[propriedade].length <= 10;
  }

  onValidateEmpty(propriedade, maxLength) {
    return this.state.lancamento[propriedade].length <= maxLength;
  }

  onValidateNotEmpty(propriedade, maxLength) {
    return this.state.lancamento[propriedade].length > 0 && this.state.lancamento[propriedade].length <= maxLength;
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

    api.cc.movimento.save(lancamento, this.props.onSave);
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
              <Col md={8}>
                <FormGroup validationState={'success'} >
                  <ControlLabel>Banco</ControlLabel>
                  <FormControl name="banco" componentClass="select" placeholder="Banco" value={this.state.banco.codigo} onChange={this.handleSelectBanco} >
                  {this.state.contas && this.state.contas.map( (banco, index) =>
                    <option key={'banco-' + index} value={banco.codigo} >{banco.codigo} - {banco.nome}</option>
                  )}
                  </FormControl>
                </FormGroup>
              </Col>

            </Row>
            
            <Row>
              <Col md={4}>
                <FormGroup validationState={'success'} >
                  <ControlLabel>Agencia</ControlLabel>
                  <FormControl name="agencia" componentClass="select" placeholder="Agencia" value={this.state.agencia.agencia} onChange={this.handleSelectAgencia} >
                    {this.state.banco && this.state.banco.agencias.map( (agencia, index) =>
                      <option key={'agencia-' + index} value={agencia.agencia} >{agencia.agencia}</option>
                    )}
                  </FormControl>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup validationState={'success'} >
                  <ControlLabel>Conta</ControlLabel>
                  <FormControl name="conta" componentClass="select" placeholder="Conta" value={this.state.conta.conta} onChange={this.handleSelectConta} >
                  {this.state.agencia && this.state.agencia.contas.map( (conta, index) =>
                    <option key={'conta-' + index} value={conta.conta}>{conta.conta}</option>
                  )}
                  </FormControl>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup validationState="success">
                  <ControlLabel>Saldo da Conta</ControlLabel>
                  <FormControl type="text" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', this.state.conta.saldo)} readOnly />
                </FormGroup>
              </Col>
              
            </Row>

            <Row>
              <Col md={5}>
                <FormGroup validationState={this.onValidateDate('data') ? 'success' : 'error'} >
                  <ControlLabel>Data</ControlLabel>
                  <DatePicker name="data" value={this.state.lancamento.data} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} onChange={this.handleChangeData} />
                </FormGroup>
              </Col>

              <Col md={5}>
                <FormGroup validationState={this.onValidateEmpty('documento', 50) ? 'success' : 'error'} >
                  <ControlLabel>Documento</ControlLabel>
                  <FormControl type="text" name="documento" value={this.state.lancamento.documento} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <ControlLabel>Liquidado</ControlLabel>
                  <InputGroup>
                    {this.state.lancamento.liquidado ?
                      (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidado} ><Glyphicon glyph="ok" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleLiquidado} ><Glyphicon glyph="dot" /></Button>)
                    }
                  </InputGroup>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormGroup validationState={this.onValidateNotEmpty('descricao', 100) ? 'success' : 'error'} >
                  <ControlLabel>Descrição</ControlLabel>
                  <FormControl type="text" name="descricao" value={this.state.lancamento.descricao} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <FormGroup validationState={this.onValidateMoney('valor') ? 'success' : 'error'} >
                  <ControlLabel>Valor</ControlLabel>
                  <FormControl type="text" name="valor" value={this.state.lancamento.valor} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>

              <Col md={5}>
                <FormGroup>
                  <ControlLabel>Operação</ControlLabel>
                  <InputGroup>
                    {this.state.lancamento.operacao === 'D' ?
                      (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={this.handleDebitoCredito.bind(null, 'C')} ><Glyphicon glyph="ok" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px'}} bsSize="small" onClick={this.handleDebitoCredito.bind(null, 'D')} ><Glyphicon glyph="minus" /></Button>)
                    } <ControlLabel style={{marginLeft: '10px'}}>Debito</ControlLabel>
                    {this.state.lancamento.operacao === 'C' ?
                      (<Button bsStyle="success" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={this.handleDebitoCredito.bind(null, 'D')} ><Glyphicon glyph="ok" /></Button>) :                                 
                      (<Button bsStyle="default" style={{width: '33px', marginLeft: '10px'}} bsSize="small" onClick={this.handleDebitoCredito.bind(null, 'C')} ><Glyphicon glyph="plus" /></Button>)
                    } <ControlLabel style={{marginLeft: '10px'}}>Credito</ControlLabel>
                  </InputGroup>
                  <FormControl.Feedback />
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
                  this.onValidateDate('data') &&
                  this.onValidateNotEmpty('descricao', 100) &&
                  this.onValidateMoney('valor') 
                )} style={{margin: '5px'}} >Gravar</Button> 
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}