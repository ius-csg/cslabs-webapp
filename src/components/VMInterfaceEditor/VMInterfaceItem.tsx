import React from 'react';
import {Col, DropdownButton, Row} from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {VmInterfaceTemplate} from '../../types/editorTypes';


interface Props {
  vmInterfaceTemplate: VmInterfaceTemplate;
  prefix: string;
}

interface State {
  CurrentInterface: string;
  CurrentBridge: string;
}

export function VMInterfaceItem({prefix, vmInterfaceTemplate}: Props){
//   const name = `${prefix}.${propertyOf<Lab>('name')}`;
  return (
    <Row className='border-top' style={{marginTop: 8}} >
      <Col style={{marginTop: 8}}>
        <DropdownButton
          id='interface-dropdown-list-button'
          title={`$CurrentInterface`}
        >
         <DropdownButton.Item as='button'>Placeholder</DropdownButton.Item>
          // insert interfaces in dropdown
        </DropdownButton>
      </Col>
      <Col style={{marginTop: 8}}>
        <DropdownButton
          id='interface-dropdown-list-button'
          title={`$CurrentBridge`}
        >
          <DropdownButton.Item as='button'>Placeholder</DropdownButton.Item>
          // insert bridges in dropdown
        </DropdownButton>
      </Col>
      <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
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
