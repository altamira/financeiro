import React, { Component } from 'react';

import { 
  Modal,
  Button
} from 'react-bootstrap';

export default class PrintPreview extends Component {
  render() {

    return(
        <Modal.Dialog
          
        >
          <Modal.Header>
            <Modal.Title>Imprimir Título</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {/*<iframe className="preview-pane" type="application/pdf" width="100%" height="100%" frameBorder="0" src={this.props.src}></iframe>*/}
              <embed width="100%" height="500px" name="plugin" id="plugin" src={this.props.src} type="application/pdf" />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose} >Fechar</Button>
          </Modal.Footer>

        </Modal.Dialog>
    );
  }
}