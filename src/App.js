import React, { Component } from 'react';
import { Link } from 'react-router';
//import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Accordion, Panel, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

const tarefas = [
  { path: '/duplicata/conferencia/1', title: 'Conferir Duplicatas', text: (<span><span style={{display: 'block'}}>Pedido 123</span><span>ALEGRIA NA VIDA AGROINDUSTRIAL LTDA</span></span>)},
  { path: '/duplicata/conferencia/2', title: 'Conferir Duplicatas', text: 'Pedido 123 - CLIENTE ABCD'},
  { path: '/duplicata/conferencia/3', title: 'Conferir Duplicatas', text: 'Pedido 123 - CLIENTE ABCD'},
  { path: '/duplicata/conferencia/4', title: 'Conferir Duplicatas', text: 'Pedido 123 - CLIENTE ABCD'},
  { path: '/duplicata/conferencia/5', title: 'Conferir Duplicatas', text: 'Pedido 123 - CLIENTE ABCD'},
  { path: '/duplicata/conferencia/6', title: 'Conferir Duplicatas', text: 'Pedido 123 - CLIENTE ABCD'},
]

class App extends Component {
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
                  {tarefas.map( (t, i) =>
                    <ListGroupItem key={'task-'+i} header={t.title}><Link to={t.path}>{t.text}</Link></ListGroupItem>
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
