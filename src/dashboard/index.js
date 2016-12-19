
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
    }

  }

  componentWillMount() {
    axios
      .get('http://financeiro:1880/api/financeiro/carteira/')
      .then( (response) => {
        console.log(JSON.stringify(response.data, null, 2))
        this.setState(
          {
            carteiras: response.data
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
            <Table striped bordered condensed hover style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th>Carteira</th>
                  <th style={{textAlign: 'right'}}>Limite</th>
                  <th style={{textAlign: 'right'}}>Utilizado</th>
                  <th style={{textAlign: 'right'}}>Saldo</th>
                  <th style={{textAlign: 'right'}}>Defasagem</th>
                  <th style={{textAlign: 'right'}}>Enviar</th>
                  <th style={{textAlign: 'right'}}>Remessa</th>
                  <th style={{textAlign: 'right'}}>Retorno</th>
                  <th style={{width: '1%'}}></th>
                </tr>
              </thead>
              <tbody>
                {this.state.carteiras.map( (carteira, index) => {
                  return (
                    <tr key={'tr-carteiras-' + index} style={{background: this.state.carteira && this.state.carteira.id === carteira.id ? 'gold' : ''}} >
                      <td style={{textAlign: 'left'}}><b>{carteira.nome}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.limite.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.utilizado.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.saldo.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.defasagem.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.descoberto.toFixed(2)).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.remessa_total || 0).toLocaleString()}</b></td>
                      <td style={{textAlign: 'right'}}><b>{Number(carteira.retorno).toLocaleString()}</b></td>
                      <td><Button bsStyle="success" style={{width: '33px', marginRight: '4px'}} bsSize="small" onClick={this.handleSelectCarteira.bind(null, carteira, index)} ><Glyphicon glyph="ok" /></Button></td>
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
