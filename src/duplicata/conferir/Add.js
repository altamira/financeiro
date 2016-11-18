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

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vencto: new Date().toISOString(),
      tipo: "DDL",
      sequencia: 1,
      dias: 0,
      porcentagem: 0,
      descricao: "",
      valor: 0.0
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleSave = this.handleSave.bind(this);
  }

  handleDateChange(date) {
    this.setState({vencto: date});
  }
 
  handleChange(element) {
    this.setState({[element.target.id]: element.target.value});
  }
 
  handleSave() {
    this.props.onSave && this.props.onSave({...this.state, valor: parseFloat(this.state.valor)});
  }

  componentWillReceiveProps(props) {
    this.setState(this.props.item);
  }

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Incluir parcela</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>Tipo</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  <FormControl id="tipo" componentClass="select" placeholder="Tipo" value={this.state.tipo} onChange={this.handleChange} >
                    <option value="DDP">Dias do Pedido (DDP)</option>
                    <option value="DDL">Dias da Entrega (DDL)</option>
                    <option value="DDM">Dias da Montagem (DDM)</option>
                  </FormControl>
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
                  <DatePicker id="emissao" value={this.state.vencto} onChange={this.handleDateChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Valor da Parcela</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" id="valor" value={this.state.valor} onChange={this.handleChange} />
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