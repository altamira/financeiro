
import React, { Component } from 'react';

import {
  Col, 
  Row, 
  Table,
} from 'react-bootstrap';

import api from './../api';
import format from 'number-format.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

      carteiras: [],

      remessas: [],

      retornos: []
    }

    this.setCarteiras = this.setCarteiras.bind(this);
    this.setRemessas = this.setRemessas.bind(this);
    this.setRetornos = this.setRetornos.bind(this);
  }

  componentWillMount() {
    api.carteira.list(this.setCarteiras);
    api.remessa.list(this.setRemessas);
    api.retorno.list(this.setRetornos);     
  }

  setCarteiras(carteiras) {
    this.setState({carteiras: carteiras});
  }

  setRemessas(remessas) {
    this.setState({remessas: remessas});
  }

  setRetornos(retornos) {
    this.setState({retornos: retornos});
  }

  render() {

    return (

      <div>
        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Resumo Cobrança</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Carteira</th>
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
                {this.state.carteiras.map( (carteira, index) => {
                  return (
                    <tr key={'tr-carteiras-' + index} >
                      <td style={{textAlign: 'left'}}><b>{carteira.nome}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.limite)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.utilizado)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.saldo)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.defasagem)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.descoberto)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.remessa)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', carteira.retorno)}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Remessas de Cobrança em Aberto (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Data</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.remessas.map( (remessa, index) => {
                  return (
                    <tr key={'tr-remessa-' + index} >
                      <td style={{textAlign: 'right'}}><b>{new Date(remessa.data).toLocaleDateString()}</b></td>
                      <td style={{textAlign: 'left'}}><b>{(remessa.carteira && remessa.carteira.nome) || ''}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_titulos)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_operacao)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_tarifa)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_juros)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_iof)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('##0,00', remessa.taxa_juros)}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', remessa.valor_liquido)}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} md={12}>
            <h2 style={{color: 'gray'}} >Últimos Retornos de Cobrança (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Data</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', backgroundColor: 'lightgray', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.retornos.map( (retorno, index) => {
                  return (
                    <tr key={'tr-retorno-' + index} >
                      <td style={{textAlign: 'right'}}><b>{new Date(retorno.data).toLocaleDateString()}</b></td>
                      <td style={{textAlign: 'left'}}><b>{(retorno.carteira && retorno.carteira.nome) || ''}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_titulos)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_operacao)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_tarifa)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_juros)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_iof)}</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('##0,00', retorno.taxa_juros)}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{format('R$ ###.###.##0,00', retorno.valor_liquido)}</b></td>
                    </tr>                              
                  )
                }
                  
                )}
              </tbody>
            </Table>
          </Col>

        </Row>
      </div>

    );
  }
}
