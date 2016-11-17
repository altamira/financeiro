import React, { Component } from 'react';
import { Link } from 'react-router';
//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

import axios from 'axios';

const TaskItem = props =>
  <Link to={{ pathname: props.path, query: props.query }}>
    <span style={{display: 'block'}}>{props.title}</span>
    <span>{props.detail}</span>
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
      .get('http://sistema/api/tarefas?assign_to=' + (this.state.user || 'neuci.bavato@altamira.com.br'))
      .then( (response) => {
        if (response.data instanceof Array) {
          this.setState({tasks: response.data.map( item => 
            ({ 
              id: item.id, 
              name: item.name, 
              title: item.title || '',
              detail: item.detail || '',
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
              <Panel style={{cursor: 'pointer'}} header={<span>Tarefas  <Badge>{this.state.tasks.length}</Badge></span>} eventKey="1">
                <ListGroup>
                  {this.state.tasks.map( (task, i) =>
                    <ListGroupItem key={'task-'+ i} header={task.name}>
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
