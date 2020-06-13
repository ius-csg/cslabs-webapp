import * as React from 'react';
import {useState} from 'react';
import {Form, Col, ProgressBar, Alert, Row} from 'react-bootstrap';
import {Formik} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {handleAxiosError} from '../../util';
import {FileInput} from '../util/FileInput';
import {getUploadProgress, uploadVmTemplate, uploadVmTemplateByUrl} from '../../api';
import {
  getInitialUploadValues,
  getUploadSchema,
  isUploadByUrlForm,
  isUploadForm,
  NamedUpload, UploadByUrlForm, UploadForm
} from './VmTemplateUploadSchema';
import {useInterval} from '../../hooks/useInterval';


type Props = {byUrl: boolean; reloadVms: () => void};
export function VmTemplateUpload({byUrl, reloadVms}: Props) {
  const [initialValues] = useState(getInitialUploadValues(byUrl));
  const [uploadPercentage, setUploadPercentage] = useState<number|undefined>(undefined);
  const uploading = uploadPercentage !== undefined;
  const [error, setError] = useState('');
  const [byUrlRequestId, setByUrlRequestId] = useState<string | undefined>();
  const loadingLabel = uploadPercentage === undefined ? '' :
    (uploadPercentage === 100 ?
        'Importing Ova File' :
        (uploadPercentage! > 5 ?`${uploadPercentage}%` : '')
    );
  const getFieldName = (name: keyof (UploadForm & UploadByUrlForm)) => name;
  const onSubmit = async (form: NamedUpload) => {
    setError('');
    try {
      if (isUploadForm(form)) {
        await uploadVmTemplate(form, (e: ProgressEvent) => setUploadPercentage(Math.round((e.loaded * 100) / e.total)));
        setUploadPercentage(undefined);
        reloadVms();
      } else if(isUploadByUrlForm(form)){
        setByUrlRequestId(await uploadVmTemplateByUrl(form));
      }
    } catch(e) {
      setByUrlRequestId(undefined);
      setError(handleAxiosError(e));
    }

  };

  useInterval(async () => {
    try {
      const status = await getUploadProgress(byUrlRequestId!);
      setUploadPercentage(status.progress);
      if(status.status === 'Complete') {
        setByUrlRequestId(undefined);
        setUploadPercentage(undefined);
        reloadVms();
      } else if(status.status === 'Downloading') {
        setUploadPercentage(status.progress);
      } else {
        setByUrlRequestId(undefined);
        setUploadPercentage(undefined);
        setError(`Upload failed with status: ${status.status}`);
      }
    } catch (e) {
      setByUrlRequestId(undefined);
      setError(handleAxiosError(e));
    }
  }, byUrlRequestId ? 2000 : null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getUploadSchema(byUrl)}
      onSubmit={onSubmit}
    >
      {({handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} xs={4}>
              <Form.Label>Template Name</Form.Label>
              <Input name={getFieldName('name')} placeholder='Name' disabled={uploading} />
            </Form.Group>
            { !byUrl && (
            <Form.Group as={Col} xs={4}>
              <Form.Label>File upload</Form.Label>
              <FileInput name={getFieldName('file')} accept='.ova' disabled={uploading}  />
            </Form.Group>
            )}
            { byUrl && (
              <Form.Group as={Col} xs={4}>
                <Form.Label>Url</Form.Label>
                <Input name={getFieldName('url')} placeholder='https://' disabled={uploading} />
              </Form.Group>
            )}
            <Form.Group as={Col} xs={4} className='align-self-center'>
              <Form.Label/>
              <LoadingButton loading={uploading} type='submit' label='Start'/>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              {uploadPercentage !== undefined &&
              <ProgressBar
                style={{marginTop: '1rem'}}
                animated={true}
                now={uploadPercentage}
                label={loadingLabel}
              />
              }
              {Boolean(error) && <Alert style={{marginTop: '1rem'}} variant='danger'>{error}</Alert>}
              <br/>
              <i>We currently support ova files with one vm per ova file.</i>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );

}
