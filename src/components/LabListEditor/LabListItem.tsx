import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Lab} from '../../types/Lab';
import {Link} from 'react-router-dom';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';

interface Props {
  lab: Lab;
  prefix: string;
}

export function LabListItem({prefix,lab}: Props){
//   const name = `${prefix}.${propertyOf<Lab>('name')}`;
    return (
      <Row>
        <Col>
          {lab.name} - <Link to={'#'}>Edit</Link></Col>
        <Col className='d-flex justify-content-end'>
          <IconButton
            icon={faTrashAlt}
            size={'2x'}
            link={'#'}
            color={'black'}
          />
        </Col>
      </Row>
    );
}
