import * as React from 'react';
import {LabVm} from '../../types/LabVm';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


interface VmRowProps {
  prefix: string;
  onRemove: () => void;
  vm: LabVm;
}

export function VmRow(props: VmRowProps) {
  return (
    <Container>
      <Row>
        <Col md={4}>{(props.vm.id)}</Col>
        <Col md={6}>{props.vm.name}</Col>
        <Col md={2}><Button key={props.vm.id}><FontAwesomeIcon icon='trash-alt'/></Button></Col>
      </Row>
    </Container>
  );
}
