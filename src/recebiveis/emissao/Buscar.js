import React, { Component } from 'react';
import {  
  Col, 
  Row, 
  FormGroup,
  FormControl,
  Table,
  Modal,
  Button
} from 'react-bootstrap';

import axios from 'axios';

export default class Buscar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pedido: '',
			cnpj: '',
			nome: '',
			lista: []
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClose() {
		this.onClose && this.onClose();
	}

	handleSelect(item) {
		this.props.onSelect && this.props.onSelect(item);
	}

	handleSearch() {
		axios
		.get('http://financeiro:1880/api/financeiro/duplicata/conferencia/busca?pedido=' + (this.state.pedido || '') + '&cnpj=' + (this.state.cnpj || '') + '&nome=' + (this.state.nome || ''))
		.then(function (response) {
		    console.log(response);
		    if (response.data instanceof Array && response.data.length > 0) {
		    	this.setState({lista: response.data})
		    }
		   	else {
				alert('Nenhm registro encontrado !');
		   	}
		}.bind(this))
		.catch(function (error) {
		    console.log(error);
		    alert('Erro ao buscar pedidos:\n' + JSON.stringify(error));
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Buscar Duplicata</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>

	                  <Row>
	                    <Col xs={2} md={2}>Pedido</Col>
	                    <Col xs={3} md={3}>
	                      <FormGroup controlId="pedido" validationState="success">
	                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
	                        <FormControl type="text" id="pedido" value={this.state.pedido} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>
	                    <Col xs={2} md={2}>CNPJ/CPF</Col>
	                    <Col xs={5} md={5}>
	                      <FormGroup controlId="cnpj" validationState="success">
	                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
	                        <FormControl type="text" id="cnpj" value={this.state.cnpj} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>
	                  </Row>
	                  <Row>
	                    <Col xs={2} md={2}>Razão Social</Col>
	                    <Col xs={10} md={10}>
	                      <FormGroup controlId="nome" validationState="success">
	                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
	                        <FormControl type="text" id="nome" value={this.state.nome} onChange={this.handleChange} />
	                        <FormControl.Feedback />
	                      </FormGroup>
	                    </Col>
	                  </Row>

					<Row>
	                    <Col xs={12} md={12}>
							<Table striped bordered condensed hover>
							    <thead>
							      <tr>
							        <th>Emissão</th>
							        <th>Pedido</th>
							        <th>Nome Fantasia</th>
							        <th>Razão Social</th>
							      </tr>
							    </thead>
							    <tbody>
								    {this.state.lista.map( item =>
								      <tr style={{cursor: 'pointer'}} key={item.pedido} onClick={this.handleSelect.bind(null, item)}>
								        <td>{new Date(item.emissao).toLocaleDateString()}</td>
								        <td>{item.pedido}</td>
								        <td>{item.fantasia}</td>
								        <td>{item.nome}</td>
								      </tr>
								    )}
								</tbody>
  							</Table>
		                </Col>
	                </Row>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button onClick={this.props.onClose} >Fechar</Button>
		            <Button bsStyle="primary" onClick={this.handleSearch}>Buscar</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}