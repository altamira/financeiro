import { omit, cloneDeep } from 'lodash';

import format from 'number-format.js';

import api from './../../api/'

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
  InputGroup,
  Tabs, 
  Tab,
  Image
} from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';

import Edit from './Edit';
import Delete from './Delete';
import PrintPreview from './PrintPreview';

import process from './process.svg';

export default class Lancamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "id": 0,
      "nome": "",
      "titulo": "",
      "descricao": "",
      "detalhes": null,
      "documento": {
        "nosso_numero": "",
        "numero": 0,
        "emissao": "2017-01-06T00:00:00.000Z",
        "entrega": "2017-02-25T00:00:00.000Z",
        "condicao": "13 ",
        "cliente": {
          "cnpj": "",
          "inscricao": "",
          "fantasia": "",
          "nome": "L",
          "logradouro": "R",
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
          "conta_contabil": ""
        },
        "representante": {
          "codigo": "",
          "nome": "",
          "comissao": 0
        },
        "totais": {
          "produtos": 0,
          "ipi": 0,
          "total": 0
        },
        "parcelas": []
      },
      "atribuir": "",
      "atribuido": null,
      "form": "",
      "parametros": null,
      "prazo": null,
      "criado": new Date().toISOString(),
      "concluido": null,
      "versao": 0
    }

    // comandos
    this.handleComplete = this.handleComplete.bind(this);
    this.handlePrint = this.handlePrint.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);
    this.onValidate = this.onValidate.bind(this);

    // manipulação da lista de parcelas
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

    this.setTarefa = this.setTarefa.bind(this);
    this.setPedido = this.setPedido.bind(this);

    this.handleNossoNumero = this.handleNossoNumero.bind(this);

  }

  componentWillMount() {
    api.tarefa.get(this.props.params.id, this.setTarefa);
  }

  componentWillReceiveProps(props) {
    api.tarefa.get(props.params.id, this.setTarefa);
  }

  setTarefa(tarefa) {
    console.log(JSON.stringify(tarefa, null, 2))

    this.setState(omit(tarefa, 'documento'), api.gpimac.pedido.get.bind(null, tarefa.documento.numero, this.setPedido));
  }

  setPedido(pedido) {
    console.log(JSON.stringify(pedido, null, 2))

    this.setState({
      documento: {
        nosso_numero: "",
        ...pedido,
        emissao: new Date(pedido.emissao).fromUTC().toISOString(),
        entrega: new Date(pedido.entrega).fromUTC().toISOString(),
        parcelas: pedido.parcelas.map( (parcela) => {
          let vencto = new Date(parcela.vencto).fromUTC();
          let weekend = [1,0,0,0,0,0,1];

          if (weekend[vencto.getUTCDay()]) {
            vencto.setTime(vencto.getTime() + ((vencto.getUTCDay() ? 2 : 1) * 24 * 60 * 60 * 1000))
            parcela.ajuste_dia_util = true
          }

          console.log('Vencto: ' + vencto.toISOString());

          parcela.vencto = vencto.toISOString();

          return parcela;

        })
      },
      canPrint: undefined
    }, api.lancamento.nosso_numero.bind(null, this.handleNossoNumero.bind(this)));
  }

  handleNossoNumero(nosso_numero) {
    this.setState({documento: {...this.state.documento, nosso_numero: (nosso_numero + 1).toString()}})
  }

  handleComplete() {
    let state = omit(this.state, ['dialog']);

    state.documento = {
      ...state.documento,
      nosso_numero: parseInt(this.state.documento.nosso_numero, 10),
      emissao: new Date(state.documento.emissao).toUTC().toISOString(),
      entrega: new Date(state.documento.entrega).toUTC().toISOString(),
      parcelas: state.documento.parcelas.map( parcela => { 
        return {
          "vencto": new Date(parcela.vencto).toUTC(),
          "origem": parcela.origem,
          "forma_pagto": parcela.forma_pagto,
          "tipo_vencto": parcela.tipo_vencto,
          "parcela": parcela.parcela,
          "prazo": parcela.prazo,
          "porcentagem": parcela.porcentagem,
          "valor_produtos": parcela.valor_produtos,
          "valor_ipi": parcela.valor_ipi,
          "valor": parcela.valor
        }
      })
    }

    console.log(JSON.stringify(state, null, 2));

    api.lancamento.concluir(state, this.handleClose.bind(this))

  }

  handleClose() {
    this.setState({canPrint: true});
    //browserHistory.push('/');
  }

  // manipuladores da lista de parcelas
  handleNew() {
    this.setState({dialog: <Edit 
      parcela={
        {
          origem: 'VENDA',
          forma_pagto: 'COBRANCA',
          tipo_vencto: 'DDL',
          emissao: this.state.documento.emissao, 
          entrega: this.state.documento.entrega, 
          data_base: this.state.documento.entrega,
          vencto: this.state.documento.entrega,
          parcela: this.state.documento.parcelas.length + 1,
          prazo: "0",
          valor: "0,00",
          valor_produtos: 0.0,
          valor_ipi: 0.0
        }
      }      
      onSave={this.handleAdd.bind(this)} 
      onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleAdd(parcela) {
    this.setState({
      documento: {
        ...this.state.documento, 
        parcelas: this.state.documento.parcelas.concat([{
          ...parcela, 
          prazo: parseInt(parcela.prazo, 10),
          valor_produtos: parcela.valor_produtos,
          valor_ipi: parcela.valor_ipi,
          valor: parseFloat(parcela.valor.replace('.', '').replace(',', '.')), 
        }])
      }, dialog: null});
  }

  handleEdit(parcela, index) {
    this.setState({dialog: <Edit 
      parcela={{...parcela, 
          prazo: parcela.prazo.toString(),
          emissao: parcela.emissao, 
          entrega: parcela.entrega, 
          data_base: parcela.tipo_vencto === 'DDP' ? this.state.documento.emissao : this.state.documento.entrega,
          valor_produtos: parcela.valor_produtos,
          valor_ipi: parcela.valor_ipi,
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
      prazo: parseInt(parcela.prazo, 10),
      valor: parseFloat(parcela.valor.replace('.', '').replace(',', '.')), 
      valor_produtos: parcela.valor_produtos,
      valor_ipi: parcela.valor_ipi      
    });
    this.setState({documento: {...this.state.documento, parcelas: parcelas}, dialog: undefined})
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

  handleDeleteConfirm(parcela, index) {
    this.setState({dialog: <Delete parcela={parcela} index={index} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
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

  onValidate(propriedade) {
      var regex = /^\$?[0-9]{1,7}?$/;
      return regex.test(this.state.documento[propriedade]) && this.state.documento[propriedade].length < 10;
  }

  handlePrint() {
    this.setState({dialog: <PrintPreview nosso_numero={this.state.documento.nosso_numero} onClose={this.handleCloseDialog.bind(this)} />})
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
      DINHEIRO: 'Dinheiro',
      A_FATURAR: 'Faturar na Entrega'
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
                      this.state.documento.parcelas.length && 
                      !this.state.canPrint)}
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
                overlay={(<Tooltip id="tooltip">Imprimir Título</Tooltip>)}
              >
                  <Button
                    disabled={!this.state.canPrint}
                    onClick={this.handlePrint}
                    style={{width: 120}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="print" />
                    <div><span>Imprimir</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} style={{textAlign: 'right'}} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Fechar</Tooltip>)}
              >
                  <Button
                    onClick={browserHistory.push.bind(null, '/')}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="remove" />
                    <div><span>Fechar</span></div>
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
                                  <Glyphicon glyph="transfer" style={{color: '#fff'}} onClick={api.lancamento.nosso_numero.bind(null, this.handleNossoNumero.bind(this))} />
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
                        <DatePicker name="emissao" value={this.state.documento.emissao} disabled={true} showClearButton={false} readOnly />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={1}>Entrega</Col>
                    <Col xs={12} md={2}>
                      <FormGroup validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker name="entrega" value={this.state.documento.entrega} disabled={true} showClearButton={false} />
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
                            <th colSpan={7} style={{width: 100, textAlign: 'right'}} ><Button style={{width: 110}} bsStyle="success" bsSize="small" onClick={this.handleNew}><Glyphicon glyph="plus" /> Incluir</Button></th>
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
                            //vencto.setTime(vencto.getTime() + (vencto.getTimezoneOffset() * 60 * 1000));

                            return (
                              <tr key={'tr-' + index} id={'tr-' + index} >
                                <td style={{textAlign: 'center'}}>{origem[parcela.origem]}</td>
                                <td style={{textAlign: 'center'}}>{forma_pagto[parcela.forma_pagto]}</td>
                                <td style={{textAlign: 'center', color: parcela.ajuste_dia_util ? 'blue' : 'black'}}>
                                  {parcela.ajuste_dia_util ? 
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip_vencto' + index} >Ajustado para dia útil</Tooltip>}>
                                      <span>{vencto.toLocaleDateString()}</span>
                                    </OverlayTrigger> 
                                  : vencto.toLocaleDateString()}
                                </td>
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
                                    <Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleEdit.bind(null, parcela, index)}>
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
