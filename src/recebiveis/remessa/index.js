import { omit } from 'lodash';
import format from 'number-format.js';

import api from './../../api/'

import React, { Component } from 'react';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  Table,
  Tooltip,
  Tabs, 
  Tab,
  Image
} from 'react-bootstrap';

import Form from './Titulo';
import Bordero from '../cobranca/Bordero.jsx';

import process from './process.svg';

export default class Remessa extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // comandos
    this.handleClose = this.handleClose.bind(this);
    this.handleComplete = this.handleComplete.bind(this);

    // edição do formulario
    this.handleChange = this.handleChange.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);

    this.setTarefa = this.setTarefa.bind(this);
    this.setCarteiras = this.setCarteiras.bind(this);

  }

  componentWillMount() {
    api.tarefa.get(this.props.params.id, this.setTarefa); 
    //api.carteira.list(this.setCarteiras);        
  }

  componentWillReceiveProps(props) {
    api.tarefa.get(props.params.id, this.setTarefa);
  }

  setTarefa(tarefa) {
    console.log(JSON.stringify(tarefa, null, 2))

    this.setState({
      tarefa: omit(tarefa, 'documento'), 
      data: tarefa.documento.data,
      carteira: tarefa.documento.carteira,
      remessa: tarefa.documento.remessa,
      bordero: tarefa.documento.bordero
    })

  }

  setCarteiras(carteiras) {
    this.setState({carteiras: carteiras});
  }

  handleComplete() {
    let state = {
      ...this.state.tarefa, 
      documento: { 
        carteira: this.state.carteira, 
        remessa: this.state.remessa,
        bordero: this.state.bordero,
      }
    }

    console.log(JSON.stringify(state, null, 2));

    api.remessa.concluir(state, this.handleClose.bind(this))
  }

  handleClose() {
    this.props.router.push('/');
  }

  handleSelect(remessa) {
    this.setState({dialog: <Form {...remessa} onClose={this.handleCloseDialog.bind(this)} onSave={this.handleSelectSave.bind(this)} />})
  }

  handleSelectSave(remessa) {
    this.setState({
      dialog: undefined,
      remessa: this.state.remessa.map( (r, i) => {
        
        if (remessa.remessa_index === i) {
          r.cliente = remessa.cliente;
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

  render() {

    let { carteira, remessa, bordero } = this.state || {};

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
                    disabled={remessa && !!remessa.find( r => r.parcelas.find( p => !p.selected))}
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
                        {carteira ? 
                        <tbody>
                            <tr>
                              <td style={{textAlign: 'left'}}><h2><b>{carteira.nome}</b></h2></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.limite)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.utilizado)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.saldo)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.defasagem)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.descoberto)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.remessa)}</b></td>
                              <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.retorno)}</b></td>
                            </tr>                              
                        </tbody>
                        : null }
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

                          {remessa && remessa.map( (r, index) => <Pagador key={'titulo-' + r.nosso_numero} {...r} index={index} handleSelect={this.handleSelect} handleUnselect={this.handleUnselect} /> )}
                        
                      </Table>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={0} md={6}></Col>
                    <Col xs={12} md={6}>
                    {carteira && bordero ?
                      <Bordero carteira={carteira} bordero={bordero} />
                    : null}
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

const Pagador = (remessa) =>
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
    <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', parcela.valor)}</b></td>
    <td>
      {!parcela.selected ? 
        (<Button bsStyle="primary" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={parcela.handleSelect.bind(null, parcela)} ><Glyphicon glyph="time" /></Button>) : 
        (<Button bsStyle="success" style={{width: '33px'}} bsSize="small" onClick={parcela.handleUnselect.bind(null, parcela)} ><Glyphicon glyph="ok" /></Button>)
      }
    </td>
  </tr>

