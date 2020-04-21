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
import {LabForm, LabVmForm} from '../../types/editorTypes';
import {makeLabForm} from '../../factories';
import {DropdownInput} from '../../components/util/DropdownInput/DropdownInput';
import {DropdownOption} from '../../components/util/SearchableDropdown/SearchableDropdown';
import {RouteComponentProps} from 'react-router';
import {getLabForEditor, getUserLabReadmeUrl, getUserLabTopologyUrl, saveLab} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {LabEditorSchema} from './LabEditorSchema';
import {RoutePaths} from '../../router/RoutePaths';
import {PageTitle} from '../../components/util/PageTitle';
import {LabDifficulty, LabType} from '../../types/Lab';
import {VmTable} from '../../components/UserVMLabEditor/VmTable';
import {ButtonLink} from '../../components/util/ButtonLink';
import {FileInput} from '../../components/util/FileInput';
import {VmTemplateModal} from '../../components/VmTemplateModal/VmTemplateModal';
import {BridgeListEditor} from '../../components/BridgeListEditor/BridgeListEditor';

const labDifficultyOptions: DropdownOption<LabDifficulty>[] = [
  {value: 1, label: 'Easy'},
  {value: 2, label: 'Medium'},
  {value: 3, label: 'Hard'}
];

const labTypeOptions: DropdownOption<LabType>[] = [
  {value: 'Temporary', label: 'Temporary (lasts only a day but can be restarted multiple times)'},
  {value: 'Class', label: 'Class (lasts a semester)'},
  {value: 'Permanent', label: 'Permanent (lasts forever)'}
];

const getEditModuleLink = (lab: LabForm) => RoutePaths.EditModule.replace(':moduleId', String(lab.moduleId));

type Props = RouteComponentProps<{ moduleId: string; labId?: string }>;

export default function LabEditor({match: {params: {moduleId, labId}}}: Props) {
  const [initialValues, setInitialValues] = useState<LabForm>(makeLabForm(Number(moduleId)));
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useMessage();
  const [editing, setEditing] = useState(false);

  function completeLoading() {
    setLoading(false);
    setMessage(undefined);
  }

  const onSubmit = async (form: LabForm, formikHelpers: FormikHelpers<LabForm>) => {
    form = {...form, moduleId: Number(moduleId)};
    setMessage(undefined);
    try {
      setLoading(true);
      setInitialValues(await saveLab(form));
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
    async function LoadLab() {
      if (!labId) {
        setInitialValues(makeLabForm(Number(moduleId)));
        setEditing(true);
        completeLoading();
        return;
      }
      try {
        setLoading(true);
        setEditing(false);
        setInitialValues(await getLabForEditor(Number(labId)));
        completeLoading();
      } catch (e) {
        setMessage({message: handleAxiosError(e), variant: 'danger', critical: true});
        setLoading(false);
      }
    }

    LoadLab();
  }, [labId]);

  const getFieldName = (name: keyof LabForm) => name;

  const [selectedVm, setSelectedVm] = useState<number|undefined>();
  const ModuleFormComponent = () => (
    <Layout>
    <Formik
      initialValues={initialValues}
      validationSchema={LabEditorSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values, setFieldValue}) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col className='d-flex justify-content-start align-items-center'>
                <PageTitle>Lab Editor</PageTitle>
                <ButtonLink to={getEditModuleLink(values)} style={{marginLeft: '1rem'}} variant='info'>Back</ButtonLink>
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
              <Form.Group>
                <Form.Label>Lab Name</Form.Label>
                <Input name={getFieldName('name')} placeholder='Enter Lab Name' disabled={!editing}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Topology Image (Only jpg supported)</Form.Label>
                <FileInput name={getFieldName('topology')} accept='image/jpg' disabled={!editing} />
                {values.hasTopology && <a href={getUserLabTopologyUrl(values.id)} target='_blank'>View Current</a>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload PDF Readme (only pdfs supported)</Form.Label>
                <FileInput name={getFieldName('readme')} accept='.pdf' disabled={!editing} />
                {values.hasReadme && <a href={getUserLabReadmeUrl(values.id)} target='_blank'>View Current</a>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Lab Type</Form.Label>
                <DropdownInput name={getFieldName('type')} dropdownData={labTypeOptions} disabled={!editing}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Lab Difficulty</Form.Label>
                <DropdownInput name={getFieldName('labDifficulty')} dropdownData={labDifficultyOptions} disabled={!editing}/>
              </Form.Group>
              <BridgeListEditor bridgeTemplates={values.bridgeTemplates} prefix={getFieldName('bridgeTemplates')} editing={editing}/>
              <VmTable
                bridgeTemplates={values.bridgeTemplates}
                prefix={getFieldName('labVms')}
                vms={values.labVms}
                editable={editing}
                onOpenTemplateSelection={(index) => setSelectedVm(index)}
              />
            </Col>
          </Form>
          <VmTemplateModal
            open={selectedVm !== undefined}
            onCancel={() => setSelectedVm(undefined)}
            onSelect={(vmTemplateId: number) => {
              setFieldValue(`${getFieldName('labVms')}.${selectedVm}.${propertyOf<LabVmForm>('vmTemplateId')}`, vmTemplateId);
              setSelectedVm(undefined);
            }}
          />
        </>
      )}
    </Formik>
  </Layout>
  );
  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : message?.critical ? <Message state={message} /> : <ModuleFormComponent/>}</Layout>;
}
