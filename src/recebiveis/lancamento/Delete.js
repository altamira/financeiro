import React, { Component } from 'react';

import {
  Modal,
  Table,
  Button
} from 'react-bootstrap';

export default class Delete extends Component {
	
	constructor(props) {
		super(props);

		this.handleSave = this.handleSave.bind(this);
	}

	handleSave() {
		this.props.onSave && this.props.onSave(this.props.parcela, this.props.index);
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
			                    <td style={{textAlign: 'center'}}>{new Date(this.props.parcela.vencto).toLocaleDateString()}</td>
			                    <td style={{textAlign: 'center'}}>{this.props.parcela.parcela === 1 && this.props.parcela.tipo === "DDP" ? 'SINAL' : this.props.parcela.tipo === 'DDP' ? this.props.parcela.prazo + ' dia(s) do PEDIDO' :  this.props.parcela.prazo + ' dia(s) da ENTREGA'}</td>
			                    <td style={{textAlign: 'right'}}>R$ {Number(this.props.parcela.valor.toFixed(2)).toLocaleString()}</td>
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