import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

import { omit } from 'lodash';
import md5 from 'md5';
import axios from 'axios';

import Error from './../Error';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      login: '',
      senha: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(element) {
    this.setState({[element.target.id]: element.target.value})
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  handleLogin() {
    axios
      .post('http://financeiro:1880/api/usuario/login', {...omit(this.state, 'dialog'), senha: md5(this.state.senha)})
      .then( (response) => {
        if (response.data.nome) {
          this.props.onLogin && this.props.onLogin(response.data);
        } else {
          alert('Usuário e senha não encontrado, verifique a senha e tente novamente.')
        }
      })
      .catch( error => {
        this.setState({dialog: <Error erro={error.response ? error.response.data.erro : 0} mensagem={error.response ? error.response.data.mensagem : error.message} onClose={this.handleCloseDialog.bind(this)} />})
      })
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
                  <FormControl type="text" id="login" value={this.state.login} onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Senha</Col>
              <Col md={8}>
                <FormGroup validationState="success">
                  {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                  <FormControl type="password" id="senha" value={this.state.senha} onChange={this.handleChange} />
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