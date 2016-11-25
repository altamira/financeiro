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

    this.state = this.props.item

    this.handleChangeTipo = this.handleChangeTipo.bind(this);
    this.handleChangeInicial = this.handleChangeInicial.bind(this);
    this.handleChangePrazo = this.handleChangePrazo.bind(this);
    this.handleChangeVencto = this.handleChangeVencto.bind(this);
    this.handleChangeValor = this.handleChangeValor.bind(this);

    this.handleSave = this.handleSave.bind(this);
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

  handleChangeVencto(vencto) {
    this.setState({vencto: vencto,  prazo: moment(vencto).diff(moment(this.state.inicial), 'days')})
  }
 
  handleChangeValor(element) {
    this.setState({valor: element.target.value});
  }

  handleSave() {
    this.props.onSave && this.props.onSave({...this.state, valor: parseFloat(this.state.valor)});
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
              <Col md={4}>Tipo de Vencto</Col>
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