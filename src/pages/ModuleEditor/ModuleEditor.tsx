import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {deleteModuleTags, getModuleForEditor, getTags, saveModule} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {ModuleEditorSchema} from './ModuleEditorSchema';
import {RoutePaths} from '../../router/RoutePaths';
import { LinkContainer } from 'react-router-bootstrap';
import CheckBoxInput from '../../components/util/CheckBoxInput/CheckBoxInput';
import {LabListEditor} from '../../components/LabListEditor/LabListEditor';
import {PageTitle} from '../../components/util/PageTitle';
import {TagEditor} from '../../components/TagEditor/TagEditor';
import {Tag} from '../../types/Tag';
import {ModuleTag} from '../../types/ModuleTag';

const moduleTypeOptions: DropdownOption<ModuleType>[] = [
  {value: 'SingleUser', label: 'Single User'},
  {value: 'MultiUser', label: 'Multi User'}
];

type Props = RouteComponentProps<{ moduleId?: string }>;

export default function ModuleEditor({match: {params: {moduleId}}}: Props) {
  const [initialValues, setInitialValues] = useState<ModuleForm>(makeModuleForm());
  const [moduleTags, setModuleTags] = useState<ModuleTag[]>([]);
  const [deletedModuleTags, setDeletedModuleTags] = useState<ModuleTag[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useMessage();
  const [editing, setEditing] = useState(false);
  const [redirect, setRedirect] = useState();

  function completeLoading() {
    setLoading(false);
    setMessage(undefined);
  }

  const onSubmit = async (form: ModuleForm, {setErrors}: FormikHelpers<ModuleForm>) => {
    setMessage(undefined);
    try {
      await deleteModuleTags(deletedModuleTags);
      form.moduleTags = moduleTags;
      const response = await saveModule(form);
      setInitialValues(response[0]);
      setModuleTags(response[0].moduleTags);
      setDeletedModuleTags([]);
      setEditing(false);
      setMessage({message: 'Successfully Saved', variant: 'success'});
      if(!moduleId) {
        setRedirect(RoutePaths.EditModule.replace(':moduleId', String(response[0].id)));
      }
    } catch (e) {
      setMessage({message: handleAxiosError(e, {}, setErrors), variant: 'danger', critical: false});
    }
  };

  function onCancel() {
    setInitialValues({...initialValues});
    setModuleTags([...moduleTags, ...deletedModuleTags]);
    setDeletedModuleTags([]);
    setEditing(false);
    setMessage(undefined);
  }

  function onAddTag(tag: Tag) {
    setModuleTags([...moduleTags,{moduleId: Number(moduleId), tagId: (tag.id === 0) ? tag.id : 0, tag: tag}]);
  }

  function onDeleteTag(i: number) {
    setDeletedModuleTags(mt => [...mt, ...moduleTags.filter((tag, index) => index === i && tag.tagId !== 0)]);
    setModuleTags(moduleTags.filter((tag, index) => index !== i));
  }

  async function onTagInput(input: string) {
    setTagSuggestions(await getTags(input));
  }

  useEffect(() => {
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
        const response = await getModuleForEditor(Number(moduleId!));
        setInitialValues(response);
        setModuleTags(response.moduleTags);
        completeLoading();
      } catch (e) {
        setMessage({message: handleAxiosError(e), variant: 'danger', critical: true});
        setLoading(false);
      }
    }

    LoadModule();
  }, [moduleId]);

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
            <Form.Group>
              <Form.Label column={true}>Type</Form.Label>
              <DropdownInput name={propertyOf<ModuleForm>('type')} dropdownData={moduleTypeOptions} disabled={!editing}/>
            </Form.Group>
            <Form.Group>
              <Form.Label column={true}>Module Description</Form.Label>
              <Input name={propertyOf<ModuleForm>('description')} placeholder='Description' type='textarea' disabled={!editing}/>
            </Form.Group>
            <Form.Label column={true}>Tags</Form.Label>
            <TagEditor
              tags={moduleTags.map(mt => mt.tag)}
              tagSuggestions={tagSuggestions}
              mes={message?.variant}
              editing={editing}
              onAdd={onAddTag}
              onDelete={onDeleteTag}
              onInput={onTagInput}
            />
            <hr/>
            <p>
              Once you save your changes you can add and remove labs from this module. Note: Adding or editing a lab will cancel changes on this page
            </p>
            {values.id !== 0 &&
              <LabListEditor labs={values.labs} prefix={propertyOf<ModuleForm>('labs')} moduleId={values.id}/>
            }
          </Col>
        </Form>
      )}
    </Formik>
  );

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : message?.critical ? <Message state={message} /> : renderForm()}</Layout>;

}
