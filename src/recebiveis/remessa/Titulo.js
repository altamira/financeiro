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
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

export default class Titulo extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}
	
	componentWillMount() {
		console.log(JSON.stringify(this.props, null, 2));
	}

	handleSaveAndClose() {
		this.props.onSave && this.props.onSave(this.props);
	}

	handleChange(event) {

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
							      	<FormControl type="text" value={this.props.pedido} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Parcela</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.parcela} onChange={this.handleChange} />
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Data Remessa</ControlLabel>
						      	<InputGroup>
							      	<FormControl type="text" value={this.props.data} onChange={this.handleChange} />
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Nosso Número</ControlLabel>
						      	<InputGroup>
						      		<FormControl type="text" value={this.props.nosso_numero + '/' + this.props.parcela} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.nosso_numero.toString()} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nosso_numero'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
								</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Vencimento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.vencto} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.vencto} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_vencto'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Valor</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.valor} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.valor.toString()} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_valor'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>
				
					<Row>
						<Col xs={12} md={7}>
							<FormGroup>
						      	<ControlLabel>CNPJ/CPF</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.cnpj} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.cnpj} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_cnpj'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Inscricao</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.inscricao} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.inscricao} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_inscricao'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12}>
							<FormGroup>
						      	<ControlLabel>Razão Social</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.nome} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.nome} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nome'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12}>
							<FormGroup>
						      	<ControlLabel>Endereço</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.logradouro + ' ' + this.props.cliente.endereco} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.logradouro + ' ' + this.props.cliente.endereco} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_endereco'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={3}>
							<FormGroup>
						      	<ControlLabel>Numero</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.numero} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.numero} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_numero'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Complemento</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.complemento} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.complemento} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_complemento'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>CEP</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.CEP} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.CEP} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_CEP'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={5}>
							<FormGroup>
						      	<ControlLabel>Bairro</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.bairro} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.bairro} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_bairro'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={7}>
							<FormGroup>
						      	<ControlLabel>Cidade</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.cidade} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.cidade} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_cidade'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={4}>
							<FormGroup>
						      	<ControlLabel>Telefone</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.telefone} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.telefone} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_contato'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
						<Col xs={12} md={8}>
							<FormGroup>
						      	<ControlLabel>Contato</ControlLabel>
						      	<InputGroup>
								    <FormControl type="text" value={this.props.cliente.contato} onChange={this.handleChange} />
					      			<CopyToClipboard text={this.props.cliente.contato} onCopy={this.handleCopy}>
							      		<InputGroup.Addon className='btn-success' style={{cursor: 'pointer', color: 'white'}} >
							      			<OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_contato'}>Copiar</Tooltip>}>
									          		<Glyphicon glyph="transfer" />
								          	</OverlayTrigger>
								        </InputGroup.Addon>
						          	</CopyToClipboard>
						      	</InputGroup>
						    </FormGroup>						    
						</Col>
					</Row>

					<Row>
						<Col xs={12} md={12} style={{textAlign: 'right'}} >
							<Button onClick={this.props.onClose} style={{margin: '5px'}} >Fechar</Button>
							<Button bsStyle="success" onClick={this.handleSaveAndClose.bind(this)} style={{margin: '5px'}} >Confirma Titulo Enviado</Button>
						</Col>
	            	</Row>

				</Panel>

	          </Modal.Body>

	        </Modal.Dialog>
	    
		)
	}
}