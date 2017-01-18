
import React, { Component } from 'react';

import {
  OverlayTrigger, 
  Button, 
  Glyphicon, 
  Panel,  
  Col, 
  Row, 
  FormGroup,
  FormControl,
  Tooltip
} from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import DatePicker from 'react-bootstrap-date-picker';

import axios from 'axios';

import Error from './../../Error';

import Buscar from './Buscar';

import process from './process.svg';

export default class Emissao extends Component {
  constructor(props) {
    super(props);

    this.state = { 

      // campos de controle, não armazenar
      topics: {},
      dialog: null,

    }

    this.handleClose = this.handleClose.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.handleCloseDialog = this.handleCloseDialog.bind(this);

  }

  componentWillMount() {
    axios
      .get('http://localhost:1880/api/tarefa/' + this.props.id)
      .then( (response) => {
        if (response.data instanceof Array) {
          this.setState(JSON.parse(response.data.params));
        }
      })
      .catch( error => {
        alert('Erro ao obter a lista de tarefas.');
      })
  }

  handleCloseDialog() {
    this.setState({dialog: null});
  }

  handleClose() {
    browserHistory.push('/');
  }

  handleSearch(data) {
    this.setState({dialog: <Buscar onClose={this.handleCloseDialog} onSelect={this.handleSelect} />})
  }

  handleSelect(item) {
    alert('Item selecionado:\n' + JSON.stringify(item, null, 2));
  }

  handleChange(value) {
    // value is an ISO String. 
    if (this.state[value.target.id] !== value.target.value) {
      this.setState({
        [value.target.id]: value.target.value,
        persist: true
      });
    }
  }

  render() {

    return (

      <div>

        <Panel header={'Emissão de Duplicadas (Avulsa)'} bsStyle="primary" >

          <Row style={{borderBottom: 'solid', borderBottomWidth: 1, borderBottomColor: '#337ab7', paddingBottom: 20}}>
            <Col xs={4} md={3} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Emitir Duplicatas</Tooltip>)}
              >
                  <Button
                    onClick={this.handleSubmit}
                    style={{width: 140}}
                  >
                    <Glyphicon glyph="usd" />
                    <div><span>Emitir duplicatas</span></div>
                  </Button>
              </OverlayTrigger>

            </Col>
            {/*<Col xs={4} md={2} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Salvar as Alterações</Tooltip>)}
              >

                  <Button
                    onClick={this.handleSave}
                    style={{width: 100}}
                  >
                    <Glyphicon glyph="floppy-disk" />
                    <div><span>Gravar</span></div>
                  </Button>

              </OverlayTrigger>

            </Col>*/}
            <Col xs={4} md={2} >

              <OverlayTrigger 
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

              </OverlayTrigger>

            </Col>
            <Col xs={4} md={2} >

              <OverlayTrigger 
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

              </OverlayTrigger>

            </Col>
            <Col xs={4} md={2} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Buscar</Tooltip>)}
              >

                <Button
                  onClick={this.handleSearch}
                  style={{width: 100}}
                >
                  <Glyphicon glyph="search" />
                  <div><span>Buscar</span></div>
                </Button>

              </OverlayTrigger>

            </Col>
            <Col xs={4} md={2} >

              <OverlayTrigger 
                placement="top" 
                overlay={(<Tooltip id="tooltip">Fechar sem emitir as duplicatas</Tooltip>)}
              >
                  <Button
                    disabled={this.state.hasChanges}
                    onClick={this.handleClose}
                    style={{width: 100}}
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
                  <Row>
                    <Col xs={12} md={2}>CNPJ/CPF</Col>
                    <Col xs={12} md={3}>
                      <FormGroup controlId="cnpj" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="cnpj" value={this.state.cnpj} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={0} md={3} />
                    <Col xs={12} md={2}>Emissão</Col>
                    <Col xs={12} md={2}>
                      <FormGroup controlId="emissao" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        {/*<FormControl type="text" defaultValue="10/10/2016" />*/}
                        {/*<FormControl.Feedback />*/}
                        <DatePicker ref="emissao" value={this.state.emissao} onChange={this.handleEmissaoChange} />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={2}>Razão Social</Col>
                    <Col xs={12} md={10}>
                      <FormGroup controlId="nome" validationState="success">
                        {/*<ControlLabel>Input with success and feedback icon</ControlLabel>*/}
                        <FormControl type="text" ref="nome" value={this.state.nome} onChange={this.handleChange} />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey={2} title="Procedimento">
                <img alt="Procedimento" src={process} style={{width: '100%', height: '100%'}} />
              </Tab>
            </Tabs>
          </Row>
        </Panel>

        {this.state.dialog}

      </div>

    );
  }
}
