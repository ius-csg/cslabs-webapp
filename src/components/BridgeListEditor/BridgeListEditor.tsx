import React from 'react';
import {FieldArray} from 'formik';
import {Col, Row} from 'react-bootstrap';
import {BridgeListItem} from './BridgeListItem';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {BridgeTemplate} from '../../types/editorTypes';
import {makeBridgeTemplate} from '../../factories';


interface Props {
  bridgeTemplates: BridgeTemplate[];
  prefix: string;
  editing: boolean;
}

export function BridgeListEditor({bridgeTemplates, prefix, editing}: Props) {

  return (
    <FieldArray
      name={prefix}
      render={helpers =>
        <>
          <Row>
            <Col>Bridges</Col>
            <Col className='d-flex justify-content-end align-items-center'>
              <IconButton
                icon={faPlusCircle}
                size={'2x'}
                color={'black'}
                onClick={() => {
                  console.log(prefix, helpers, makeBridgeTemplate());
                  helpers.push(makeBridgeTemplate());
                }}
              />
            </Col>
          </Row>
          {bridgeTemplates.map((bridgeTemplate,index) =>
            <BridgeListItem
              prefix={`${prefix}.${index}`}
              key={index}
              bridgeTemplate={bridgeTemplate}
              editing={editing}
              onDelete={() => helpers.remove(index)}
            />
            )}
        </>
      }
    />
  );
}
