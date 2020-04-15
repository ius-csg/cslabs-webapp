import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {BridgeTemplate} from '../../types/editorTypes';
import Input from '../util/Input/Input';
import {propertyOf} from '../../util';

interface Props {
  bridgeTemplate: BridgeTemplate;
  prefix: string;
  onDelete: () => void;
  editing: boolean;
}

export function BridgeListItem({prefix, bridgeTemplate, onDelete, editing}: Props){
  return (
    <Row className='border-top' style={{marginTop: 8}} >
      <Col style={{marginTop: 8}}>
        <Input name={`${prefix}.${propertyOf<BridgeTemplate>('name')}`} disabled={!editing}/> </Col>
      <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
        <IconButton
          icon={faTrashAlt}
          size={'1x'}
          color={bridgeTemplate.isCoreBridge ? 'black' : 'red'}
          onClick={bridgeTemplate.isCoreBridge ? undefined : onDelete}
        />
      </Col>
    </Row>
  );
}
