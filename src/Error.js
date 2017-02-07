import React, { Component } from 'react';

import {
  Modal,
  Button
} from 'react-bootstrap';

export default class Error extends Component {
	
	render() {

       	console.log('Erro:' + JSON.stringify(this.props, null, 2))

		let erro = 0;
		let mensagem = 'Erro desconhecido, nenhuma mensagem recebida.';

		if (this.props.response && this.props.response.data) {
			erro = this.props.response.data.erro || erro;
			mensagem = this.props.response.data.mensagem || mensagem;
		} else if (this.props.message) {
			erro = this.props.error || erro;
			mensagem = this.props.message || mensagem;
		} else if (this.props.mensagem) {
			erro = this.props.erro || erro;
			mensagem = this.props.mensagem || mensagem;
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