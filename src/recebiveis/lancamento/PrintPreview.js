import jsPDF from 'jspdf';
import format from 'number-format.js';

import api from './../../api/'

import React, { Component } from 'react';

import { 
  Modal,
  Button
} from 'react-bootstrap';

export default class PrintPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handlePrint = this.handlePrint.bind(this);
  }

  componentWillMount() {
    api.lancamento.get(this.props.nosso_numero, this.handlePrint)
  }

  componentWillReceiveProps(props) {
    api.lancamento.get(props.nosso_numero, this.handlePrint)
  }

  handlePrint(data) {
    let titulo = {
      ...data,
      emissao: new Date(data.emissao).fromUTC().toISOString(),
      entrega: new Date(data.entrega).fromUTC().toISOString(),
      parcelas: data.parcelas.map( (parcela) => {
        let vencto = new Date(parcela.vencto).fromUTC();

        parcela.vencto = vencto.toISOString();

        return parcela;

      })
    }

    let doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFont('Arial');

    let self = this;

    titulo.parcelas.forEach(function(parcela, index) {
  
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
      doc.text(90, margin_top + 35, this.pedido.toString());
      doc.text(120, margin_top + 35, format('R$ ###.###.##0,00', parcela.valor));

      doc.setFontSize(16);
      doc.text(160, margin_top + 26, 'Vencimento');

      let vencto = new Date(parcela.vencto);
      //vencto.setTime(vencto.getTime() + (vencto.getTimezoneOffset() * 60 * 1000));
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
      doc.text(60, margin_top + 87, this.cliente.uf);
      doc.text(60, margin_top + 94, this.cliente.cep);
      doc.text(60, margin_top + 101, '(' + this.cliente.ddd + ') ' + this.cliente.telefone.trim());
      doc.text(60, margin_top + 108, this.cliente.contato.trim());
      doc.text(60, margin_top + 115, this.representante.codigo + ' ' + this.representante.nome.trim());
      doc.text(60, margin_top + 122, parcela.prazo.toString() + ' ' + parcela.tipo_vencto + ' - ' + parcela.forma_pagto + ' ' + parcela.origem);

    }.bind(titulo))
    
    self.setState({src: doc.output('bloburi')})
  }

  render() {

    return(
        <Modal.Dialog
          
        >
          <Modal.Header>
            <Modal.Title>Imprimir Título</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {/*<iframe className="preview-pane" type="application/pdf" width="100%" height="100%" frameBorder="0" src={this.props.src}></iframe>*/}
              {this.state.src ? 
                <embed width="100%" height="500px" name="plugin" id="plugin" src={this.state.src} type="application/pdf" /> : null
              }
              
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Fechar</Button>
          </Modal.Footer>

        </Modal.Dialog>
    );
  }
}