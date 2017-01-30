import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import md5 from 'md5';

import api from './../api';

import Error from './../Error';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      usuario: '',
      senha: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(element) {
    this.setState({[element.target.name]: element.target.value})
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  handleLogin() {
    api.usuario.login(this.state.usuario, md5(this.state.senha), this.handleAuthenticate.bind(this))
  }

  handleAuthenticate(user) {
    if (user.nome) {
      this.props.onLogin && this.props.onLogin(user);
    } else {
      let err = {mensagem: 'Usuário e senha não encontrado. Verifique se digitou a senha corretamente.'}
      this.setState({dialog: <Error {...err} onClose={this.handleCloseDialog.bind(this)} />})
    }
  }

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Controle de Acesso</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={4}>Usuario</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="usuario" value={this.state.usuario} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Senha</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="password" name="senha" value={this.state.senha} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleLogin} >Acessar</Button>
          </Modal.Footer>

          {this.state.dialog}
          
        </Modal.Dialog>
      </div>
    );
  }
}