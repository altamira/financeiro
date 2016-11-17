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

export default class Incluir extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vencto: new Date().toISOString(),
      prazo: 0,
      valor: 0.00
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
        [value.target.id]: value.target.value
    });
  }
  
  componentWillReceiveProps(props) {
    this.setState(props);
  }

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Calcular Datas</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>Vencto</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                  {/*<FormControl.Feedback />*/}
                  <DatePicker id="emissao" value={this.state.vencto} onChange={this.handleChange} />
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
            <Button bsStyle="primary">Incluir</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}