import React, { Component } from 'react';

import {
  Modal,
  Table,
  Button
} from 'react-bootstrap';

export default class Delete extends Component {
	
	constructor(props) {
		super(props);

		this.state = this.props.item;

		this.handleSave = this.handleSave.bind(this);
	}

	handleSave() {
		this.props.onSave && this.props.onSave(this.props.index);
	}

	componentWillReceiveProps(props) {
		this.setState(this.props.item);
	}

	render() {

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Confirma excluir esta parcela ?</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>
		          	<Table>
		          		<tbody>
							<tr>
			                    <td style={{textAlign: 'center'}}>{new Date(this.state.vencto).toLocaleDateString()}</td>
			                    <td style={{textAlign: 'center'}}>{this.state.parcela === 1 && this.state.tipo === "DDP" ? 'SINAL' : this.state.tipo === 'DDP' ? this.state.prazo + ' dia(s) do PEDIDO' :  this.state.prazo + ' dia(s) da ENTREGA'}</td>
			                    <td style={{textAlign: 'right'}}>R$ {Number(this.state.valor.toFixed(2)).toLocaleString()}</td>
			                </tr>
		                </tbody> 
	                </Table>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button onClick={this.props.onClose} >Cancelar</Button>
		            <Button bsStyle="danger" onClick={this.handleSave} >Confirmar</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}		