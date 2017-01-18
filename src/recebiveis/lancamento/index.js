
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  FormGroup,
  FormControl,
  Table,
  Tooltip,
  InputGroup
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import Error from './../../Error';

import DatePicker from 'react-bootstrap-date-picker';

//import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
//import Calc from './Calc';

import { omit, cloneDeep } from 'lodash';
import axios from 'axios';

import process from './process.svg';

import format from 'number-format.js';

import jsPDF from 'jspdf';

import PrintPreview from './print';

export default class Lancamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "documento": {
        "nosso_numero": 0,
        "empresa": "",
        "numero": 0,
        "emissao": new Date().toISOString(),
        "entrega": new Date().toISOString(),
        "cliente": {
          "cnpj": "",
          "inscricao": "",
          "fantasia": "",
          "nome": "",
          "logradouro": "",
          "endereco": "",
          "numero": "",
          "complemento": "",
          "bairro": "",
          "municipio": 0,
          "cidade": "",
          "CEP": "",
          "UF": "",
          "ddd": "",
          "telefone": "",
          "contato": "",
          "desconto": false
        },
        "condicao": "",
        "representante": {
          "codigo": "",
          "nome": ""
        },
        "comissao": 0,
        "desconto": 0,
        "totais": {
          "produtos": 0,
          "ipi": 0,
          "total": 0
        },
        "parcelas": []
      },

      // campos de controle, não armazenar
      dialog: null,
    }

    // comandos
    this.handleSaveAndClose = this.handleSaveAndClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handlePrint = this.handlePrint.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);
    this.onValidate = this.onValidate.bind(this);

    // manipulação da lista de parcelas
    this.handleFormAdd = this.handleFormAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handleNossoNumero = this.handleNossoNumero.bind(this);

  }

  componentWillMount() {
    // carrega os parametros da tarefa
    axios
      .get('http://localhost:1880/api/tarefa/' + this.props.params.id)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(response.data);
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })    

    axios
      .get('http://localhost:1880/api/financeiro/recebiveis/lancamento/nosso_numero1')
      .then( (response) => {
        this.setState({documento: {...this.state.documento, nosso_numero: (response.data.nosso_numero + 1).toString()}})
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })

  }

  componentWillReceiveProps(props) {
    // carrega os parametros da tarefa
    axios
      .get('http://localhost:1880/api/tarefa/' + props.params.id)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(response.data);
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })      

    axios
      .get('http://localhost:1880/api/financeiro/recebiveis/lancamento/nosso_numero1')
      .then( (response) => {
        this.setState({documento: {...this.state.documento, nosso_numero: (response.data.nosso_numero + 1).toString()}})
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })

  }
  
  handleSaveAndClose() {
    axios
      .post('http://localhost:1880/api/tarefa/' + this.props.params.id, omit(this.state, ['dialog']))
      .then( (response) => {
        console.log(response.data);
        browserHistory.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  handleComplete(data) {
    console.log(JSON.stringify(omit(this.state, ['dialog']), null, 2));
    // carrega os parametros da tarefa
    axios
      .post('http://localhost:1880/api/financeiro/recebiveis/lancamento/tarefa/' + this.props.params.id, omit(this.state, ['dialog']))
      .then( (response) => {
        console.log(response.data);
        browserHistory.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  // manipuladores da lista de parcelas
  handleFormAdd() {
    this.setState({dialog: <Edit 
      parcela={{
          origem: 'VENDA',
          forma_pagto: 'COBRANCA',
          tipo_vencto: 'DDL',
          emissao: this.state.documento.emissao, 
          entrega: this.state.documento.entrega, 
          data_base: this.state.documento.entrega,
          vencto: this.state.documento.entrega,
          parcela: this.state.documento.parcelas.length + 1,
          prazo: "0",
          valor: "0,00"
        }}      
      onSave={this.handleAdd.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleAdd(parcela) {
    this.setState({
      documento: {
        ...this.state.documento, 
        parcelas: this.state.documento.parcelas.concat([{
          ...parcela, valor: parseFloat(parcela.valor.replace('.', '').replace(',', '.')), 
          prazo: parseInt(parcela.prazo, 10)
        }])
      }, dialog: null});
  }

  handleFormEdit(parcela, index) {
    this.setState({dialog: <Edit 
      parcela={{...parcela, 
          prazo: parcela.prazo.toString(),
          emissao: parcela.emissao, 
          entrega: parcela.entrega, 
          data_base: parcela.tipo_vencto === 'DDP' ? this.state.documento.emissao : this.state.documento.entrega,
          valor: parcela.valor.toFixed(2).replace('.', '-').replace(',', '').replace('-', ',')
        }} 
      index={index}
      onSave={this.handleUpdate.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleUpdate(parcela, index) {
    let parcelas = this.state.documento.parcelas;
    parcelas.splice(index, 1, {
      ...parcela, 
      valor: parseFloat(parcela.valor.replace('.', '').replace(',', '.')), 
      prazo: parseInt(parcela.prazo, 10)
    });
    this.setState({documento: {...this.state.documento, parcelas: parcelas}, dialog: undefined})
  }

  handleDeleteConfirm(parcela, index) {
    this.setState({dialog: <Delete parcela={parcela} index={index} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleDelete(parcela, index) {
    this.setState(
    {
      documento: 
      {
        ...this.state.documento, 
        parcelas: 
          this.state.documento.parcelas
          .filter( (parcela, i) => i !== index)
          .map( (parcela, i) => {
            parcela.parcela = i + 1;
            return parcela;
          })
      }, 
      dialog: undefined
    });
  }

  handleCopy(parcela, index) {
    this.setState(
    {
      documento: 
      {
        ...this.state.documento, 
        parcelas: 
          this.state.documento.parcelas.concat([cloneDeep(this.state.documento.parcelas[index])])
          .map( (p, i) => {
            p.parcela = i + 1;
            return p;
          })
      }
    });
  }

  handleCloseDialog() {
    this.setState({dialog: null})
  }

  // formulario
  handleChange(element) {
    this.setState({documento: {...this.state.documento, [element.target.name]: element.target.value}});
  }

  handleChangeDate(value, formattedValue) {
    //this.setState({documento: {...this.state.documento, [value.target.name]: value.target.value}});
  }

  handleNossoNumero() {
    axios
      .get('http://localhost:1880/api/financeiro/recebiveis/lancamento/nosso_numero1')
      .then( (response) => {
        this.setState({documento: {...this.state.documento, nosso_numero: (response.data.nosso_numero + 1).toString()}})
      })
      .catch( error => {
        this.setState({dialog: <Error {...error} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  onValidate(propriedade) {
      var regex = /^\$?[0-9]{1,7}?$/;
      return regex.test(this.state.documento[propriedade]) && this.state.documento[propriedade].length < 10;
  }

  handlePrint() {
    console.log('imprimir...');

    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    doc.setFont('Arial');

    this.state.documento.parcelas.forEach(function(parcela, index) {
  
      let margin_top = 0;

      if (index > 0 && !(index % 2)) {
        doc.addPage();
      }

      if (index % 2) {
        margin_top = 148
      }

      // Quadros
      doc.rect(5, margin_top + 5, 200, 13); 
      doc.rect(5, margin_top + 20, 200, 110); 

      // Quadros internos
      doc.rect(5, margin_top + 28, 200, 10); 

      doc.setFontSize(12);
      doc.text(163, margin_top + 10, 'Emissão:' + new Date().toLocaleDateString());

      doc.setFontSize(18);
      doc.text(70, margin_top + 13, 'Cobrança de Título');

      doc.setFontSize(16);

      doc.text(8, margin_top + 26, 'Fatura');
      doc.text(40, margin_top + 26, 'Nosso Número');
      doc.text(90, margin_top + 26, 'Pedido');
      doc.text(120, margin_top + 26, 'Valor');

      doc.text(8, margin_top + 35, this.nosso_numero.toString());
      doc.text(40, margin_top + 35, this.nosso_numero.toString() + '-' + parcela.parcela.toString());
      doc.text(90, margin_top + 35, this.numero.toString());
      doc.text(120, margin_top + 35, format('R$ ###.###.##0,00', parcela.valor));

      doc.setFontSize(16);
      doc.text(160, margin_top + 26, 'Vencimento');

      let vencto = new Date(parcela.vencto);
      vencto.setTime(vencto.getTime() + vencto.getTimezoneOffset() * 60 * 1000);
      doc.text(160, margin_top + 35, vencto.toLocaleDateString());

      doc.setFontSize(14);
      doc.setFontStyle('bold');

      doc.text(8, margin_top + 45, 'CNPJ');
      doc.text(8, margin_top + 52, 'Inscrição Estadual');
      doc.text(8, margin_top + 59, 'Nome do Sacado');
      doc.text(8, margin_top + 66, 'Endereço');
      doc.text(8, margin_top + 73, 'Complemento/Bairro');
      doc.text(8, margin_top + 80, 'Cidade');
      doc.text(8, margin_top + 87, 'UF');
      doc.text(8, margin_top + 94, 'CEP');
      doc.text(8, margin_top + 101, 'Telefone');
      doc.text(8, margin_top + 108, 'Contato');
      doc.text(8, margin_top + 115, 'Representante');
      doc.text(8, margin_top + 122, 'Cond. Pagto');

      doc.setFontStyle('normal');

      doc.text(60, margin_top + 45, this.cliente.cnpj);
      doc.text(60, margin_top + 52, this.cliente.inscricao);
      doc.text(60, margin_top + 59, this.cliente.nome.trim());
      doc.text(60, margin_top + 66, this.cliente.logradouro.trim() + ' ' + this.cliente.endereco.trim() + ' ' + this.cliente.numero.trim());
      doc.text(60, margin_top + 73, this.cliente.complemento.trim() + ' ' + this.cliente.bairro.trim());
      doc.text(60, margin_top + 80, this.cliente.cidade.trim());
      doc.text(60, margin_top + 87, this.cliente.UF);
      doc.text(60, margin_top + 94, this.cliente.CEP);
      doc.text(60, margin_top + 101, '(' + this.cliente.ddd + ') ' + this.cliente.telefone.trim());
      doc.text(60, margin_top + 108, this.cliente.contato.trim());
      doc.text(60, margin_top + 115, this.representante.codigo + ' ' + this.representante.nome.trim());
      doc.text(60, margin_top + 122, parcela.prazo.toString() + ' ' + parcela.tipo_vencto + ' - ' + parcela.forma_pagto + ' ' + parcela.origem);

    }.bind(this.state.documento))

    this.setState({dialog: <PrintPreview src={doc.output('bloburi')} onClose={this.handleCloseDialog.bind(this)} />})
  }

  render() {

    let origem = {
      VENDA: 'Venda de Produto',
      DIFAL: 'Diferencial de ICMS'
    }

    let forma_pagto = {
      COBRANCA: 'Cobrança Bancária',
      DEPOSITO: 'Depósito Bancário',
      BNDES: 'Cartão BNDES',
      CHEQUE: 'Cheque',
      DINHEIRO: 'Dinheiro'
    }

    let tipo_vencto = {
      DDP: 'Dia(s) do Pedido',
      DDL: 'Dia(s) da Entrega',
      DDM: 'Dia(s) da Montagem'
    }

    return (

      <div>

        <Panel header={'Gerar lançamentos para Contas a Receber - Pedido ' + (this.state.documento.numero)} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>

            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Confirmar lançamentos</Tooltip>)}
              >
                  <Button
                    onClick={this.handleComplete}
                    disabled={!(
                      this.onValidate('nosso_numero') &&
                      this.state.documento.parcelas.length)}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Conferido</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Confirmar lançamentos</Tooltip>)}
              >
                  <Button
                    onClick={this.handlePrint}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Imprimir</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} style={{textAlign: 'right'}} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Salvar alterações e terminar depois.</Tooltip>)}
              >
                  <Button
                    onClick={this.handleClose}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="time" />
                    <div><span>Terminar depois</span></div>
                  </Button>

              </OverlayTrigger>

            </Col>

          </Row>

          <Row>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Formulário">
                <div style={{margin: 20}}>

                  <Row style={{paddingTop: 20}} >
                    <Col xs={12} md={2}>Nosso Número</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState={this.onValidate('nosso_numero') ? 'success' : 'error'} >
                        <InputGroup>
                          <FormControl type="text" name="nosso_numero" value={this.state.documento.nosso_numero} onChange={this.handleChange} />
                          {this.onValidate('nosso_numero') ? 
                            <FormControl.Feedback />
                          :
                            <InputGroup.Addon className='btn-danger' style={{cursor: 'pointer'}} >
                              <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_nosso_numero'}>Atualizar Nosso Número</Tooltip>}>
                                  <Glyphicon glyph="transfer" style={{color: '#fff'}} onClick={this.handleNossoNumero} />
                              </OverlayTrigger>
                            </InputGroup.Addon>
                          }
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={7}></Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={2}>Pedido</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        <FormControl type="text" name="numero" value={this.state.documento.numero} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker name="emissao" value={this.state.documento.emissao} onChange={this.handleChangeDate} disabled={true} showClearButton={false} readOnly />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker name="entrega" value={this.state.documento.entrega} onChange={this.handleChangeDate} disabled={true} showClearButton={false} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" style={{textAlign: 'right'}} name="cnpj" value={this.state.documento.cliente.cnpj} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={2}>Representante</Col>
                    <Col xs={12} md={5}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" name="representante" value={this.state.documento.representante.nome} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" name="nome" value={this.state.documento.cliente.nome} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Valor Produtos</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" name="produtos" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', this.state.documento.totais.produtos)} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>IPI</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" name="ipi" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', this.state.documento.totais.ipi)} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Total</Col>
                    <Col xs={12} md={3}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" name="total" style={{textAlign: 'right'}} value={format('R$ ###.###.##0,00', this.state.documento.totais.total)} onChange={this.handleChange} readOnly />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th colSpan={7} style={{width: 100, textAlign: 'right'}} ><Button style={{width: 110}} bsStyle="success" bsSize="small" onClick={this.handleFormAdd}><Glyphicon glyph="plus" /> Incluir</Button></th>
                          </tr>
                          <tr>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Origem</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Forma Pagto</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Vencimento</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Prazo</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor da Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: 120}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.documento.parcelas.map( (parcela, index) => {
                            let vencto = new Date(parcela.vencto);
                            vencto.setTime(vencto.getTime() + vencto.getTimezoneOffset() * 60 * 1000);

                            return (
                              <tr key={'tr-' + index} id={'tr-' + index} >
                                <td style={{textAlign: 'center'}}>{origem[parcela.origem]}</td>
                                <td style={{textAlign: 'center'}}>{forma_pagto[parcela.forma_pagto]}</td>
                                <td style={{textAlign: 'center'}}>{vencto.toLocaleDateString()}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela}/{this.state.documento.parcelas.length}</td>
                                <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo_vencto === "DDP" ? 'SINAL' : parcela.prazo + ' ' + tipo_vencto[parcela.tipo_vencto]}</td>
                                <td style={{textAlign: 'right'}}>{format('R$ ###.###.##0,00', parcela.valor)}</td>
                                <td>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_duplicar' + index} >Duplicar</Tooltip>}>
                                    <Button bsStyle="info" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleCopy.bind(null, parcela, index)}>
                                      <Glyphicon glyph="random" />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_alterar' + index} >Alterar</Tooltip>}>
                                    <Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleFormEdit.bind(null, parcela, index)}>
                                      <Glyphicon glyph="edit" />
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id={'tooltip_excluir' + index}>Excluir</Tooltip>}>
                                    <Button bsStyle="danger" style={{width: '33px'}} bsSize="small" onClick={this.handleDeleteConfirm.bind(null, parcela, index)}>
                                      <Glyphicon glyph="remove" />
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>                              
                            )
                          }
                            
                          )}
   
                          <tr>
                            <td colSpan={4}></td>
                            <td style={{textAlign: 'right'}}><b>Total das Parcelas</b></td>
                            <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', this.state.documento.parcelas.reduce( (soma, parcela) => soma + parcela.valor, 0.0))}</b></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey={2} title="Procedimento">
                <Image src={process} style={{width: '100%', height: '100%'}} />
              </Tab>
            </Tabs>
          </Row>
        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
