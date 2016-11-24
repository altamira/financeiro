import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

import { assign } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

const TaskItem = props =>
  <Link to={{ pathnome: props.form, query: props.parametros }}>
    <span style={{display: 'block'}}>{props.titulo}</span>
    <span>{props.descricao}</span>
  </Link>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: {
        login: 'neuci',
        nome: 'Neuci Bavato',
        email: 'neuci.bavato@altamira.com.br'
      },
      tarefas: [],
      topicos: {}
    }

    this.goHome = this.goHome.bind(this);

    this.handleError = this.handleError.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);
    this.handleTaskNew = this.handleTaskNew.bind(this);

  }

  componentWillMount() {
    var opts = {
      host: '192.168.0.1', //'test.mosquitto.org'
      port: 61614,
      protocol: 'ws',
      qos: 0,
      retain: false,
      clean: true,
      keepAlive: 30, // 30 sec.
      clientId: clientId
    }

    this.client = mqtt.connect(opts)

    this.client.on('connect', function() {
      this.client.subscribe(
        [
          '/erros/' + clientId,
          '/tarefas/concluida/',
          '/tarefas/nova/',
        ], 
        function(err, granted) { 
          !err ? 
            this.setState(
            {
              topicos: assign(
                this.state.topicos, 
                {
                  [granted[0].topic]: this.handleError,
                  [granted[1].topic]: this.handleTaskDone,
                  [granted[2].topic]: this.handleTaskNew
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
      
      this.state.topicos[topic] && this.state.topicos[topic](JSON.parse(message.toString()));

    }.bind(this))

    axios
      .get('http://sistema/api/tarefas?atribuir=' + this.state.usuario.login)
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

  handleError(msg) {
    alert('Erro: ' + msg);
  }

  handleTaskDone(tarefa) {
    let tarefas = this.state.tarefas;
    tarefas.splice(tarefas.findIndex( t => t.id === tarefa.id), 1);
    console.log('Tarefa concluida: ' + tarefa.id + ', ' + tarefa.nome + ', ' + tarefa.titulo)
    this.setState({tarefas: tarefas}, this.goHome);
  }

  handleTaskNew(tarefa) {
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

    return (
      <div className="App">
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>*/}

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
              <NavItem eventKey={1} href="/dashboard">Resumo Financeiro</NavItem>
              <NavItem eventKey={2} href="#">Configurações</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Sair</NavItem>
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
      
      </div>
    );
  }
}

export default App;
