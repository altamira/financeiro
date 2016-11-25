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

export default class Calcular extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.item;

    this.handleChangeTipo = this.handleChangeTipo.bind(this);
    this.handleChangeInicial = this.handleChangeInicial.bind(this);
    this.handleChangePrazo = this.handleChangePrazo.bind(this);
    this.handleChangeVencto = this.handleChangeVencto.bind(this);

    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(props.item);
  }
  
  handleChangeTipo(element) {
    let inicial = moment(element.target.value === 'DDP' ? moment(this.state.emissao) : moment(this.state.entrega));
    this.setState(
      {
        inicial: inicial.toDate().toISOString(), 
        vencto: inicial.clone().add(this.state.prazo, 'd').toDate().toISOString(), 
        tipo: element.target.value
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

  handleChangeVencto(date) {
    //this.setState({[element.target.id]: element.target.value});
  }
 
  handleSave() {
    this.props.onSave && this.props.onSave(this.state);
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
              <Col md={4}>Tipo</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  <FormControl id="tipo" componentClass="select" placeholder="Tipo" value={this.state.tipo} onChange={this.handleChangeTipo} >
                    <option value="DDP">Dias do Pedido (DDP)</option>
                    <option value="DDL">Dias da Entrega (DDL)</option>
                    <option value="DDM">Dias da Montagem (DDM)</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Data</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  <FormGroup validationState="success">
                    {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                    {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                    {/*<FormControl.Feedback />*/}
                    <DatePicker id="inicio" value={this.state.tipo === 'DDP' ? this.state.emissao : this.state.entrega} onChange={this.handleChangeInicial} />
                  </FormGroup>
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
                  <DatePicker id="vencto" value={this.state.vencto} onChange={this.handleChangeVencto} />
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Close</Button>
            <Button bsStyle="primary" onClick={this.handleSave} >Alterar</Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}