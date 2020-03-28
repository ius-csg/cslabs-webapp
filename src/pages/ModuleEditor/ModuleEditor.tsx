import * as React from 'react';
import {useState} from 'react';
import {Form, Col} from 'react-bootstrap';
import styles from '../ResetPassword/ResetPassword.module.scss';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {ModuleEditorForm, ModuleEditorSchema} from './ModuleEditorSchema';
import {LoadingButton} from '../../util/LoadingButton';
import {handleAxiosError, 
  isBadRequest, makeMessageState} from '../../util';
import {Message} from '../../util/Message';
// import {submitContactRequest} from '../../api';
import { v4 as uuidv4 } from 'uuid';

const initialValues: ModuleEditorForm = {moduleName: '', shareLink: '', description: ''};
function generateLink(uuid:String)
{
  return 'https://iuscsg.org/cslabs/module/'+uuid //this may need to be automated somehow to not have hardcoded link before uuid.
}
export default function ModuleEditor() {
  const [messageState, setMessageState] = useState(makeMessageState());

  const onSubmit = async (form: ModuleEditorForm, formikHelpers: FormikHelpers<ModuleEditorForm>) => {
    setMessageState({...messageState, message: ''});
    try {
      const formData = new FormData();
      formData.append('moduleName', form.moduleName);
      formData.append('link', form.shareLink);
      formData.append('description', form.shareLink);
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
        {({handleSubmit, isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <Col sm='6' className='m-auto'>
              <Form.Group controlId=''>
                <Form.Label column={true}>Module Name</Form.Label>
                <Input name='moduleName' placeholder='Enter Module Name' type='message' />
              </Form.Group>
              <Form.Group controlId='formBasicMessage'>
                <Form.Label column={true}>Share This Link Once Done</Form.Label>
                <Input name='link' placeholder='' type='link' defaultValue={generateLink(uuidv4())} disabled/>
              </Form.Group>              
              <Form.Group controlId='formBasicMessage'>
                <Form.Label column={true}>Module Description</Form.Label>
                <Input name='description' placeholder='Description' type='textarea' />
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

