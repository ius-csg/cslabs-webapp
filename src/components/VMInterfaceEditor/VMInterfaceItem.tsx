import {Col} from 'react-bootstrap';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {BridgeTemplate, VmInterfaceTemplate} from '../../types/editorTypes';
import {DropdownInput} from '../util/DropdownInput/DropdownInput';
import {DropdownOption} from '../util/SearchableDropdown/SearchableDropdown';
import {ListRow} from '../util/ListRow/ListRow';
import {InputColumn} from '../util/InputColumn';


interface Props {
  vmInterfaceTemplate: VmInterfaceTemplate;
  bridgeTemplates: BridgeTemplate[];
  prefix: string;
  interfaceOptions: DropdownOption<number>[];
  onDelete: () => void;
  editable: boolean;
}

export function VMInterfaceItem({prefix, vmInterfaceTemplate, bridgeTemplates, onDelete, interfaceOptions, editable}: Props){
  interfaceOptions = [
    ...interfaceOptions,
    {
      value: vmInterfaceTemplate.interfaceNumber,
      label: `${vmInterfaceTemplate.interfaceNumber}`
    }
  ].sort((a, b) => a.value - b.value);
  const getFieldName = (name: keyof VmInterfaceTemplate) => `${prefix}.${name}`;
  const bridgeTemplateOptions = bridgeTemplates.map((bridgeTemplate) => ({value: bridgeTemplate.uuid, label: bridgeTemplate.name}));
  return (
    <ListRow>
      <InputColumn label='Interface' style={{marginRight: '1rem'}}>
        <DropdownInput name={getFieldName('interfaceNumber')} dropdownData={interfaceOptions}/>
      </InputColumn>
      <InputColumn label='Bridge'>
        <DropdownInput name={getFieldName('bridgeTemplateUuid')} dropdownData={bridgeTemplateOptions}/>
      </InputColumn>
      <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
        <IconButton icon={faTrashAlt} size='1x' color={editable ? 'red' : 'black'} onClick={editable ? onDelete : undefined}/>
      </Col>
    </ListRow>
  );
}
