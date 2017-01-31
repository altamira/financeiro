import './App.css';

import { assign } from 'lodash';
import mqtt from 'mqtt/lib/connect';

import api from './api';

import React, { Component } from 'react';
import { Link } from 'react-router';

import { 
  Nav, 
  Navbar, 
  NavItem, 
  NavDropdown, 
  MenuItem, 
  Col, 
  Accordion, 
  Panel, 
  ListGroup, 
  ListGroupItem, 
  Badge 
} from 'react-bootstrap';

import Login from './login';
import Dashboard from './dashboard'
import Error from './Error';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

Date.prototype.fromUTC = function() {
  let date = this.toISOString();
  if (!this.getUTCHours() && !this.getUTCMinutes() && !this.getUTCSeconds() && !this.getUTCMilliseconds()) {
    this.setTime(this.getTime() + (this.getTimezoneOffset() * 60 * 1000))
  } 
  console.log(`from UTC: ${date}, to locale: ${this.toISOString()}`)
  return this;
}

Date.prototype.toUTC = function() {
  let date = this.toISOString();
  if (this.getUTCHours() || this.getUTCMinutes() || this.getUTCSeconds() || this.getUTCMilliseconds()) {
    this.setTime(this.getTime() - ((this.getHours() * 60 * 60 * 1000) + (this.getMinutes() * 60 * 1000) + (this.getSeconds() * 1000) + this.getMilliseconds() + (this.getTimezoneOffset() * 60 * 1000)) )
  }
  console.log(`from locale: ${date}, to UTC: ${this.toISOString()}`)
  return this;
}

const TaskItem = props =>
  <Link to={{ pathname: props.form + props.id, query: props.parametros }}>
    <span style={{display: 'block'}}>{props.titulo}</span>
    <span>{props.descricao}</span>
    <span style={{display: 'block', fontSize: '12px'}}>{props.detalhes}</span>
  </Link>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tarefas: [],

      topicos: {},
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.goHome = this.goHome.bind(this);

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);

    this.handleErro = this.handleErro.bind(this);
    this.handleDebug = this.handleDebug.bind(this);

    this.setTarefas = this.setTarefas.bind(this);
    this.handleTarefaConcluida = this.handleTarefaConcluida.bind(this);
    this.handleTarefaNova = this.handleTarefaNova.bind(this);
    this.handleTarefaAtualizada = this.handleTarefaAtualizada.bind(this);

  }

  componentWillMount() {
    api.config.setErrorHandler(this.handleErro);
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleDebug(msg) {
    this.setState({dialog: <Error {...{erro: 'debug', mensagem: msg}} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleErro(err) {
    let props = {...err, message: err.message, stack: err.stack}
    this.setState({dialog: <Error {...props} onClose={this.handleCloseDialog.bind(this)} />})
  }

  goHome() {
    this.props.router.push('/')
  }  

  handleLogin(usuario) {
    this.setState({usuario: usuario}, this.subscribe);
  }

  handleLogout() {
    this.setState({usuario: undefined}, this.unsubscribe);
  }

  subscribe() {
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
          '/tarefas/atualizada/' + this.state.usuario.perfil,
          '/debug/',
        ], 
        function(err, granted) { 
          !err && granted.forEach( g => console.log('Inscrito no topico: ' + g.topic));
          !err ? 
            this.setState(
            {
              topicos: assign(
                this.state.topicos, 
                {
                  [granted[0].topic]: this.handleErro,
                  [granted[1].topic]: this.handleTarefaConcluida,
                  [granted[2].topic]: this.handleTarefaNova,
                  [granted[3].topic]: this.handleTarefaAtualizada,
                  [granted[4].topic]: this.handleDebug,
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

    api.tarefa.list((this.state.usuario && this.state.usuario.perfil) || '', this.setTarefas);

  }  

  unsubscribe() {
    this.state.topicos && Object.keys(this.state.topicos).forEach( (topic) =>
      {
        console.log('Excluido do topico: ' + topic)
        this.client.unsubscribe(
          topic, 
          function(err) { 
            err && console.log('Erro ao retirar a inscrição ao topico: ' + topic)
          }
        )
      }
    )
    this.client.end();  

    this.goHome();  
  }

  setTarefas(tarefas) {
    if (tarefas instanceof Array) {
      this.setState({tarefas: tarefas});
    }
  }

  handleTarefaConcluida(tarefa) {
    let tarefas = this.state.tarefas;
    let index = tarefas.findIndex( t => t.id === tarefa.id);
    if (index >= 0) {
      tarefas.splice(index, 1);
      console.log('Tarefa concluida, retirar da lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
      this.setState({tarefas: tarefas}/*, this.goHome*/);
    }
  }

  handleTarefaNova(tarefa) {
    let tarefas = this.state.tarefas;
    let index = tarefas.findIndex( t => t.id === tarefa.id);
    if (index >= 0) {
      tarefas.splice(index, 1, tarefa);
      console.log('Nova tarefa, atualizar na lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
    } else {
      tarefas.push(tarefa);
      console.log('Nova tarefa, incluir na lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
    }
    this.setState({tarefas: tarefas});
  }

  handleTarefaAtualizada(tarefa) {
    let tarefas = this.state.tarefas;
    let index = tarefas.findIndex( t => t.id === tarefa.id);
    if (index >= 0) {
      tarefas.splice(index, 1, tarefa);
      console.log('Tarefa atualizada, atualizar na lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
    } else {
      tarefas.push(tarefa);
      console.log('Tarefa atualizada, incluir na lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
    }
    this.setState({tarefas: tarefas});
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  render() {

    const tarefas = {};
    this.state.tarefas.forEach ( tarefa => {
      if (tarefas[tarefa.nome] === undefined) tarefas[tarefa.nome] = [];
      tarefas[tarefa.nome].push(tarefa)
    })

    const main = (
     
      <div className="App">
        <Navbar inverse collapseOnSelect style={{borderRadius: 0}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Resumo Financeiro</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Cadastros" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} >Banco</MenuItem>
                <MenuItem eventKey={3.2} >Conta Corrente</MenuItem>
                <MenuItem eventKey={3.3} >Clientes</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3} >Usuarios</MenuItem>
              </NavDropdown>
              <NavItem eventKey={2} >Configurações</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={4} href="#" ><span onClick={this.handleLogout.bind(this)}>{this.state.usuario && this.state.usuario.nome} (Sair)</span></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Col md={3} >
          <Accordion>
            <Panel style={{cursor: 'pointer'}} header={<span>Tarefas  <Badge>{this.state.tarefas.length}</Badge></span>} eventKey="1">
              <ListGroup>
                {this.state.tarefas && this.state.tarefas.map( (tarefa, i) =>
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
          {!this.props.children && this.state.usuario && (this.state.usuario.perfil === 'financeiro' || this.state.usuario.perfil === 'cobranca') ? <Dashboard /> : this.props.children}
        </Col>

      </div> 
    );
    
    const login = (<Login onLogin={this.handleLogin} />);
    
    return(
      <div>
        {this.state.usuario ? main : login}

        {this.state.dialog}
      </div>

    )

  }
}

export default App;
