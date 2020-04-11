import * as React from 'react';
import {FieldArray} from 'formik';
import {VmRow} from './VmRow';
import {LabVmForm} from '../../types/editorTypes';


interface Props {
  prefix: string;
  vms: LabVmForm[];
  editable: boolean;
}

export function VmTable(props: Props) {
  return (
    <FieldArray
      name={props.prefix}
      render={helpers =>
        <>
          {props.vms.map((vm: LabVmForm, i) =>
            <VmRow key={i} prefix={`${props.prefix}.${i}`} onRemove={() => helpers.remove(i)} vm={vm} editable={props.editable}/>)
          }
        </>
      }
    />
  );
}
