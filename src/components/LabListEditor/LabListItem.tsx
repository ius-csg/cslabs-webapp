import React from 'react';
import {Col, ListGroup} from 'react-bootstrap';
import {Lab} from '../../types/Lab';

interface Props {
  lab: Lab;
}

export function LabListItem({lab}: Props){
    return (
      <>
        <Col>{lab.name}</Col>
        <Col><link href={'#'}>Edit</link></Col>
        <Col>Placeholder For Trashcan</Col>
      </>
    );
}
