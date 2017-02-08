import React from 'react';

import {
  Modal,
  Button
} from 'react-bootstrap';

const Confirm = (props) => (

  <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          {props.children}

        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle={'danger'} onClick={props.onNo} >Não</Button>
          <Button bsStyle={'success'} onClick={props.onYes} >Sim</Button>
        </Modal.Footer>

      </Modal.Dialog>
  </div>

)

export default Confirm