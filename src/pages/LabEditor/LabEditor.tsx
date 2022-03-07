import * as React from 'react';
import { useEffect, useState} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {
  convertArrayToDictionary, Dictionary,
  handleAxiosError,
  propertyOf, useMessage
} from '../../util';
import {Message} from '../../util/Message';
import {BridgeTemplate, LabForm, LabVmForm, VmInterfaceTemplate, VmTemplate} from '../../types/editorTypes';
import {makeLabForm} from '../../factories';
import {DropdownInput} from '../../components/util/DropdownInput/DropdownInput';
import {DropdownOption} from '../../components/util/SearchableDropdown/SearchableDropdown';
import {Redirect, RouteComponentProps} from 'react-router';
import {getLabForEditor, getUserLabReadmeUrl, getUserLabTopologyUrl, getVmTemplates, saveLab} from '../../api';
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
import {LabTypes} from '../../components/LabTypesPopover/LabTypesPopover';
import LabEditorGUI from '../LabEditorGUI/LabEditorGUI';
import {toJpeg} from 'html-to-image';

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
  const [guiEnabled, setGuiEnabled] = useState(true);
  const [guiSchema, setGuiSchema] = useState();
  const [vmTemplates, setVmTemplates] = useState<VmTemplate[]>([]);
  const [redirect, setRedirect] = useState();
  const vmTemplateDictionary = convertArrayToDictionary(vmTemplates, 'id') as Dictionary<VmTemplate>;
  function completeLoading() {
    setLoading(false);
    setMessage(undefined);
  }

  const onSubmit = async (form: LabForm, {setErrors}: FormikHelpers<LabForm>) => {
    form = {...form, moduleId: Number(moduleId)};
    setMessage(undefined);
    let response;
    try {
      console.log(guiSchema);
      console.log(form);
      if (guiEnabled) {
        toJpeg(document.getElementById('diagram') as HTMLElement)
          .then(async (dataUrl: string) => {
            const file = new File([dataURLtoBlob(dataUrl)], 'name');
            form = {...form, topology: (file)};
            form.hasTopology = true;
            form.labVms = getLabVmsFromGui();
            form.bridgeTemplates = getBridgeTemplatesFromGui();
            console.log(form);
            response = await saveLab(form);
            setInitialValues(response);

          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        response = await saveLab(form);
        setInitialValues(response);
      }

      setEditing(false);
      setMessage({message: 'Successfully Saved', variant: 'success'});
      if(!labId) {
        // @ts-ignore
        setRedirect(RoutePaths.EditLab.replace(':moduleId', String(moduleId)).replace(':labId', String(response.id)));
      }
    } catch (e) {
      setMessage({message: handleAxiosError(e, {}, setErrors, 'json'), variant: 'danger', critical: false});
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    // Decode the dataURL
    const binary = atob(dataURL.split(',')[1]);
    // Create 8-bit unsigned array
    const array: any = [];
    let i = 0;
    while (i < binary.length) {
      array.push(binary.charCodeAt(i));
      i++;
    }

    return new Blob([ new Uint8Array(array) ], {type: 'image/jpeg'});
  };

  const getLabVmsFromGui = () => {
    const labVms: LabVmForm[] = [];
    let i = 1;
    for (const node of guiSchema.nodes) {
      if (node.nodeType === 'vm') {
        const interfaces : VmInterfaceTemplate[] = [];
        for (const link of guiSchema.links) {
          if (link.input.slice(0, 36) === node.id) {
            const connectedNode = link.output;
            const interfaceObj = {
              bridgeTemplateUuid: connectedNode,
              id: 0,
              interfaceNumber: 0
            };
            interfaces.push(interfaceObj);
          } else if (link.output.slice(0, 36) === node.id) {
            const connectedNode = link.input;
            const interfaceObj = {
              bridgeTemplateUuid: connectedNode,
              id: 0,
              interfaceNumber: 0
            };
            interfaces.push(interfaceObj);
          }
        }
        const obj = {
          templateInterfaces: interfaces,
          vmTemplateId: 1,
          isCoreRouter: false,
          name: node.content,
          id: i
        };
        labVms.push(obj);
      }
      i++;
    }
    return labVms;
  };

  const getBridgeTemplatesFromGui = () => {
    const bridgeTemplates: BridgeTemplate[] = [];
    let i = 1;
    for (const node of guiSchema.nodes) {
      if (node.nodeType === 'switch' || node.nodeType === 'wan') {
        const obj = {
          uuid: node.id,
          isCoreBridge: (node.nodeType === 'wan'),
          name: node.content,
          id: i
        };
        bridgeTemplates.push(obj);
      }
      i++;
    }
    return bridgeTemplates;
  };


  function onCancel() {
    setInitialValues({...initialValues});
    setEditing(false);
    setMessage(undefined);
  }

  useEffect(() => {
    async function LoadLab() {
      const loadedVmTemplates = await getVmTemplates();
      const containsCoreRouter = loadedVmTemplates.filter(vm => vm.isCoreRouter).length !== 0;
      setVmTemplates(loadedVmTemplates);
      if (!labId) {
        setInitialValues(makeLabForm(Number(moduleId), containsCoreRouter));
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
  const renderForm = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={LabEditorSchema}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values, setFieldValue}) => (
        <>
          {loading ? <HorizontallyCenteredSpinner/> : (
           <>
             <Form onSubmit={handleSubmit}>
               {redirect && <Redirect to={redirect} />}
               <Row>
                 <Col className='d-flex justify-content-start align-items-center'>
                   <PageTitle>Lab Editor</PageTitle>
                   <ButtonLink to={getEditModuleLink(values)} style={{marginLeft: '1rem'}} variant='info'>Back</ButtonLink>
                 </Col>
                 <Col className='d-flex justify-content-end align-items-center'>
                   <Button type='button' onClick={() => setGuiEnabled(!guiEnabled)}>{guiEnabled ? 'Switch to Editor' : 'Switch to GUI'}</Button>
                 </Col>
                 <Col className='d-flex justify-content-end align-items-center'>
                   {editing && Boolean(values.id) && <Button style={{marginRight: '1rem'}} type='button' variant='danger' onClick={onCancel}>Cancel</Button>}
                   {!editing && <Button type='button' onClick={() => setEditing(true)}>Edit</Button>}
                   {editing && <LoadingButton loading={isSubmitting} type='submit' label={values.id ? 'Save' : 'Create'}/>}
                 </Col>
               </Row>
               <Col sm='12' className='m-auto'>
                 <Message state={message}/>
                 <Form.Group>
                   <Form.Label>Lab Name</Form.Label>
                   <Input name={getFieldName('name')} placeholder='Enter Lab Name' disabled={!editing}/>
                 </Form.Group>
                 {guiEnabled ?
                   <></> :
                   <Form.Group>
                     <Form.Label>Upload Topology Image (Only jpg supported)</Form.Label>
                     <FileInput name={getFieldName('topology')} accept='image/jpg' disabled={!editing} />
                     {values.hasTopology && <a href={getUserLabTopologyUrl(values.id)} target='_blank'>View Current</a>}
                   </Form.Group>
                 }
                 <Form.Group>
                   <Form.Label>Upload PDF Readme (only pdfs supported)</Form.Label>
                   <FileInput name={getFieldName('readme')} accept='.pdf' disabled={!editing} />
                   {values.hasReadme && <a href={getUserLabReadmeUrl(values.id)} target='_blank'>View Current</a>}
                 </Form.Group>
                 <Form.Group>
                   <Form.Label>Lab Type <LabTypes /></Form.Label>
                   <DropdownInput name={getFieldName('type')} dropdownData={labTypeOptions} disabled={!editing}/>
                 </Form.Group>
                 <Form.Group>
                   <Form.Label>Lab Difficulty</Form.Label>
                   <DropdownInput name={getFieldName('labDifficulty')} dropdownData={labDifficultyOptions} disabled={!editing}/>
                 </Form.Group>
                 {guiEnabled ?
                     <LabEditorGUI
                       setGuiSchema={setGuiSchema}
                       disabled={!editing}
                     />
                  :
                   <>
                     <BridgeListEditor
                       bridgeTemplates={values.bridgeTemplates}
                       prefix={getFieldName('bridgeTemplates')}
                       editing={editing}
                       containsCoreRouter={vmTemplates.filter(vm => vm.isCoreRouter).length !== 0}
                     />
                     <VmTable
                       bridgeTemplates={values.bridgeTemplates}
                       prefix={getFieldName('labVms')}
                       vms={values.labVms}
                       editable={editing}
                       onOpenTemplateSelection={(index) => setSelectedVm(index)}
                       vmTemplateDictionary={vmTemplateDictionary}
                     />
                   </>
                 }

               </Col>
             </Form>
             <VmTemplateModal
               vmTemplates={vmTemplates}
               open={selectedVm !== undefined}
               onReloadVms={async () => setVmTemplates(await getVmTemplates())}
               onCancel={() => setSelectedVm(undefined)}
               onSelect={(vmTemplateId: number) => {
                 setFieldValue(`${getFieldName('labVms')}.${selectedVm}.${propertyOf<LabVmForm>('vmTemplateId')}` as any, vmTemplateId);
                 setSelectedVm(undefined);
               }}
             />
           </>
          )}

        </>
      )}
    </Formik>
  );
  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : message?.critical ? <Message state={message} /> : renderForm()}</Layout>;
}
