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
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      login: '',
      senha: ''
    }

    this.handleChange = this.handleChange.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(element) {
    this.setState({[element.target.id]: element.target.value})
  }

  handleLogin() {
    axios
      .post('http://sistema/api/usuario/login', {...this.state, senha: md5(this.state.senha)})
      .then( (response) => {
        if (response.data.nome) {
          this.props.onLogin && this.props.onLogin(response.data);
        } else {
          alert('Usuário e senha não encontrado, verifique a senha e tente novamente.')
        }
      })
      .catch( error => {
        alert('Erro ao autenticar usuario.');
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

        </Modal.Dialog>
      </div>
    );
  }
}