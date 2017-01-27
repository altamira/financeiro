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
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

import CopyToClipboard from 'react-copy-to-clipboard';
import format from 'number-format.js';

export default class Titulo extends Component {
	constructor(props) {
		super(props);

		this.state = this.props;

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCliente = this.handleChangeCliente.bind(this);
	}
	
	componentWillMount() {
		console.log(JSON.stringify(this.props, null, 2));
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.state);
	}

	handleChange(element) {
		
	}

	handleChangeCliente(element) {
		this.setState({cliente: {...this.state.cliente, [element.target.name]: element.target.value}})
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
							<FormGroup>
						      	<ControlLabel>Pedido</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={this.props.pedido} onChange={this.handleChange} readOnly />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Parcela</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.parcela} onChange={this.handleChange} readOnly />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Data Remessa</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={new Date().toLocaleDateString()} onChange={this.handleChange} readOnly />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Nosso Número</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.nosso_numero + '/' + this.props.parcela} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.props.nosso_numero.toString()} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nosso_numero'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Vencimento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={new Date(this.props.vencto).toLocaleDateString()} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={new Date(this.props.vencto).toLocaleDateString()} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_vencto'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Valor</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={format('########0,00', this.props.valor)} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={format('########0,00', this.props.valor)} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_valor'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>
				
					<Row>
						<Col xs={12} md={7}>
							<FormGroup>
						      	<ControlLabel>CNPJ/CPF</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.cnpj} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.props.cliente.cnpj} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_cnpj'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Inscricao</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.inscricao} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.props.cliente.inscricao} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_inscricao'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12}>
							<FormGroup>
						      	<ControlLabel>Razão Social</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.nome} onChange={this.handleChange} readOnly />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.props.cliente.nome} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nome'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={2}>
							<FormGroup>
						      	<ControlLabel>Logradouro</ControlLabel>
							    <FormControl type="text" name="logradouro" value={this.state.cliente.logradouro} onChange={this.handleChangeCliente} />
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={10}>
							<FormGroup>
						      	<ControlLabel>Endereço</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="endereco" value={this.state.cliente.endereco} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.logradouro + ' ' + this.props.cliente.endereco} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_endereco'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={3}>
							<FormGroup>
						      	<ControlLabel>Numero</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="numero" value={this.state.cliente.numero} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.numero} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_numero'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Complemento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="complemento" value={this.state.cliente.complemento} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.complemento} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_complemento'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>CEP</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="CEP" value={this.state.cliente.CEP} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.CEP} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_CEP'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Bairro</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="bairro" value={this.state.cliente.bairro} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.bairro} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_bairro'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={7}>
							<FormGroup>
						      	<ControlLabel>Cidade</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="cidade" value={this.state.cliente.cidade} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.cidade} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_cidade'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Telefone</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="telefone" value={this.state.cliente.telefone} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.telefone} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_contato'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={8}>
							<FormGroup>
						      	<ControlLabel>Contato</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" name="contato" value={this.state.cliente.contato} onChange={this.handleChangeCliente} />
						      		<InputGroup.Addon style={{cursor: 'pointer'}} >
						      			<CopyToClipboard text={this.state.cliente.contato} onCopy={this.handleCopy}>
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_contato'}>Copiar</Tooltip>}>
								          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
							          	</CopyToClipboard>
						          	</InputGroup.Addon>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Fechar</Button>
							<Button bsStyle="success" onClick={this.handleSaveAndClose.bind(this)} style={{margin: '5px'}} >Título Enviado</Button>
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}