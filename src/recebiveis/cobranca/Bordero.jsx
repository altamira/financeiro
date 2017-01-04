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
} from 'react-bootstrap';

import { Tabs, Tab } from 'react-bootstrap';

export default class Bordero extends Component {

  render() {

    let { carteira, bordero } = this.props;

    return(
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th style={{textAlign: 'right'}}>DESCONTOS</th>
            <th style={{textAlign: 'right'}}>VALORES APROX.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{textAlign: 'right'}}>Quantidade de Títulos</td>
            <td style={{textAlign: 'right'}}>{bordero.numero_parcelas}</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}>Total de dias</td>
            <td style={{textAlign: 'right'}}>{bordero.total_dias} dia(s)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}><b>Valor Total dos Título</b></td>
            <td style={{textAlign: 'right'}}><b>R$ {Number(bordero.valor_titulos.toFixed(2)).toLocaleString()}</b> (+)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}><b>Taxa Juros</b></td>
            <td style={{textAlign: 'right'}}><b>{Number((carteira.taxa_juros).toFixed(2)).toLocaleString()}%</b></td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}><b>Valor Juros</b></td>
            <td style={{textAlign: 'right'}}><b>R$ {Number(bordero.valor_juros.toFixed(2)).toLocaleString()}</b> (-)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}>Base de Cálculo IOF</td>
            <td style={{textAlign: 'right'}}>R$ {Number(bordero.valor_base.toFixed(2)).toLocaleString()} (=)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}>IOF Adicional (0,38%)</td>
            <td style={{textAlign: 'right'}}>R$ {Number(bordero.valor_iof_adicional.toFixed(2)).toLocaleString()} (-)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}>Total de IOF Diário<div style={{fontSize: '0.7em'}}>(0,0041% x valor da parcela x dia(s) do vencto)</div></td>
            <td style={{textAlign: 'right'}}>R$ {Number(bordero.valor_iof_diario.toFixed(2)).toLocaleString()} (-)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right'}}>Valor de Tarifa da Operação/Contratação</td>
            <td style={{textAlign: 'right'}}>R$ {Number(bordero.valor_operacao.toFixed(2)).toLocaleString()} (-)</td>
          </tr>
          {bordero.valor_tarifa > 0 ?
            <tr>
              <td style={{textAlign: 'right'}}>Valor de Tarifa dos Títulos (R$ {Number((carteira.valor_tarifa).toFixed(2)).toLocaleString()} por título)</td>
              <td style={{textAlign: 'right'}}>R$ {Number((bordero.valor_tarifa).toFixed(2)).toLocaleString()} (-)</td>
            </tr>
          : null }
          <tr>
            <td style={{textAlign: 'right', fontSize: '1.5em', color: bordero.valor_liquido < 0 ? 'red' : 'blue'}}><b>VALOR LÍQUIDO</b></td>
            <td style={{textAlign: 'right', fontSize: '1.5em', color: bordero.valor_liquido < 0 ? 'red' : 'blue'}}><b>R$ {Number((bordero.valor_liquido).toFixed(2)).toLocaleString()}</b> (=)</td>
          </tr>
          <tr>
            <td style={{textAlign: 'right', fontSize: '1.2em'}}><b>Custo Efetivo Total (CET)</b></td>
            <td style={{textAlign: 'right', fontSize: '1.2em'}}><b>R$ {Number((bordero.valor_cet).toFixed(2)).toLocaleString()} ({Number((bordero.cet).toFixed(2)).toLocaleString()}%)</b></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}