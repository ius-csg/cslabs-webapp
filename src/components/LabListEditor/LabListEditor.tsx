import React from 'react';
import {FieldArray} from 'formik';
import {Col, Row} from 'react-bootstrap';
import {LabListItem} from './LabListItem';
import {Lab} from '../../types/Lab';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {RoutePaths} from '../../router/RoutePaths';


interface Props {
  labs: Lab[];
  prefix: string;
  moduleId: number;
}
function getNewLabEditorLink(moduleId: number) {
  return RoutePaths.EditLab.replace(':moduleId', String(moduleId));
}

export function LabListEditor({labs, prefix, moduleId}: Props) {
  return (
    <FieldArray
      name={prefix}
      render={helpers =>
        <>
          <Row style={{marginBottom: '1rem'}}>
            <Col>Labs</Col>
            <Col className='d-flex justify-content-end align-items-center'>
              <IconButton
                icon={faPlusCircle}
                size={'2x'}
                link={getNewLabEditorLink(moduleId)}
                color={'black'}
              />
            </Col>
          </Row>
          {labs.map((lab,index) => <LabListItem prefix={`${prefix}.${index}`} key={index} lab={lab}/>)}
        </>
      }
    />
  );
}
