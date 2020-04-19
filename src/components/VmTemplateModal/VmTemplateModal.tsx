import {Alert, Button, Form, Modal, ProgressBar} from 'react-bootstrap';
import * as React from 'react';
import {VmTemplateTable} from './VmTemplateTable';
import {FormEvent, useState} from 'react';
import {VmTemplate} from '../../types/editorTypes';
import {uploadVmTemplate} from '../../api';
import {handleAxiosError} from '../../util';

interface Props {
  open: boolean;
  onSelect: (vmTemplateId?: number) => void;
  onCancel: () => void;
}

export function VmTemplateModal({open, onCancel, onSelect}: Props) {
  const [vmTemplates] = useState<VmTemplate[]>([]);
  const [uploadPercentage, setUploadPercentage] = useState<number|undefined>(undefined);
  const [error, setError] = useState('');
  const onFileChange = async (event: FormEvent<HTMLInputElement>) => {
    setError('');
    const currentTarget: HTMLInputElement = event.currentTarget!;
    const files = currentTarget.files!;
    if (files.length === 0) {
      currentTarget.value = '';
    } else {
      const file = files.item(0)!;
      try {
        const formData = new FormData();
        formData.append('file', file);
        await uploadVmTemplate(formData, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        });

      } catch(e) {
        setError(handleAxiosError(e));
      }
      setUploadPercentage(undefined);
      currentTarget.value = '';
    }
  };
  return (
    <Modal show={open} size='lg' centered={true} onHide={onCancel}>
      <Modal.Header closeButton={true}>
        <Modal.Title>VM Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h4>Select or Upload VM</h4>
          <VmTemplateTable templates={vmTemplates} onSelect={onSelect} />
          {uploadPercentage === undefined && <Form.Control type='file' accept='.ova' name='ova' onChange={onFileChange} />}
          {uploadPercentage !== undefined &&
            <ProgressBar
              style={{marginTop: '1rem'}}
              animated={true}
              now={uploadPercentage}
              label={uploadPercentage > 5 ?`${uploadPercentage}%` : ''}
            />
          }
          {Boolean(error) &&  <Alert style={{marginTop: '1rem'}} variant='danger'>{error}</Alert>}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
