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
      render={helpers => {
        if(bridgeTemplates.filter(t => t.isCoreBridge).length === 0 && editing) {
          helpers.push(makeBridgeTemplate('Core Bridge', true));
        }
        return (
          <div style={{marginBottom: '1rem'}}>
            <Row>
              <Col><h5>Bridges</h5></Col>
              <Col className='d-flex justify-content-end align-items-center'>
                { editing &&
                <IconButton
                  icon={faPlusCircle}
                  size={'2x'}
                  color={'black'}
                  onClick={() => {
                    helpers.push(makeBridgeTemplate());
                  }}
                />}
              </Col>
            </Row>
            {bridgeTemplates.length === 0 && (
              <Row>
                <Col><p>No Bridges Added</p></Col>
              </Row>
            )}
            {bridgeTemplates.map((bridgeTemplate,index) =>
              <BridgeListItem
                prefix={`${prefix}.${index}`}
                key={index}
                bridgeTemplate={bridgeTemplate}
                editing={editing}
                onDelete={() => helpers.remove(index)}
              />
            )}
          </div>
        );
      }}
    />
  );
}
