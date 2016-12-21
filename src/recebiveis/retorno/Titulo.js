import React, { Component } from 'react';

import { 
  Modal,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Panel,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';

import CopyToClipboard from 'react-copy-to-clipboard';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

export default class Titulo extends Component {
	componentWillMount() {
		console.log(JSON.stringify(this.props, null, 2));
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.props);
	}

	handleCopy() {

	}

	ValorValidationState() {
	    var regex = /^[0-9]{1,9}([.]([0-9]{3}))*[,]([.]{0})[0-9]{0,2}$/;
	    const length = this.state.valor.length;
	     if (regex.test(this.state.valor)&&(length<10)){
	      return 'success';
	    } else {
	      return 'error';
	    }
	}

	render() {

		return(

	        <Modal.Dialog>
	          <Modal.Body style={{padding: '0px'}}>

	          	<Panel 
	          		header={'Remessa de Cobrança ' + this.props.cliente.nome} 
	          		bsStyle="primary" 
	          		style={{marginBottom: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} >

		   			<Row>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Pedido</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={this.props.pedido} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Parcela</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.parcela} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Data Remessa</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={this.props.data} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Nosso Número</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.nosso_numero + '/' + this.props.parcela} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Vencimento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.vencto} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Valor</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.valor} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>
				
					<Row>
						<Col xs={12} md={7}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>CNPJ/CPF</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.cnpj} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Inscricao</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.inscricao} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Razão Social</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.nome} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Endereço</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.logradouro + ' ' + this.props.cliente.endereco} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={3}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Numero</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.numero} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Complemento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.complemento} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>CEP</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.CEP} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Bairro</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.bairro} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={7}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Cidade</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.cidade} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Telefone</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.telefone} onChange={this.handleChange} />
								    <FormControl.Feedback />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={8}>
							<FormGroup validationState={this.onValidate()} >
						      	<ControlLabel>Contato</ControlLabel>
								<FormControl type="text" value={this.props.cliente.contato} onChange={this.handleChange} />
						      	<FormControl.Feedback />
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Fechar</Button>
							{ this.props.aceito ? 
								(<Button bsStyle="success" onClick={this.handleSaveAndClose.bind(this)} disable={false} style={{margin: '5px'}} >Titulo Aceito pelo Banco</Button>) :
								(<Button bsStyle="danger" onClick={this.handleSaveAndClose.bind(this)} disable={false} style={{margin: '5px'}} >Titulo Recusado pelo Banco</Button>)
							}
							
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}