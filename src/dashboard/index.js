
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

import axios from 'axios';

export default class Cobranca extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contas: [],
    }

    // comandos
    this.handleClose = this.handleClose.bind(this);

  }

  componentWillMount() {
    axios
      .get('http://sistema/api/financeiro/carteira/')
      .then( (response) => {
        this.setState(
          {
            contas:response.data
          }, 
          this.loadTarefas(this.props.params.id || 0)
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })         
  }

  handleClose() {
    browserHistory.push('/');
  }

  render() {

    return (

      <div>

        <Panel header={'Envio de Cobrança - Pedido ' + (this.state.numero)} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Tarefa concluída</Tooltip>)}
              >
                  <Button
                    disabled={!(this.state.parcelas.find( p => !p.carteira && p.selected) && this.state.conta !== null)}
                    onClick={this.handleComplete}
                    style={{width: 200}}
                    bsStyle="success"
                  >
                    <Glyphicon glyph="ok" />
                    <div><span>Enviar Cobrança</span></div>
                  </Button>
              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Apenas gravar as alterações</Tooltip>)}
              >

                  <Button
                    onClick={this.handleSave}
                    style={{width: 100}}
                  >
                    <Glyphicon glyph="floppy-disk" />
                    <div><span>Gravar</span></div>
                  </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Calcular Datas das Parcelas</Tooltip>)}
              >

                <Button
                  onClick={this.handleCalc}
                  style={{width: 100}}
                >
                  <Glyphicon glyph="calendar" />
                  <div><span>Calcular</span></div>
                </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={2} >

              {/*<OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Imprimir Espelho desta Duplicata</Tooltip>)}
              >

                <Button
                  disabled={this.state.hasChanges}
                  onClick={this.handlePrint}
                  style={{width: 100}}
                >
                  <Glyphicon glyph="print" />
                  <div><span>Imprimir</span></div>
                </Button>

              </OverlayTrigger>*/}

            </Col>
            <Col xs={4} md={4} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Fechar</Tooltip>)}
              >
                  <Button
                    onClick={this.handleClose}
                    style={{width: 120}}
                  >
                    <Glyphicon glyph="time" />
                    <div><span>Fechar</span></div>
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
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th>CARTEIRA</th>
                            <th style={{textAlign: 'right'}}>LIMITE</th>
                            <th style={{textAlign: 'right'}}>UTILIZADO</th>
                            <th style={{textAlign: 'right'}}>SALDO</th>
                            <th style={{textAlign: 'right'}}>DEFASAGEM</th>
                            <th style={{textAlign: 'right'}}>ENVIAR</th>
                            <th style={{width: '1%'}}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.contas.map( (conta, index) => {
                            return (
                              <tr key={'tr-contas-' + index} style={{background: this.state.conta && this.state.conta.id === conta.id ? 'gold' : ''}} >
                                <td style={{textAlign: 'left'}}>{conta.nome}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(conta.limite).toLocaleString()}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(conta.utilizado).toLocaleString()}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(conta.saldo).toLocaleString()}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(conta.defasagem).toLocaleString()}</td>
                                <td style={{textAlign: 'right'}}>R$ {Number(conta.descoberto).toLocaleString()}</td>
                                <td><Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleSelectConta.bind(null, conta, index)} ><Glyphicon glyph="ok" /></Button></td>
                              </tr>                              
                            )
                          }
                            
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                </div>
              </Tab>
            </Tabs>
          </Row>
        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
