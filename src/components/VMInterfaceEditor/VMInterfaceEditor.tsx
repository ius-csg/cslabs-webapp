import React from 'react';
import {FieldArray} from 'formik';
import {Col, Row} from 'react-bootstrap';
import {VMInterfaceItem} from './VMInterfaceItem';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {range} from '../util/Util';
import {BridgeTemplate, VmInterfaceTemplate} from '../../types/editorTypes';
import {makeVmInterfaceTemplate} from '../../factories';


interface Props {
  bridgeTemplates: BridgeTemplate[];
  vmInterfaceTemplates: VmInterfaceTemplate[];
  prefix: string;
}

export function VMInterfaceEditor({vmInterfaceTemplates, prefix, bridgeTemplates}: Props) {
  const interfaceNumbers = vmInterfaceTemplates.map(i => i.interfaceNumber);
  const interfaceOptions = range(0, 10).map((value => ({value: value, label: String(value)}))).filter(o => interfaceNumbers.includes(o.value));
  return (
    <FieldArray
      name={prefix}
      render={helpers =>
        <>
          <Row>
            <Col>Interfaces</Col>
          </Row>
          <Row>
            <Col>Interface</Col>
            <Col>Bridge</Col>
            <Col className='d-flex justify-content-end align-items-center'>
              <IconButton
                icon={faPlusCircle}
                size={'2x'}
                color={'black'}
                onClick={() => {
                  helpers.push(makeVmInterfaceTemplate(Math.max(...interfaceNumbers)+1));
                }}
              />
            </Col>
          </Row>
          {vmInterfaceTemplates.map((vmInterfaceTemplate,index) =>
            <VMInterfaceItem
              prefix={`${prefix}.${index}`}
              key={index}
              bridgeTemplates={bridgeTemplates}
              vmInterfaceTemplate={vmInterfaceTemplate}
              interfaceOptions={interfaceOptions}
              onDelete={() => helpers.remove(index)}
            />
            )}
        </>
      }
    />
  );
}
