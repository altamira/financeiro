import React, { Component } from 'react';

import {
  Modal,
  Table,
  Button
} from 'react-bootstrap';

export default class Delete extends Component {
	
	render() {

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
			                    <td style={{textAlign: 'center'}}>{this.props.erro}</td>
			                    <td style={{textAlign: 'center'}}>{this.props.mensagem}</td>
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