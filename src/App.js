import React, { Component } from 'react';
import { Link } from 'react-router';
//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

import uuid from 'node-uuid';
import axios from 'axios';

const tarefas = [
  { 
    path: '/duplicata/conferencia/4', 
    title: 'Conferir Duplicatas', 
    text: (<span><span style={{display: 'block'}}>Pedido 74716</span><span>SAINT PAUL INDUSTRIA E COMERCIO LTDA</span></span>), 
    params: { 
      _id: 1,
      numero: '216558',
      pedido: '74716',
      emissao: '2016-10-10',
      entrega: '2016-10-10',
      cnpj: '63.394.915/0001-62',
      representante: '001',
      nome: 'SAINT PAUL INDUSTRIA E COMERCIO LTDA',
      parcelas: [
        {
          selecionada: false,
          vencto: '2016-10-10',
          valor: 2198.74
        },
        {
          selecionada: false,
          vencto: '2016-10-10',
          valor: 3572.96
        }        
      ]
    }
  },
]

const TaskItem = props =>
  <Link to={{ pathname: props.path, query: props.query }}>
    <span style={{display: 'block'}}>{props.detail.header}</span>
    <span>{props.detail.body}</span>
  </Link>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    }
  }

  componentWillMount() {
    axios
      .get('http://sistema/api/tasks?assign_to=' + (this.state.user || 'Marisa'))
      .then( (response) => {
        if (response.data instanceof Array) {
          this.setState({tasks: response.data.map( item => 
            ({ 
              id: item.id, 
              title: item.title, 
              detail: JSON.parse(item.detail) || { header: '', body: ''},
              path: item.link,
              query: item.query || ''
            })
          )})
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.');
      })
  }
  render() {
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
              <NavItem eventKey={1} href="#">Financeiro</NavItem>
              <NavItem eventKey={2} href="#">Configurações</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Sair</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

          <Col md={3} >
            <Accordion>
              <Panel style={{cursor: 'pointer'}} header={<span>Tarefas  <Badge>{tarefas.length}</Badge></span>} eventKey="1">
                <ListGroup>
                  {this.state.tasks.map( (task, i) =>
                    <ListGroupItem key={'task-'+ i} header={task.title}>
                      <TaskItem {...task} />
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
