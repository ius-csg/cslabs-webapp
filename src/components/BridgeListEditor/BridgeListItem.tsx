import React from 'react';
import {Col} from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {BridgeTemplate} from '../../types/editorTypes';
import Input from '../util/Input/Input';
import {propertyOf} from '../../util';
import { ListRow } from 'components/util/ListRow/ListRow';

interface Props {
  bridgeTemplate: BridgeTemplate;
  prefix: string;
  onDelete: () => void;
  editing: boolean;
}

export function BridgeListItem({prefix, bridgeTemplate, onDelete, editing}: Props){
  return (
    <ListRow>
      <Col>
        <Input name={`${prefix}.${propertyOf<BridgeTemplate>('name')}`} disabled={!editing}/> </Col>
      <Col className='d-flex justify-content-end'>
        <IconButton
          icon={faTrashAlt}
          size={'1x'}
          hideIcon={!editing}
          color={bridgeTemplate.isCoreBridge ? 'black' : 'red'}
          onClick={bridgeTemplate.isCoreBridge ? undefined : onDelete}
        />
      </Col>
    </ListRow>
  );
}
