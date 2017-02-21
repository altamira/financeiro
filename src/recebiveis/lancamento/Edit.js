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
import moment from 'moment';

const BrazilianDayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const BrazilianMonthLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Octubro', 'Novembro', 'Dezembro'];

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.parcela;

    this.handleChangeOrigem = this.handleChangeOrigem.bind(this);
    this.handleChangeFormaPagto = this.handleChangeFormaPagto.bind(this);
    this.handleChangeTipoVencto = this.handleChangeTipoVencto.bind(this);
    this.handleChangeInicial = this.handleChangeInicial.bind(this);
    this.handleChangePrazo = this.handleChangePrazo.bind(this);
    this.handleChangeVencto = this.handleChangeVencto.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);

    this.handleSave = this.handleSave.bind(this);
  }

  handleChangeOrigem(element) {
    this.setState({origem: element.target.value});
  }

  handleChangeFormaPagto(element) {
    this.setState({forma_pagto: element.target.value});
  }

  handleChangeTipoVencto(element) {
    let data_base = moment(element.target.value === 'DDP' ? moment(this.state.emissao) : moment(this.state.entrega));
    this.setState(
      {
        data_base: data_base.toDate().toISOString(), 
        vencto: data_base.clone().add(parseInt(this.state.prazo, 10), 'd').toDate().toISOString(), 
        tipo_vencto: element.target.value
      });
  }

  handleChangeInicial(data_base) {
    let vencto = moment(data_base).add(this.state.prazo, 'd').toDate().toISOString();
    this.setState({data_base: data_base, vencto: vencto});
  }

  handleChangePrazo(element) {
    let data_base = moment(this.state.data_base);
    let vencto = data_base.add(parseInt(element.target.value, 10), 'd').toDate().toISOString();
    this.setState({vencto: vencto, prazo: element.target.value});
  }

  handleChangeVencto(vencto) {
    this.setState({vencto: vencto/*,  prazo: moment(vencto).diff(moment(this.state.data_base), 'days').toString()*/})
  }
 
  handleChangeValor(element) {
    this.setState({valor: element.target.value});
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

  onValidateInt(propriedade) {
      var regex = /^\$?[0-9]{1,3}?$/;
      return regex.test(this.state[propriedade]) && this.state[propriedade].length < 10;
  }

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Alterar parcela</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>Origem do Recebível</Col>
              <Col md={8}>
                <FormGroup validationState={'success'} >
                  <FormControl name="origem" componentClass="select" placeholder="Origem do Recebível" value={this.state.origem} onChange={this.handleChangeOrigem} >
                    <option value="VENDA">Venda de Produto</option>
                    <option value="DIFAL">Diferencial de ICMS</option>
                    <option value="SUCATA">Venda de Sucata</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Forma de Pagamento</Col>
              <Col md={8}>
                <FormGroup validationState={'success'} >
                  <FormControl name="forma_pagto" componentClass="select" placeholder="Forma de Pagamento" value={this.state.forma_pagto} onChange={this.handleChangeFormaPagto} >
                    <option value="COBRANCA">Cobrança Bancária</option>
                    <option value="DEPOSITO">Depósito Bancário</option>
                    <option value="BNDES">Cartão BNDES</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="DINHEIRO">Dinheiro</option>
                    <option value="A_FATURAR">Faturar na Entrega</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Tipo de Vencto</Col>
              <Col md={8}>
                <FormGroup validationState={'success'} >
                  <FormControl name="tipo_vencto" componentClass="select" placeholder="Tipo de Vencimento" value={this.state.tipo_vencto} onChange={this.handleChangeTipoVencto} >
                    <option value="DDP">Dias do Pedido (DDP)</option>
                    <option value="DDL">Dias da Entrega (DDL)</option>
                    <option value="DDM">Dias da Montagem (DDM)</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Data Base</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateDate('data_base') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker name="data_base" value={this.state.data_base} onChange={this.handleChangeInicial} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Prazo</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateInt('prazo') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="prazo" value={this.state.prazo} onChange={this.handleChangePrazo} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Vencto</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateDate('vencto') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker name="vencto" value={this.state.vencto} onChange={this.handleChangeVencto} dayLabels={BrazilianDayLabels} monthLabels={BrazilianMonthLabels} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Valor da Parcela</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateMoney('valor') ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="valor" value={this.state.valor} onChange={this.handleChangeValor} />
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
                  this.onValidateDate('data_base') &&
                  this.onValidateInt('prazo') &&
                  this.onValidateDate('vencto') &&
                  this.onValidateMoney('valor') 
                )} style={{margin: '5px'}} >Alterar</Button> 
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}