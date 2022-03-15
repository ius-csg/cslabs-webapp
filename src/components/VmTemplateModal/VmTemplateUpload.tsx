import { useState } from 'react';
import {Form, Col, ProgressBar, Row} from 'react-bootstrap';
import {Formik} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {handleAxiosError, useMessage} from '../../util';
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
import {Message} from '../../util/Message';


type Props = {byUrl: boolean; reloadVms: () => void};
export function VmTemplateUpload({byUrl, reloadVms}: Props) {
  const [initialValues, setInitialValues] = useState(getInitialUploadValues(byUrl));
  const [uploadPercentage, setUploadPercentage] = useState<number|undefined>(undefined);
  const uploading = uploadPercentage !== undefined;
  const [message, setMessage] = useMessage();
  const setError = (msg: string) => setMessage({message: msg, variant: 'danger'});
  const [byUrlRequestId, setByUrlRequestId] = useState<string | undefined>();
  function clearForm()  {
    setInitialValues({} as any);
    setInitialValues(getInitialUploadValues(byUrl));
  }
  const onImportComplete = () => {
    setByUrlRequestId(undefined);
    setUploadPercentage(undefined);
    clearForm();
    setMessage({message: 'Successfully imported', variant: 'success'});
    reloadVms();
  };
  let loadingLabel = '';
  if (uploadPercentage) {
    if (uploadPercentage === 100) {
      loadingLabel = 'Importing Ova File';
    } else if (uploadPercentage > 5) {
      loadingLabel = `${uploadPercentage.toFixed(2)}%`;
    }
  }
  const getFieldName = (name: keyof (UploadForm & UploadByUrlForm)) => name;
  const onSubmit = async (form: NamedUpload) => {
    setMessage(undefined);
    try {
      if (isUploadForm(form)) {
        await uploadVmTemplate(form, (percent) => setUploadPercentage(percent));
        onImportComplete();
      } else if(isUploadByUrlForm(form)){
        setByUrlRequestId(await uploadVmTemplateByUrl(form));
        setUploadPercentage(0);
      }
    } catch(e: any) {
      setByUrlRequestId(undefined);
      setError(handleAxiosError(e));
    }

  };

  useInterval(async () => {
    try {
      const status = await getUploadProgress(byUrlRequestId as string);
      setUploadPercentage(status.progress);
      if(status.status === 'Complete') {
        onImportComplete();
      } else if(status.status === 'Downloading') {
        setUploadPercentage(status.progress);
      } else {
        setByUrlRequestId(undefined);
        setUploadPercentage(undefined);
        setError(`Upload failed with status: ${status.status}`);
      }
    } catch (e: any) {
      setByUrlRequestId(undefined);
      setError(handleAxiosError(e));
    }
  }, byUrlRequestId ? 2000 : null);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
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
              <Message state={message} />
              <br/>
              <i>We currently support ova files with one vm per ova file.</i>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );

}
