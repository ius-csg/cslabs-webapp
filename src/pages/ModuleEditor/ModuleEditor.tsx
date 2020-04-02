import * as React from 'react';
import {useEffect, useState} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {
  handleAxiosError,
  isBadRequest, propertyOf, useMessage
} from '../../util';
import {Message} from '../../util/Message';
import {ModuleForm} from '../../types/editorTypes';
import {makeModuleForm} from '../../factories';
import {DropdownInput} from '../../components/util/DropdownInput/DropdownInput';
import {DropdownOption} from '../../components/util/SearchableDropdown/SearchableDropdown';
import {ModuleType} from '../../types/Module';
import {RouteComponentProps} from 'react-router';
import {getModuleForEditor, saveModule} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {ModuleEditorSchema} from './ModuleEditorSchema';
import {RoutePaths} from '../../router/RoutePaths';
import { LinkContainer } from 'react-router-bootstrap';
import CheckBoxInput from '../../components/util/CheckBoxInput/CheckBoxInput';

const moduleTypeOptions: DropdownOption<ModuleType>[] = [
  {value: 'SingleUser', label: 'Single User'},
  {value: 'MultiUser', label: 'Multi User'}
];

const generateLink = (uuid: string) => `${process.env.REACT_APP_URL!}/module/${uuid}`;


type Props = RouteComponentProps<{ uuid?: string }>;

export default function ModuleEditor({match: {params: {uuid}}}: Props) {
  const [initialValues, setInitialValues] = useState<ModuleForm>(makeModuleForm());
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useMessage();
  const [editing, setEditing] = useState(false);

  function completeLoading() {
    setLoading(false);
    setMessage(undefined);
  }

  const onSubmit = async (form: ModuleForm, formikHelpers: FormikHelpers<ModuleForm>) => {
    setMessage(undefined);
    try {
      setLoading(true);
      // objectToFormData(form)
      setInitialValues(await saveModule(form));
      setLoading(false);
      setEditing(false);
      setMessage({message: 'Successfully Saved', variant: 'success'});
    } catch (e) {
      setLoading(false);
      if (isBadRequest(e)) {
        formikHelpers.setErrors(e.response.data);
      } else {
        setMessage({message: handleAxiosError(e), variant: 'danger'});
      }
    }
  };

  function onCancel() {
    setInitialValues({...initialValues});
    setEditing(false);
    setMessage(undefined);
  }

  function onAction(submitForm: () => void | Promise<void>) {
    if (!editing) {
      setEditing(true);
      return;
    }
    submitForm();
  }

  useEffect(() => {
    async function LoadModule() {
      if (!uuid) {
        setInitialValues(makeModuleForm());
        setEditing(true);
        completeLoading();
        return;
      }
      try {
        setLoading(true);
        setEditing(false);
        setInitialValues(await getModuleForEditor(uuid!));
        completeLoading();
      } catch (e) {
        setMessage({message: handleAxiosError(e), variant: 'danger'});
        setLoading(false);
      }
    }

    LoadModule();
  }, [uuid]);

  const ModuleFormComponent = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={ModuleEditorSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values}) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className='d-flex justify-content-start align-items-center'>
              <h1>Module Editor</h1>
              <LinkContainer style={{marginLeft: '1rem'}} to={RoutePaths.contentCreator}>
                <Button type='button' variant='info'>Back</Button>
              </LinkContainer>
            </Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {editing && Boolean(values.id) && <Button style={{marginRight: '1rem'}} type='button' variant='danger' onClick={onCancel}>Cancel</Button>}
              <LoadingButton
                loading={isSubmitting}
                type='button'
                onClick={() => onAction(handleSubmit)}
                label={values.id ? (!editing ? 'Edit' : 'Save'): 'Create'}
              />
            </Col>
          </Row>
          <Col sm='12' className='m-auto'>
            <Message state={message}/>
            { !editing && (
              <Form.Group>
                <Form.Label column={true}>Share Link</Form.Label>
                <a target='_blank' rel='noopener' href={generateLink(values.specialCode)}>{generateLink(values.specialCode)}</a>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label column={true}>Module Name</Form.Label>
              <Input name={propertyOf<ModuleForm>('name')} placeholder='Enter Module Name' disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <CheckBoxInput name={propertyOf<ModuleForm>('published')} label='Publish (Display on the explore page)' disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <Form.Label column={true}>Type</Form.Label>
              <DropdownInput name={propertyOf<ModuleForm>('type')} dropdownData={moduleTypeOptions} disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <Form.Label column={true}>Module Description</Form.Label>
              <Input name={propertyOf<ModuleForm>('description')} placeholder='Description' type='textarea' disabled={!editing}/>
            </Form.Group>
          </Col>
        </Form>
      )}
    </Formik>
  );

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : <ModuleFormComponent/>}</Layout>;

}
