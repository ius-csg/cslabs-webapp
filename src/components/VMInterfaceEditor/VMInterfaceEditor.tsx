import {FieldArray} from 'formik';
import {Col, Row} from 'react-bootstrap';
import {VMInterfaceItem} from './VMInterfaceItem';
import {IconButton} from '../util/IconButton/IconButton';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {range} from '../util/Util';
import {BridgeTemplate, VmInterfaceTemplate} from '../../types/editorTypes';
import {makeVmInterfaceTemplate} from '../../factories';
import {convertArrayToDictionary} from '../../util';


interface Props {
  bridgeTemplates: BridgeTemplate[];
  vmInterfaceTemplates: VmInterfaceTemplate[];
  prefix: string;
  editable: boolean;
  isCoreRouter: boolean;
}

export function VMInterfaceEditor({vmInterfaceTemplates, prefix, bridgeTemplates, editable, isCoreRouter}: Props) {
  const interfaceNumbers = vmInterfaceTemplates.map(i => i.interfaceNumber);
  const interfaceOptions = range(0, 10)
    .map((value => ({value: value, label: String(value)})))
    .filter(o => !interfaceNumbers.includes(o.value));
  const bridgesByUuid = convertArrayToDictionary(bridgeTemplates, 'uuid');
  const coreBridgeTemplate = bridgeTemplates.find(t => t.isCoreBridge);
  return (
    <FieldArray
      name={prefix}
      render={helpers => {
        const doesNotContainCoreBridgeInterface = vmInterfaceTemplates.filter(t => bridgesByUuid[t.bridgeTemplateUuid]?.isCoreBridge).length === 0;
        if(coreBridgeTemplate && doesNotContainCoreBridgeInterface && editable) {
          const defaultValue = isCoreRouter ? 1: 0;
          helpers.push(makeVmInterfaceTemplate(interfaceNumbers.length !== 0 ? Math.max(...interfaceNumbers) + 1 : defaultValue, coreBridgeTemplate.uuid));
        }
       return (
         <>
           <Row style={{marginBottom: '1rem'}}>
             <Col>
               <h6>Interfaces</h6>
             </Col>
             <Col className='d-flex justify-content-end align-items-center'>
               <IconButton
                 icon={faPlusCircle}
                 size={'2x'}
                 color={'black'}
                 hideIcon={!editable}
                 onClick={() => {
                   helpers.push(makeVmInterfaceTemplate(interfaceNumbers.length !== 0 ? Math.max(...interfaceNumbers) + 1 : 0));
                 }}
               />
             </Col>
           </Row>
           {vmInterfaceTemplates.length === 0 && (
             <Row>
               <Col><p>No Interfaces Added</p></Col>
             </Row>
           )}
           {vmInterfaceTemplates.map((vmInterfaceTemplate,index) =>
             <VMInterfaceItem
               prefix={`${prefix}.${index}`}
               key={index}
               bridgeTemplates={bridgeTemplates}
               vmInterfaceTemplate={vmInterfaceTemplate}
               interfaceOptions={interfaceOptions}
               onDelete={() => helpers.remove(index)}
               editable={editable}
             />
           )}
         </>
       ) ;
      }}
    />
  );
}
