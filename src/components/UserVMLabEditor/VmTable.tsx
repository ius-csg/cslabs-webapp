import * as React from 'react';
import {Lab} from '../../types/Lab';
import {FieldArray} from 'formik';
import {Row} from 'react-bootstrap';
import {LabVm} from '../../types/LabVm';
import {VmRow} from './VmRow';


interface Props {
  prefix: string;
  labs: Lab[];
}

export function Vmtable(props: Props) {
  return (
    <FieldArray
      name={props.prefix}
      render={helpers =>
        <>
          <Row>
            {props.labs[0].name}
          </Row>
          {props.labs.map((lab: LabVm, i) =>
            <VmRow key={i} prefix={`${props.prefix}.${i}`} onRemove={() => helpers.remove(i)} vm={lab[0]}/>)
          }
        </>
      }
    />
  );
}
