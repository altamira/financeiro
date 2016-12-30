
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  Table,
  Tooltip,
} from 'react-bootstrap';

import { Tabs, Tab } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import { omit } from 'lodash';
import axios from 'axios';

import process from './process.svg';

import Form from './Titulo';

/*! FUNCTION: ARRAY.KEYSORT(); **/
Array.prototype.sortByKey = function(key, desc){
  this.sort(function(a, b) {
    var result = desc ? (a[key] < b[key]) : (a[key] > b[key]);
    return result ? 1 : -1;
  });
  return this;
}

export default class Remessa extends Component {
  constructor(props) {
    super(props);

    this.state = {

      tarefa: {},

      carteira: {
        "id": 0,
        "banco": "",
        "agencia": "0",
        "conta": "0",
        "carteira": 0,
        "nome": "",
        "limite": 0,
        "utilizado": 0,
        "saldo": 0,
        "defasagem": 0,
        "descoberto": 0,
        "iof": 0,
        "juros": 0,
        "bordero": 0,
        remessa: 0,
        retorno: 0
      },

      bordero: {
        valor_bruto: 0, 
        valor_liquido: 0, 
        valor_operacao: 0, 
        valor_tarifa: 0, 
        valor_iof: 0, 
        valor_juros: 0, 
        taxa_juros: 0, 
      },

      remessa: [
        {
          "nosso_numero": 0,
          "pedido": 0,
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
            "desconto": 0
          },
          "parcelas": []
        }
      ],

      // campos de controle, não armazenar
      dialog: null,

      // false = ascending order, true = descending order
      order: {
        nosso_numero: null, 
        vencto: null,
        nome: null,
        parcela: null,
        valor: null, 
      }
    }

