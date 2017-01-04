
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

      carteiras: [],

      remessa: [],

      retorno: []
    }

  }

  componentWillMount() {
    axios
      .get('http://financeiro:1880/api/financeiro/carteira/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            carteiras: response.data.map( c => 
            {
              c.remessa_total = c.remessa;
              return c;
            })
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })

    axios
      .get('http://financeiro:1880/api/financeiro/remessa/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            remessa: response.data
          }
        );
      })
      .catch( error => {
        alert('Erro ao obter as carteiras.\nErro: ' + error.message);
      })       
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
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.limite.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.utilizado.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.saldo.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.defasagem.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.descoberto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.remessa_total || 0).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.retorno).toLocaleString()}</b></td>
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
            <h2>Remessas de Cobrança em Aberto (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Data da Remessa</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Data da Crédito</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.remessa.map( (remessa, index) => {
                  return (
                    <tr key={'tr-remessa-' + index} >
                      <td style={{textAlign: 'right'}}><b>{remessa.data}</b></td>
                      <td style={{textAlign: 'left'}}><b>{remessa.carteira.nome}</b></td>
                      <td style={{textAlign: 'right'}}><b>{remessa.data_credito}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_bruto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_operacao.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_tarifa.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_juros.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_iof.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.taxa_juros.toFixed(2)).toLocaleString()}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(remessa.valor_liquido.toFixed(2)).toLocaleString()}</b></td>
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
            <h2>Últimos Retornos de Cobrança (Borderô)</h2>
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Data da Remessa</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Carteira</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Data da Crédito</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor dos Títulos (Bruto)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Tarifa Operação (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Tarifa dos Títulos (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor IOF (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Taxa de Juros (-)</th>
                  <th style={{borderBottom: '2px solid black', borderTop: '2px solid black', textAlign: 'right'}}>Valor do Crédito (Liquido)</th>
                </tr>
              </thead>
              <tbody>

                {this.state.retorno.map( (retorno, index) => {
                  return (
                    <tr key={'tr-retorno-' + index} >
                      <td style={{textAlign: 'right'}}><b>{retorno.data}</b></td>
                      <td style={{textAlign: 'left'}}><b>{retorno.carteira.nome}</b></td>
                      <td style={{textAlign: 'right'}}><b>{retorno.data_credito}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_bruto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_operacao.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_tarifa.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_juros.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_iof.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.taxa_juros.toFixed(2)).toLocaleString()}%</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(retorno.valor_liquido.toFixed(2)).toLocaleString()}</b></td>
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
