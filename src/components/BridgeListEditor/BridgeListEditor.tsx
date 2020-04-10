import React from 'react';
import {FieldArray} from 'formik';
import {Col, Row} from 'react-bootstrap';
import {BridgeListItem} from './BridgeListItem';
import {Lab} from '../../types/Lab';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';


interface Props {
  labs: Lab[];
  prefix: string;
}

export function BridgeListEditor({labs, prefix}: Props) {
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
                link={'#'}
                color={'black'}
              />
            </Col>
          </Row>
          {labs.map((lab,index) => <BridgeListItem prefix={`${prefix}.${index}`} key={index} lab={lab}/>)}
        </>
      }
    />
  );
}
