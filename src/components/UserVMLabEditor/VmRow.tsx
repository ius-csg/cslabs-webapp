import * as React from 'react';
import {LabVm} from '../../types/LabVm';
import {Col, Row} from 'react-bootstrap';
import {ListRow} from '../util/ListRow/ListRow';
import {IconButton} from '../util/IconButton/IconButton';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Input from '../util/Input/Input';
import {LabVmForm} from '../../types/editorTypes';


interface VmRowProps {
  prefix: string;
  onRemove: () => void;
  vm: LabVmForm;
  editable: boolean;
}

export function VmRow({vm, prefix, editable, onRemove}: VmRowProps) {
  const getFieldName = (name: keyof LabVm) => `${prefix}.${name}`;
  return (
    <ListRow>
      <Col>
        <Row>
          <Col md={4} className='d-flex justify-content-start'>
            <Input name={getFieldName('name')} disabled={!editable} />
          </Col>
          <Col md={3} className='d-flex justify-content-start'/>
          <Col md={3} className='d-flex justify-content-start'/>
          <Col md={2} className='d-flex justify-content-end'>
            {editable &&
              <IconButton
                icon={faTrashAlt}
                size={'1x'}
                onClick={onRemove}
                color={'red'}
              />
            }
          </Col>
        </Row>
        <Row>
          {/* Add interfaces here*/}
        </Row>
      </Col>
    </ListRow>
  );
}
