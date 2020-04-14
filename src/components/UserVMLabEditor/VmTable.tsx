import * as React from 'react';
import {FieldArray} from 'formik';
import {VmRow} from './VmRow';
import {LabVmForm} from '../../types/editorTypes';
import {Col, Row} from 'react-bootstrap';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {makeLabVmForm} from '../../factories';


interface Props {
  prefix: string;
  vms: LabVmForm[];
  editable: boolean;
}

export function VmTable(props: Props) {
  const {editable} = props;
  return (
    <FieldArray
      name={props.prefix}
      render={helpers =>
        <>
          <Row style={{marginBottom: '1rem'}}>
            <Col>Virtual Machines</Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {editable &&
              <IconButton
                icon={faPlusCircle}
                size={'2x'}
                onClick={() => helpers.push(makeLabVmForm())}
                color={'black'}
              />
              }
            </Col>
          </Row>
          {props.vms.map((vm: LabVmForm, i) =>
            <VmRow key={i} prefix={`${props.prefix}.${i}`} onRemove={() => helpers.remove(i)} vm={vm} editable={props.editable}/>)}
        </>
      }
    />
  );
}
