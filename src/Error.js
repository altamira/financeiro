import React, { Component } from 'react';

import {
  Modal,
  Table,
  Button
} from 'react-bootstrap';

export default class Error extends Component {
	
	render() {

		let erro = '';
		let mensagem = '';

		if (this.props.response && this.props.response.data) {
			erro = this.props.response.data.erro;
			mensagem = this.props.response.data.mensagem;
		} else if (this.props.message) {
			erro = this.props.message.error;
			mensagem = this.props.message.message;
		}

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Mensagem de erro</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>
		          	<h4 style={{textAlign: 'center'}}>Ocorreu um erro ao executar esta operação</h4>
		          	<Table>
		          		<tbody>
							<tr>
			                    <td style={{textAlign: 'center'}}>{erro}</td>
			                    <td style={{textAlign: 'center'}}>{mensagem}</td>
			                </tr>
		                </tbody> 
	                </Table>

		          </Modal.Body>

		          <Modal.Footer>
		            <Button bsStyle="danger" onClick={this.props.onClose} >Fechar</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}		