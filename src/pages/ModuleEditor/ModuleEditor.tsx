import * as React from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {
  handleAxiosError,
  propertyOf, useMessage
} from '../../util';
import {Message} from '../../util/Message';
import {ModuleForm} from '../../types/editorTypes';
import {makeModuleForm} from '../../factories';
import {DropdownInput} from '../../components/util/DropdownInput/DropdownInput';
import {DropdownOption} from '../../components/util/SearchableDropdown/SearchableDropdown';
import {getModuleShareLink, ModuleType} from '../../types/Module';
import {Redirect, RouteComponentProps} from 'react-router';
import {getModuleForEditor, saveModule} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {ModuleEditorSchema} from './ModuleEditorSchema';
import {RoutePaths} from '../../router/RoutePaths';
import { LinkContainer } from 'react-router-bootstrap';
import CheckBoxInput from '../../components/util/CheckBoxInput/CheckBoxInput';
import {LabListEditor} from '../../components/LabListEditor/LabListEditor';
import {PageTitle} from '../../components/util/PageTitle';
import {useSelector} from 'react-redux';

const moduleTypeOptions: DropdownOption<ModuleType>[] = [
  {value: 'SingleUser', label: 'Single User'},
  {value: 'MultiUser', label: 'Multi User'}
];

type Props = RouteComponentProps<{ moduleId?: string }>;

export default function ModuleEditor({match: {params: {moduleId}}}: Props) {
  const [initialValues, setInitialValues] = React.useState<ModuleForm>(makeModuleForm());
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = useMessage();
  const [editing, setEditing] = React.useState(false);
  const [redirect, setRedirect] = React.useState();
  const [canDisable, setCanDisable] = React.useState(false);

  function completeLoading() {
    setLoading(false);
    setMessage(undefined);
  }

  const userRole = useSelector((state: any) => state.entities.currentUser.role);
  const userId = useSelector((state: any) => state.entities.currentUser.id);

  const onSubmit = async (form: ModuleForm, {setErrors}: FormikHelpers<ModuleForm>) => {
    setMessage(undefined);
    try {
      const response = await saveModule(form);
      setInitialValues(response);
      setEditing(false);
      setMessage({message: 'Successfully Saved', variant: 'success'});
      if(!moduleId) {
        setRedirect(RoutePaths.EditModule.replace(':moduleId', String(response.id)));
      }
    } catch (e) {
      setMessage({message: handleAxiosError(e, {}, setErrors), variant: 'danger', critical: false});
    }
  };

  function onCancel() {
    setInitialValues({...initialValues});
    setEditing(false);
    setMessage(undefined);
  }

  React.useEffect(() => {
    async function LoadModule() {
      setRedirect(undefined);
      if (!moduleId) {
        setInitialValues(makeModuleForm());
        setEditing(true);
        completeLoading();
        return;
      }
      try {
        setLoading(true);
        setEditing(false);
        setInitialValues(await getModuleForEditor(Number(moduleId)));
        completeLoading();
      } catch (e) {
        setMessage({message: handleAxiosError(e), variant: 'danger', critical: true});
        setLoading(false);
      }
    }

    LoadModule();
  }, [moduleId]);

  React.useEffect(() => {
    if (userRole === 'Admin') {
      setCanDisable(true);
    }
    else if (userRole === 'Creator' && userId === initialValues.ownerId) {
      setCanDisable(true);
    }
  }, [initialValues]);

  const renderForm = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={ModuleEditorSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values}) => (
        <Form onSubmit={handleSubmit}>
          {redirect && <Redirect to={redirect} />}
          <Row>
            <Col className='d-flex justify-content-start align-items-center'>
              <PageTitle>Module Editor</PageTitle>
              <LinkContainer style={{marginLeft: '1rem'}} to={RoutePaths.contentCreator}>
                <Button type='button' variant='info'>Back</Button>
              </LinkContainer>
            </Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {editing && Boolean(values.id) && <Button style={{marginRight: '1rem'}} type='button' variant='danger' onClick={onCancel}>Cancel</Button>}
              {!editing && <Button type='button' onClick={() => setEditing(true)}>Edit</Button>}
              {editing && <LoadingButton loading={isSubmitting} type='submit' label={values.id ? 'Save' : 'Create'}/>}
            </Col>
          </Row>
          <Col sm='12' className='m-auto'>
            <Message state={message}/>
            { !editing && (
              <Form.Group>
                <Form.Label column={true}>Share Link</Form.Label>
                <a target='_blank' rel='noopener' href={getModuleShareLink(values.specialCode)}>{getModuleShareLink(values.specialCode)}</a>
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label column={true}>Module Name</Form.Label>
              <Input name={propertyOf<ModuleForm>('name')} placeholder='Enter Module Name' disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <CheckBoxInput name={propertyOf<ModuleForm>('published')} label='Publish (Display on the explore page)' disabled={!editing}/>
            </Form.Group>
            {canDisable &&
              <Form.Group>
                <CheckBoxInput name={propertyOf<ModuleForm>('disabled')} label='Disable Module' disabled={!editing}/>
              </Form.Group>
            }
            <Form.Group>
              <Form.Label column={true}>Type</Form.Label>
              <DropdownInput name={propertyOf<ModuleForm>('type')} dropdownData={moduleTypeOptions} disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <Form.Label column={true}>Module Description</Form.Label>
              <Input name={propertyOf<ModuleForm>('description')} placeholder='Description' type='textarea' disabled={!editing}/>
            </Form.Group>
            <hr/>
            <p>
              Once you save your changes you can add and remove labs from this module. Note: Adding or editing a lab will cancel changes on this page
            </p>
            {values.id !== 0 &&
              <LabListEditor labs={values.labs} prefix={propertyOf<ModuleForm>('labs')} moduleId={values.id} disabledModule={values.disabled}/>
            }
          </Col>
        </Form>
      )}
    </Formik>
  );

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : message?.critical ? <Message state={message} /> : renderForm()}</Layout>;

}
