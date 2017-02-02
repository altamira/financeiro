import api from './../api/'

import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';

const BrazilianDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const BrazilianMonthLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Octubro', 'Novembro', 'Dezembro'];

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contas: [],

      conta: {
        saldo: 0
      },

      data: new Date().toISOString(),
      cheque: '',
      descricao: '',
      valor: '0,00',

      ...this.props.lancamento,

    }

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleSave = this.handleSave.bind(this);

    this.loadContas = this.loadContas.bind(this);
  }

  componentWillMount() {
    api.cc.conta.list(this.loadContas);
  }

  componentReceiveProps(props) {
    this.setState(props);
  }

  loadContas(contas) {
    if (contas.length) {
      this.setState({conta: contas[0], contas: contas})  
    }
  }

  handleChangeData(data) {
    this.setState({data: data})
  }
 
  handleChange(element) {
    this.setState({[element.target.name]: element.target.value});
  }

  handleSave() {
    this.props.onSave && this.props.onSave(this.state, this.props.index);
  }

  onValidateDate(propriedade) {
      //var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(201[7-9]|202[0-9])$/;
      //return regex.test(this.state[propriedade]) && this.state[propriedade].length < 10;
      if (propriedade === undefined) {
        return false;
      } else {
        return true;
      }
  }

  onValidateMoney(propriedade) {
      var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{2}$/;
      return regex.test(this.state[propriedade]) && this.state[propriedade].length < 10;
  }

  onValidateEmpty(propriedade) {
      return this.state[propriedade].length < 10;
  }

  onValidateNotEmpty(propriedade) {
      return this.state[propriedade].length > 0;
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
              <Col md={4}>Conta Corrente</Col>
              <Col md={8}>
                <FormGroup validationState={'success'} >
                  <FormControl name="origem" componentClass="select" placeholder="Conta Corrente" value={this.state.conta} onChange={this.handleSelectConta} >
                  {this.state.contas && this.state.contas.map( (conta, index) =>
                    <option key={'option-' + index} value={index}>{conta.codigo} {conta.nome} {conta.agencia} {conta.conta}</option>
                  )}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Data</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateDate('data') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker name="data" value={this.state.data} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} onChange={this.handleChangeData} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Cheque</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateEmpty('cheque') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="cheque" value={this.state.cheque} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Descrição</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateNotEmpty('descricao') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="descricao" value={this.state.descricao} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Valor</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateMoney('valor') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="valor" value={this.state.valor} onChange={this.handleChange} />
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
                  this.onValidateMoney('valor') 
                )} style={{margin: '5px'}} >Gravar</Button> 
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}