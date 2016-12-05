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

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.parcela

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
    let inicial = moment(element.target.value === 'DDP' ? moment(this.state.emissao) : moment(this.state.entrega));
    this.setState(
      {
        inicial: inicial.toDate().toISOString(), 
        vencto: inicial.clone().add(this.state.prazo, 'd').toDate().toISOString(), 
        tipo_vencto: element.target.value
      });
  }

  handleChangeInicial(inicial) {
    let vencto = moment(inicial).add(this.state.prazo, 'd').toDate().toISOString();
    this.setState({inicial: inicial, vencto: vencto});
  }

  handleChangePrazo(element) {
    let inicial = moment(this.state.inicial);
    let vencto = inicial.add(element.target.value, 'd').toDate().toISOString();
    this.setState({vencto: vencto, prazo: element.target.value});
  }

  handleChangeVencto(vencto) {
    this.setState({vencto: vencto,  prazo: moment(vencto).diff(moment(this.state.inicial), 'days')})
  }
 
  handleChangeValor(element) {
    this.setState({valor: element.target.value});
  }

  handleSave() {
    this.props.onSave && this.props.onSave({...this.state, valor: parseFloat(this.state.valor)}, this.props.index);
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
                <FormGroup validationState="success">
                  <FormControl id="origem" componentClass="select" placeholder="Origem do Recebível" value={this.state.origem} onChange={this.handleChangeOrigem} >
                    <option value="VENDA">Venda de Produto</option>
                    <option value="DIFAL">Diferencial de ICMS</option>
                    <option value="SUCATA">Venda de Sucata</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Forma de Pagamento</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  <FormControl id="forma_pagto" componentClass="select" placeholder="Forma de Pagamento" value={this.state.forma_pagto} onChange={this.handleChangeFormaPagto} >
                    <option value="COBRANCA">Cobrança Bancária</option>
                    <option value="DEPOSITO">Depósito Bancário</option>
                    <option value="BNDES">Cartão BNDES</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="DINHEIRO">Dinheiro</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Tipo de Vencto</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  <FormControl id="tipo_vencto" componentClass="select" placeholder="Tipo de Vencimento" value={this.state.tipo_vencto} onChange={this.handleChangeTipoVencto} >
                    <option value="DDP">Dias do Pedido (DDP)</option>
                    <option value="DDL">Dias da Entrega (DDL)</option>
                    <option value="DDM">Dias da Montagem (DDM)</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Data Base</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker id="emissao" value={this.state.inicial} onChange={this.handleChangeInicial} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Prazo</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" id="prazo" value={this.state.prazo} onChange={this.handleChangePrazo} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Vencto</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker id="emissao" value={this.state.vencto} onChange={this.handleChangeVencto} />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Valor da Parcela</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" id="valor" value={this.state.valor} onChange={this.handleChangeValor} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Fechar</Button>
            <Button bsStyle="primary" onClick={this.handleSave}>Alterar</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}