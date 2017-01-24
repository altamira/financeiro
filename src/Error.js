import React, { Component } from 'react';

import {
  Modal,
  Button
} from 'react-bootstrap';

export default class Error extends Component {
	
	render() {

       	console.log('Erro:' + JSON.stringify(this.props, null, 2))

		let erro = '';
		let mensagem = '';

		if (this.props.response && this.props.response.data) {
			erro = this.props.response.data.erro || 9999;
			mensagem = this.props.response.data.mensagem || 'Erro imprevisto, nenhuma mensagem recebida.';
		} else if (this.props.message) {
			mensagem = this.props.message;
		}

		return(

			<div className="static-modal">
		        <Modal.Dialog>
		          <Modal.Header>
		            <Modal.Title>Mensagem {erro ? '(código do erro: ' + erro + ')': ''}</Modal.Title>
		          </Modal.Header>

		          <Modal.Body>
		          	
		          	<h4 style={{textAlign: 'center'}}>{mensagem}</h4>

		          	{/*<Table>
		          		<tbody>
							<tr>
			                    <td style={{textAlign: 'center'}}>{erro}</td>
			                    <td style={{textAlign: 'center'}}>{mensagem}</td>
			                </tr>
		                </tbody> 
	                </Table>*/}

		          </Modal.Body>

		          <Modal.Footer>
		            <Button bsStyle={erro ? 'danger' : 'success'} onClick={this.props.onClose} >Fechar</Button>
		          </Modal.Footer>

		        </Modal.Dialog>
		    </div>

		);

	}
}		