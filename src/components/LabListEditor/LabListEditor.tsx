import React from 'react';
import {FieldArray} from 'formik';
import {Button, Col, ListGroup, Row} from 'react-bootstrap';
import {ModuleForm} from '../../types/editorTypes';
import {LabListItem} from './LabListItem';
import {Lab} from '../../types/Lab';

interface Props {
  labs: Lab[];
  prefix: string;
}

export function LabListEditor(props: Props) {
  return (
    <FieldArray
      name={props.prefix}
      render={helpers =>
        <>
          <Row>
            <Col>Labs</Col>
            <Col className='d-flex justify-content-end align-items-center'>Add</Col>
          </Row>
          {props.labs.map(lab => <LabListItem/>)}
        </>}
  );
}
