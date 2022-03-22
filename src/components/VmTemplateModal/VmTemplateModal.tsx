import {Modal, Tab, Tabs} from 'react-bootstrap';
import { useEffect } from 'react';
import {VmTemplateTable} from './VmTemplateTable';
import {VmTemplate} from '../../types/editorTypes';
import {VmTemplateUpload} from './VmTemplateUpload';

interface Props {
  open: boolean;
  onSelect: (vmTemplateId: number) => void;
  onCancel: () => void;
  onReloadVms: () => Promise<void>;
  vmTemplates: VmTemplate[];
}

export function VmTemplateModal({open, onCancel, onSelect, onReloadVms, vmTemplates}: Props) {
  useEffect(() => { onReloadVms(); }, []);


  return (
    <Modal show={open} size='lg' centered={true} onHide={onCancel} backdrop='static' >
      <Modal.Header closeButton={true} >
        <Modal.Title>VM Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h5>Select a VM</h5>
          <VmTemplateTable templates={vmTemplates.filter(t => !t.isCoreRouter)} onSelect={onSelect} />
          <h5>Upload an OVA file</h5>
          <Tabs defaultActiveKey='upload' id='vm-upload-tabs'>
            <Tab eventKey='upload' title='Upload'><VmTemplateUpload byUrl={false} reloadVms={onReloadVms} /></Tab>
            <Tab eventKey='url' title='Url'>      <VmTemplateUpload byUrl={true} reloadVms={onReloadVms} /></Tab>
          </Tabs>
        </>
      </Modal.Body>
    </Modal>
  );
}
