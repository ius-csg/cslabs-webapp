import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {BridgeTemplate, VmInterfaceTemplate} from '../../types/editorTypes';
import {DropdownInput} from '../util/DropdownInput/DropdownInput';
import {DropdownOption} from '../util/SearchableDropdown/SearchableDropdown';


interface Props {
  vmInterfaceTemplate: VmInterfaceTemplate;
  bridgeTemplates: BridgeTemplate[];
  prefix: string;
  interfaceOptions: DropdownOption<number>[];
  onDelete: () => void;
}

export function VMInterfaceItem({prefix, vmInterfaceTemplate, bridgeTemplates, onDelete, interfaceOptions}: Props){
  interfaceOptions = [
    ...interfaceOptions,
    {
      value: vmInterfaceTemplate.interfaceNumber,
      label: `${vmInterfaceTemplate.interfaceNumber}`
    }
  ];
  const getFieldName = (name: keyof VmInterfaceTemplate) => `${prefix}.${name}`;
  const bridgeTemplateOptions = bridgeTemplates.map((bridgeTemplate) => ({value: bridgeTemplate.uuid, label: bridgeTemplate.name}));
  return (
    <Row className='border-top' style={{marginTop: 8}} >
      <Col style={{marginTop: 8}}>
        <DropdownInput name={getFieldName('interfaceNumber')} dropdownData={interfaceOptions}/>
      </Col>
      <Col style={{marginTop: 8}}>
        <DropdownInput name={getFieldName('bridgeTemplateUuid')} dropdownData={bridgeTemplateOptions}/>
      </Col>
      <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
        <IconButton
          icon={faTrashAlt}
          size={'2x'}
          color={'black'}
          onClick={onDelete}
        />
      </Col>
    </Row>
  );
}
