import * as React from 'react';
import {useState} from 'react';
import {Form, Col} from 'react-bootstrap';
import styles from '../ResetPassword/ResetPassword.module.scss';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {ModuleEditorSchema} from './ModuleEditorSchema';
import {LoadingButton} from '../../util/LoadingButton';
import {
  handleAxiosError,
  isBadRequest, makeMessageState, propertyOf
} from '../../util';
import {Message} from '../../util/Message';
import {ModuleForm} from '../../types/editorTypes';
import {makeModuleForm} from '../../factories';
import {objectToFormData} from 'object-to-formdata';
import {DropdownInput} from '../../components/util/DropdownInput/DropdownInput';
import {DropdownOption} from '../../components/util/SearchableDropdown/SearchableDropdown';
import {ModuleType} from '../../types/Module';


const moduleTypeOptions: DropdownOption<ModuleType>[] = [
  {value: 'SingleUser', label: 'Single User'},
  {value: 'MultiUser', label: 'Multi User'}
];

const generateLink = (uuid: string) => `${process.env.REACT_APP_URL!}/module/${uuid}`;


const initialValues: ModuleForm = makeModuleForm();

export default function ModuleEditor() {
  const [messageState, setMessageState] = useState(makeMessageState());

  const onSubmit = async (form: ModuleForm, formikHelpers: FormikHelpers<ModuleForm>) => {
    setMessageState({...messageState, message: ''});
    try {

      // @ts-ignore
      const formData = objectToFormData(form);
      // await submitContactRequest(formData);
      setMessageState({message: 'Message sent!', variant: 'success'});
    } catch(e) {
      if(isBadRequest(e)) {
        formikHelpers.setErrors(e.response.data);
      } else {
        setMessageState({message: handleAxiosError(e), variant: 'danger'});
      }

    }
  };

  return (
    <Layout>
      <h1>Module Editor</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ModuleEditorSchema}
        onSubmit={onSubmit}
      >
        {({handleSubmit, isSubmitting, values}) => (
          <Form onSubmit={handleSubmit}>
            <Col sm='12' className='m-auto'>
              <Form.Group>
                <Form.Label column={true}>Module Name</Form.Label>
                <Input name={propertyOf<ModuleForm>('name')} placeholder='Enter Module Name' />
              </Form.Group>
              <Form.Group>
                <Form.Label column={true}>Share this link once saved</Form.Label>
                <a target='_blank' rel='noopener' href={generateLink(values.specialCode)}>{generateLink(values.specialCode)}</a>
              </Form.Group>
              <Form.Group>
                <Form.Label column={true}>Module Description</Form.Label>
                <Input name={propertyOf<ModuleForm>('description')} placeholder='Description' type='textarea' />
              </Form.Group>
              <Form.Group>
                <Form.Label column={true}>Type</Form.Label>
                <DropdownInput name={propertyOf<ModuleForm>('type')} dropdownData={moduleTypeOptions} />
              </Form.Group>
              <LoadingButton loading={isSubmitting} className={styles['button']} type='submit' label='Submit'/>
              <Message state={messageState} />
            </Col>
          </Form>
        )}
      </Formik>
    </Layout>
  );

}

