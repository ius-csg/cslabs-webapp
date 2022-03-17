import {Button, Col, Row, Form} from 'react-bootstrap';
import {ListRow} from '../util/ListRow/ListRow';
import {IconButton} from '../util/IconButton/IconButton';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Input from '../util/Input/Input';
import {BridgeTemplate, LabVmForm, VmTemplate} from '../../types/editorTypes';
import {VMInterfaceEditor} from '../VMInterfaceEditor/VMInterfaceEditor';
import {ErrorMessage} from 'formik';
import {Dictionary} from '../../util';

interface VmRowProps {
  prefix: string;
  onRemove: () => void;
  vm: LabVmForm;
  editable: boolean;
  bridgeTemplates: BridgeTemplate[];
  onOpenTemplateSelection: (index: number) => void;
  index: number;
  vmTemplateDictionary: Dictionary<VmTemplate>;
}

export function VmRow({vm, prefix, editable, onRemove, bridgeTemplates, onOpenTemplateSelection, index, vmTemplateDictionary}: VmRowProps) {
  const getFieldName = (name: keyof LabVmForm) => `${prefix}.${name}`;
  return (
    <ListRow>
      <Col>
        <Row style={{marginBottom: '1rem'}}>
          <Col md={4} className='d-flex justify-content-start'>
            <Input name={getFieldName('name')} disabled={!editable || vm.isCoreRouter} />
          </Col>
          <Col md={3} className='d-flex justify-content-start'>
            {!vm.isCoreRouter &&
              <Button variant='primary' disabled={!editable} onClick={() => onOpenTemplateSelection(index)}>
                {vm.vmTemplateId === 0 ? 'Choose VM Template' : vmTemplateDictionary[vm.vmTemplateId].name}
              </Button>
            }
            <ErrorMessage
              name={getFieldName('vmTemplateId')}
              render={() => (
                <Form.Control.Feedback type='invalid'>
                  Please select a VM
                </Form.Control.Feedback>
              )}
            />
          </Col>
          <Col md={3} className='d-flex justify-content-start'/>
          <Col md={2} className='d-flex justify-content-end'>
            <IconButton
              icon={faTrashAlt}
              size='1x'
              onClick={editable && !vm.isCoreRouter ? onRemove : undefined}
              color={editable && !vm.isCoreRouter ? 'red' : 'black'}
            />
          </Col>
        </Row>
        <VMInterfaceEditor
          isCoreRouter={vm.isCoreRouter}
          bridgeTemplates={bridgeTemplates}
          vmInterfaceTemplates={vm.templateInterfaces}
          prefix={getFieldName('templateInterfaces')}
          editable={editable}
        />
      </Col>
    </ListRow>
  );
}
