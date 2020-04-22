import * as React from 'react';
import {FieldArray} from 'formik';
import {VmRow} from './VmRow';
import {BridgeTemplate, LabVmForm, VmTemplate} from '../../types/editorTypes';
import {Col, Row} from 'react-bootstrap';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {makeLabVmForm} from '../../factories';
import {Dictionary} from '../../util';


interface Props {
  prefix: string;
  vms: LabVmForm[];
  editable: boolean;
  bridgeTemplates: BridgeTemplate[];
  onOpenTemplateSelection: (index: number) => void;
  vmTemplateDictionary: Dictionary<VmTemplate>;
}

export function VmTable(props: Props) {
  const {editable, bridgeTemplates, prefix, onOpenTemplateSelection, vms, vmTemplateDictionary} = props;
  return (
    <FieldArray
      name={prefix}
      render={helpers => {
        if(vms.filter(t => t.isCoreRouter).length === 0 && editable && Object.keys(vmTemplateDictionary).length > 0) {
          const coreRouter = Object.values<VmTemplate>(vmTemplateDictionary).find(t => t.isCoreRouter);
          if(!coreRouter) {
            console.error('No Core Router provided in database');
          }
          helpers.push(makeLabVmForm('Core Router', true, coreRouter?.id ?? 0));
        }
        return (
        <>
          <Row style={{marginBottom: '1rem'}}>
            <Col><h5>Virtual Machines</h5></Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {editable &&
              <IconButton
                icon={faPlusCircle}
                hideIcon={!editable}
                size={'2x'}
                onClick={() => helpers.push(makeLabVmForm())}
                color={'black'}
              />
              }
            </Col>
          </Row>
          {props.vms.length === 0 && (
            <Row>
              <Col><p>No Vms Added</p></Col>
            </Row>
          )}
          {props.vms.map((vm: LabVmForm, i) =>
            <VmRow
              vmTemplateDictionary={vmTemplateDictionary}
              key={i}
              prefix={`${prefix}.${i}`}
              onRemove={() => helpers.remove(i)}
              vm={vm}
              editable={editable}
              bridgeTemplates={bridgeTemplates}
              index={i}
              onOpenTemplateSelection={onOpenTemplateSelection}
            />)}
        </>
        );
      }}
    />
  );
}
