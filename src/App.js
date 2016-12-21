import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Row, Col, Table } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

import { assign, omit } from 'lodash';
import mqtt from 'mqtt/lib/connect';
import axios from 'axios';

import Login from './login';
import Error from './Error';

var clientId = 'mqtt_' + (1 + Math.random() * 4294967295).toString(16);

const TaskItem = props =>
  <Link to={{ pathname: props.form + props.id, query: props.parametros }}>
    <span style={{display: 'block'}}>{props.titulo}</span>
    <span>{props.descricao}</span>
  </Link>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      carteiras: [],

      remessa: [],

      retorno: [],

      tarefas: [],

      topicos: {},
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.mountComponent = this.mountComponent.bind(this);
    
    this.goHome = this.goHome.bind(this);

    this.handleErro = this.handleErro.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.handleTarefaConcluida = this.handleTarefaConcluida.bind(this);
    this.handleTarefaNova = this.handleTarefaNova.bind(this);
    this.handleTarefaAtualizada = this.handleTarefaAtualizada.bind(this);

  }

  handleLogin(usuario) {
    this.setState({usuario: usuario}, this.mountComponent);
  }

  handleLogout() {
    this.setState({usuario: undefined}, this.unsubscribe.bind(this));
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
    this.props.router.push('/')
  }

  goHome() {
    this.props.router.push('/')
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

    axios
      .get('http://localhost:1880/api/tarefas?perfil=' + (this.state.usuario && this.state.usuario.perfil) || '')
      .then( (response) => {
        if (response.data instanceof Array) {
          this.setState({tarefas: response.data});
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.');
      })

    axios
      .get('http://localhost:1880/api/financeiro/carteira/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            carteiras: response.data.map( c => 
            {
              c.remessa_total = c.remessa;
              return c;
            })
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })

    axios
      .get('http://localhost:1880/api/financeiro/remessa/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            remessa: response.data
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as remessas.\nErro: ' + error.message);
      })

    axios
      .get('http://localhost:1880/api/financeiro/retorno/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            retorno: response.data
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as retornos.\nErro: ' + error.message);
      })
  }

  componentWillUnmount() {
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
    let index = tarefas.findIndex( t => t.id === tarefa.id);
    if (index >= 0) {
      tarefas.splice(index, 1);
      console.log('Tarefa concluida, retirar da lista de tarefas: ' + JSON.stringify(tarefa, null, 2))
      this.setState({tarefas: tarefas}, this.goHome);
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
  
  render() {

    const tarefas = {};
    this.state.tarefas.forEach ( tarefa => {
      if (tarefas[tarefa.nome] === undefined) tarefas[tarefa.nome] = [];
      tarefas[tarefa.nome].push(tarefa)
    })

    const dashboard = (
      <div>
        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Resumo Cobrança</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Limite</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Utilizado</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Defasagem</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Enviar</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Remessa</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Retorno</th>
                </tr>
              </thead>
              <tbody>
                {this.state.carteiras.map( (carteira, index) => {
                  return (
                    <tr key={'tr-carteiras-' + index} >
                      <td style={{textAlign: 'left'}}><b>{carteira.nome}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.limite.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.utilizado.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.saldo.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.defasagem.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.descoberto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.remessa_total || 0).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.retorno).toLocaleString()}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Remessas de Cobrança em Aberto (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Data da Remessa</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Data da Crédito</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.remessa.map( (remessa, index) => {
                  return (
                    <tr key={'tr-remessa-' + index} >
                      <td style={{textAlign: 'right'}}><b>{remessa.data}</b></td>
                      <td style={{textAlign: 'left'}}><b>{(remessa.carteira && remessa.carteira.nome) || ''}</b></td>
                      <td style={{textAlign: 'right'}}><b>{remessa.data}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.bruto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.operacao.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.tarifa.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.juros.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.iof.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.taxa.toFixed(2)).toLocaleString()}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.liquido.toFixed(2)).toLocaleString()}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Últimos Retornos de Cobrança (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Data da Remessa</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Data da Crédito</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.retorno.map( (retorno, index) => {
                  return (
                    <tr key={'tr-retorno-' + index} >
                      <td style={{textAlign: 'right'}}><b>{retorno.data}</b></td>
                      <td style={{textAlign: 'left'}}><b>{(retorno.carteira && retorno.carteira.nome) || ''}</b></td>
                      <td style={{textAlign: 'right'}}><b>{retorno.data}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.bruto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.operacao.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.tarifa.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.juros.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.iof.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.taxa.toFixed(2)).toLocaleString()}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.liquido.toFixed(2)).toLocaleString()}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>

        </Row>
      </div>
    );

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
                  <MenuItem eventKey={3.1} >Banco</MenuItem>
                  <MenuItem eventKey={3.2} >Conta Corrente</MenuItem>
                  <MenuItem eventKey={3.3} >Clientes</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3} >Usuarios</MenuItem>
                </NavDropdown>
                <NavItem eventKey={1} >Resumo Financeiro</NavItem>
                <NavItem eventKey={2} >Configurações</NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={4} href="#" ><span onClick={this.handleLogout.bind(this)}>{this.state.usuario.nome} (Sair)</span></NavItem>
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
            {!this.props.children && (this.state.usuario.perfil === 'financeiro' || this.state.usuario.perfil === 'cobranca') ? dashboard: this.props.children}
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