    // comandos
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.handleOrderBy = this.handleOrderBy.bind(this);

  }

  componentWillMount() {
    // carrega os parametros da tarefa
    axios
      .get('http://localhost:1880/api/tarefa/' + this.props.params.id)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState({
          tarefa: omit(response.data, 'documento'), 
          data: response.data.documento.data,
          carteira: response.data.documento.carteira,
          remessa: response.data.documento.remessa
        });
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  componentWillReceiveProps(props) {
    // carrega os parametros da tarefa
    axios
      .get('http://localhost:1880/api/tarefa/' + props.params.id)
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState({
          tarefa: omit(response.data, 'documento'), 
          data: response.data.documento.data,
          carteira: response.data.documento.carteira,
          remessa: response.data.documento.remessa
        });
      })
      .catch( error => {
        this.setState({dialog: <Error {...error.response.data} onClose={this.handleCloseDialog.bind(this)} />})
      })    
  }

  handleClose() {
    this.props.router.push('/');
  }

  handleComplete(data) {
    console.log(JSON.stringify({
      ...this.state.tarefa, 
      documento: { 
        carteira: this.state.carteira, 
        bordero: this.state.bordero,
        remessa: this.state.remessa,
      }
    }, null, 2));

    // carrega os parametros da tarefa
    axios
      .post('http://localhost:1880/api/financeiro/recebiveis/remessa/tarefa/' + this.props.params.id, {
        ...this.state.tarefa, 
        documento: { 
          carteira: this.state.carteira, 
          bordero: this.state.bordero,
          remessa: this.state.remessa,
        }
      })
      .then( (response) => {
        console.log(response.data);
        this.props.router.push('/');
      })
      .catch( error => {
        this.setState({dialog: <Error 
          erro={error.response ? error.response.data.erro : 0} 
          mensagem={error.message + (error.response.data.mensagem || JSON.stringify(error.response.data, null, 2))} 
          onClose={this.handleCloseDialog.bind(this)} />})
      })
  }

  handleSelect(remessa) {
    this.setState({dialog: <Form {...remessa} onClose={this.handleCloseDialog.bind(this)} onSave={this.handleSelectSave.bind(this)} />})
  }

  handleSelectSave(remessa) {
    this.setState({
      dialog: undefined,
      remessa: this.state.remessa.map( (r, i) => {
        
        if (remessa.remessa_index === i) {
          r.parcelas[remessa.parcela_index].selected = true;
        } 

        return r;
      })
    })
  }

  handleUnselect() {

  }

  handleConfirm(item) {
    //this.setState({dialog: <Confirm item={item} onSave={this.handleDelete.bind(this)} onClose={this.handleCloseDialog.bind(this)} />})
  }

  handleCloseDialog() {
    this.setState({dialog: undefined})
  }

  // formulario
  handleChange(value) {
    this.setState({[value.target.id]: value.target.value});
  }

  handleOrderBy(key) {
    let order = {nosso_numero: null, vencto: null, nome: null, parcela: null, valor: null};
    let remessas = this.state.remessas;
    order[key] = !this.state.order[key];
    this.setState({remessas: remessas.sortByKey(key, order[key]), order: order });
  }

  render() {

    let total = this.state.remessa.reduce( (total, r) => total + r.parcelas.reduce( (subtotal, p) => subtotal + (p.selected ? p.valor : 0.0), 0.0), 0.0);

    return (

      <div>

        <Panel header={'Remessa de Cobrança'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
          
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Tarefa concluída</Tooltip>)}
              >
                  <Button
                    disabled={!!this.state.remessa.find( r => r.parcelas.find( p => !p.selected))}
                    onClick={this.handleComplete}
                    style={{width: 150}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Remessa Enviada</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>

            <Col xs={4} md={4} />

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

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
                        <thead>
                          <tr>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}} >Carteira</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Limite</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Utilizado</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Saldo</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Defasagem</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Enviar</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Remessa</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Retorno</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td style={{textAlign: 'left'}}><h2><b>{this.state.carteira.nome}</b></h2></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.limite.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.utilizado.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.saldo.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.defasagem.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.descoberto.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.remessa.toFixed(2)).toLocaleString()}</b></td>
                              <td style={{textAlign: 'right'}}><b>{Number(this.state.carteira.retorno.toFixed(2)).toLocaleString()}</b></td>
                            </tr>                              
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={12}>
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Número</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Pedido</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Vencimento</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'center'}}>Prazo</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor da Parcela</th>
                            <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', width: '1%'}}></th>
                          </tr>
                        </thead>

                          {this.state.remessa.map( (r, index) => <Titulo key={'titulo-' + r.nosso_numero} {...r} index={index} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}
                        
                      </Table>
                    </Col>
                  </Row>
                  
                  {/*<Row>
                    <Col xs={0} md={8}></Col>
                    <Col xs={12} md={4}>
                      {this.state.remessa.find( remessa => remessa.parcelas.find( parcela => parcela.selected)) && this.state.carteira !== null ? 

                        <Table striped bordered condensed hover>
                          <thead>
                            <tr>
                              <th style={{textAlign: 'right'}}>DESCONTOS</th>
                              <th style={{textAlign: 'right'}}>VALOR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Valor Bruto</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number(total.toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>IOF ({Number((this.state.carteira.iof / 100).toFixed(2)).toLocaleString()}%)</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total * (this.state.carteira.iof / 100)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Juros ({Number((this.state.carteira.juros / 100).toFixed(2)).toLocaleString()}%)</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total * (this.state.carteira.juros / 100)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Taxa do Borderô</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((this.state.carteira.bordero).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                            <tr>
                              <td style={{textAlign: 'right'}}><b>Valor Líquido</b></td>
                              <td style={{textAlign: 'right'}}><b>R$ {Number((total - (total * ((this.state.carteira.iof + this.state.carteira.juros) / 100) + this.state.carteira.bordero)).toFixed(2)).toLocaleString()}</b></td>
                            </tr>
                          </tbody>
                        </Table>
                          
                        : null
                      }
                    </Col>
                  </Row> */}             
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

const Titulo = (remessa) =>
  <tbody>
    <tr>
      <td colSpan={8} style={{borderBottom: '2px solid black'}} ><h4><b>{remessa.cliente.nome}</b></h4></td>
    </tr>
    {remessa.parcelas.map ( (parcela, index) =>
      <Parcela key={'parcela-' + remessa.nosso_numero + '-' + index} {...parcela} nosso_numero={remessa.nosso_numero} pedido={remessa.pedido} cliente={remessa.cliente} remessa_index={remessa.index} parcela_index={index} handleSelect={remessa.handleSelect} handleUnselect={remessa.handleUnselect} />
    )}
  </tbody>

const Parcela = (parcela) =>
  <tr>
    <td style={{textAlign: 'center'}}>{parcela.nosso_numero}</td>
    <td style={{textAlign: 'center'}}><b>{parcela.pedido}</b></td>
    <td style={{textAlign: 'center'}}>{new Date(parcela.vencto).toLocaleDateString()}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela}</td>
    <td style={{textAlign: 'center'}}>{parcela.parcela === 1 && parcela.tipo === "DDP" ? 'SINAL' : parcela.tipo === 'DDP' ? parcela.prazo + ' dia(s) do PEDIDO' :  parcela.prazo + ' dia(s) da ENTREGA'}</td>
    <td style={{textAlign: 'right'}}><b>R$ {Number(parcela.valor).toLocaleString()}</b></td>
    <td>
      {!parcela.selected ? 
        (<Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela)} ><Glyphicon glyph="time" /></Button>) : 
        (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela)} ><Glyphicon glyph="ok" /></Button>)
      }
    </td>
  </tr>

