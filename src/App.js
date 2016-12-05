import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

import Login from './login';
import Error from './Error';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

const TaskItem = props =>
  <Link to={{ pathname: props.form, query: props.parametros }}>
    <span style={{display: 'block'}}>{props.titulo}</span>
    <span>{props.descricao}</span>
  </Link>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tarefas: [],

      topicos: {},

      dialog: null
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.mountComponent = this.mountComponent.bind(this);
    
    this.goHome = this.goHome.bind(this);

    this.handleErro = this.handleErro.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.handleTarefaConcluida = this.handleTarefaConcluida.bind(this);
    this.handleTarefaNova = this.handleTarefaNova.bind(this);

  }

  handleLogin(usuario) {
    this.setState({usuario: usuario}, this.mountComponent);
  }

  handleLogout() {
    this.setState({usuario: undefined});
  }

  mountComponent() {
    var opts = {
      host: '192.168.0.1', //'test.mosquitto.org'
      port: 61614,
      protocol: 'ws',
      qos: 0,
      retain: false,
      clean: true,
      keepAlive: 30, // 30 sec.
      //clientId: clientId
    }

    this.client = mqtt.connect(opts)

    this.client.on('connect', function() {
      this.client.subscribe(
        [
          '/erros/' + clientId,
          '/tarefas/concluida/' + this.state.usuario.perfil,
          '/tarefas/nova/' + this.state.usuario.perfil,
          '/debug/',
        ], 
        function(err, granted) { 
          !err ? 
            this.setState(
            {
              topicos: assign(
                this.state.topicos, 
                {
                  [granted[0].topic]: this.handleErro,
                  [granted[1].topic]: this.handleTarefaConcluida,
                  [granted[2].topic]: this.handleTarefaNova,
                  [granted[3].topic]: this.handleDebug,
                }
              )
            }) 
            : console.log('Erro ao se inscrever no topico: ' + err)
        }.bind(this)
      );

    }.bind(this));
    
    this.client.on('message', function (topic, message) {
      // message is Buffer
      //console.log('\n' + topic + ':\n' + message.toString())

      if (topic === '/debug/') {
        this.state.topicos[topic] && this.state.topicos[topic](message.toString());  
      } else {
        this.state.topicos[topic] && this.state.topicos[topic](JSON.parse(message.toString()));  
      }

    }.bind(this))

    this.client.on('error', function(err) {
      alert('Erro na conexao com o servidor de mensagens: ' + err);
    })

    axios
      .get('http://sistema/api/tarefas?perfil=' + (this.state.usuario && this.state.usuario.perfil) || '')
      .then( (response) => {
        if (response.data instanceof Array) {
          this.setState({tarefas: response.data});
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.');
      })
  }

  componentWillUnmount() {
    this.state.topicos && Object.keys(this.state.topicos).forEach( (topic) =>
      this.client.unsubscribe(
        topic, 
        function(err) { 
          err && console.log('Erro ao retirar a inscrição ao topico: ' + topic)
        }
      )
    )
    this.client.end();
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  handleErro(msg) {
    alert('Erro: ' + msg);
  }

  handleDebug(msg) {
    this.setState({dialog: <Error {...{erro: 'debug', mensagem: msg}} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleTarefaConcluida(tarefa) {
    let tarefas = this.state.tarefas;
    tarefas.splice(tarefas.findIndex( t => t.id === tarefa.id), 1);
    console.log('Tarefa concluida: ' + tarefa.id + ', ' + tarefa.nome + ', ' + tarefa.titulo)
    this.setState({tarefas: tarefas}, this.goHome);
  }

  handleTarefaNova(tarefa) {
    let tarefas = this.state.tarefas;
    tarefas.push(tarefa);
    this.setState({tarefas: tarefas});
    console.log('Nova tarefas: ' + tarefa.id + ', ' + tarefa.nome + ', ' + tarefa.titulo)
  }

  goHome() {
    browserHistory.push('/');
  }

  render() {

    const tarefas = {};
    this.state.tarefas.forEach ( tarefa => {
      if (tarefas[tarefa.nome] === undefined) tarefas[tarefa.nome] = [];
      tarefas[tarefa.nome].push(tarefa)
    })

    if (this.state.usuario) {
      return (
       
        <div className="App">
          <Navbar inverse collapseOnSelect style={{borderRadius: 0}}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>Altamira</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavDropdown eventKey={3} title="Cadastros" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Banco</MenuItem>
                  <MenuItem eventKey={3.2}>Conta Corrente</MenuItem>
                  <MenuItem eventKey={3.3}>Clientes</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Usuarios</MenuItem>
                </NavDropdown>
                <NavItem eventKey={1} href="dashboard/">Resumo Financeiro</NavItem>
                <NavItem eventKey={2} href="#">Configurações</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#" ><span onClick={this.handleLogout.bind(this)}>{this.state.usuario.nome} (Sair)</span></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Col md={3} >
            <Accordion>
              <Panel style={{cursor: 'pointer'}} header={<span>Tarefas  <Badge>{this.state.tarefas.length}</Badge></span>} eventKey="1">
                <ListGroup>
                  {this.state.tarefas.map( (tarefa, i) =>
                    <ListGroupItem key={'tarefa-'+ i} header={tarefa.nome}>
                      <TaskItem {...tarefa} />
                    </ListGroupItem>
                  )}
                </ListGroup>                
              </Panel>
              <Panel style={{cursor: 'pointer'}} header="Iniciar Procedimento" eventKey="2">
                <ListGroup>
                  <ListGroupItem header="Emissão de Duplicatas"><Link to='/duplicata/emissao'>Emitir Duplicata (Avulsa)</Link></ListGroupItem>
                  {/*<ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>*/}
                </ListGroup>
              </Panel>
            </Accordion> 
          </Col>

          <Col md={9} >
            {this.props.children}
          </Col>

          {this.state.dialog}

        </div> 
      );
    } else {
      return (<Login onLogin={this.handleLogin} />)
    }

  }
}

export default App;
