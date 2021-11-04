import React from 'react';
import {Modal} from 'react-bootstrap';

interface PopupProps {
  id: string;
  title: string;
  description?: string;
  leftButton?: any;
  rightButton: any;
  size: 'sm' | 'lg' | 'xl';
  display: boolean;
  closeButton?: boolean;
}

export default function Popup(props: PopupProps) {
  return (
    <Modal
      size={props.size}
      aria-labelledby={props.id}
      centered={true}
      show={props.display}
      backdrop={'static'}
    >
      <Modal.Header closeButton={props.closeButton}>
        <Modal.Title id={props.id}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.description}
        </p>
      </Modal.Body>
      {props.leftButton && 
        <Modal.Footer>
          {props.leftButton}
        </Modal.Footer>}
      <Modal.Footer>
        {props.rightButton}
      </Modal.Footer>
    </Modal>
  );
}