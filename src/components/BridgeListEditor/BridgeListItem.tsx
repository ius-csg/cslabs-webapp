import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {BridgeTemplate} from '../../types/editorTypes';

interface Props {
  bridgeTemplate: BridgeTemplate;
  prefix: string;
}

export function BridgeListItem({prefix, bridgeTemplate}: Props){
  return (
    <Row className='border-top' style={{marginTop: 8}} >
      <Col style={{marginTop: 8}}>
        {bridgeTemplate.name} - <Link to={'#'}>Edit</Link></Col>
      <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
        // check the portion of the prefix containing the index
        if(prefix[1] != '0'){
          <IconButton
            icon={faTrashAlt}
            size={'2x'}
            link={'#'}
            color={'black'}
          />
        }
      </Col>
    </Row>
  );
}
