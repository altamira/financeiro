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

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      usuario: this.props.usuario,
      senha_atual: '',
      senha_nova: '',
      senha_repetir: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordChangeResult = this.handlePasswordChangeResult.bind(this);
  }

  handleChange(element) {
    this.setState({[element.target.name]: element.target.value})
  }

  handlePasswordChange() {
    api.usuario.troca_senha(this.state.usuario, md5(this.state.senha_atual), md5(this.state.senha_nova), this.handlePasswordChangeResult.bind(this))
  }

  handlePasswordChangeResult(user) {
    if (user.nome) {
      let err = {erro: 0, mensagem: 'Senha alterada com sucesso.'}
      this.setState({dialog: <Error {...err} onClose={this.handleClose} />})
    } else {
      let err = {mensagem: 'Usuário e senha não encontrado. Verifique se digitou a senha corretamente.'}
      this.setState({dialog: <Error {...err} onClose={this.handleCloseDialog} />})
    }
  }

  handleClose() {
    this.props.onClose && this.props.onClose(this.state);
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  onValidateNotEmpty(propriedade, maxLength) {
    return this.state[propriedade] !== null && this.state[propriedade].trim().length > 2 && this.state[propriedade].length <= maxLength;
  }

  onValidatePassword(propriedade) {
      return this.onValidateNotEmpty(propriedade, 10);
  }

  onValidatePasswordMatch(propriedade) {
      return this.onValidateNotEmpty(propriedade, 10) && 
        this.state.senha_repetir === this.state.senha_nova;
  }  

  render() {

    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Trocar Senha</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Row>
              <Col md={4}>Usuario</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateNotEmpty('usuario', 10) ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="text" name="usuario" value={this.state.usuario} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Senha Atual</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidateNotEmpty('senha_atual', 10) ? 'success' : 'error'} >
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="password" name="senha_atual" value={this.state.senha_atual} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Nova Senha</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidatePassword('senha_nova') ? 'success' : 'error'}>
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="password" name="senha_nova" value={this.state.senha_nova} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>Repetir Senha</Col>
              <Col md={8}>
                <FormGroup validationState={this.onValidatePasswordMatch('senha_repetir') ? 'success' : 'error'}>
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="password" name="senha_repetir" value={this.state.senha_repetir} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="default" onClick={this.props.onClose && this.props.onClose.bind(this)}>Cancelar</Button>
            <Button 
              bsStyle="success" 
              onClick={this.handlePasswordChange}
              disabled={!(
                this.state.usuario &&
                this.state.senha_atual &&
                this.state.senha_nova && 
                this.onValidateNotEmpty('usuario', 10) &&
                this.onValidateNotEmpty('senha_atual', 10) &&
                this.onValidatePassword('senha_nova') &&
                this.onValidatePasswordMatch('senha_repetir')
              )} 
              style={{margin: '5px'}} 
            >Trocar Senha</Button>
          </Modal.Footer>

          {this.state.dialog}
          
        </Modal.Dialog>
      </div>
    );
  }
}