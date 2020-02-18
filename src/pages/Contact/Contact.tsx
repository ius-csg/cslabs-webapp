import * as React from 'react';
import {FormEvent, useState} from 'react';
import {Form, Col} from 'react-bootstrap';
import styles from '../ResetPassword/ResetPassword.module.scss';
import {Layout} from '../Layout/Layout';
import {Formik} from 'formik';
import Input from '../../components/util/Input/Input';
import {ContactUsForm, ContactUsSchema} from './ContactUsSchema';
import {LoadingButton} from '../../util/LoadingButton';
import {makeMessageState} from '../../util';
import {Message} from '../../util/Message';
import {submitContactRequest} from '../../api';

const initialValues: ContactUsForm = {email: '', message: ''};

export default function ResetEmail() {
  const [files, setFiles] = useState<null | FileList>(null);
  const [messageState, setMessageState] = useState(makeMessageState());
  const onFileChange = (event: FormEvent<HTMLInputElement>) => {
    setFiles(event.currentTarget!.files);
  };

  const onSubmit = async (form: ContactUsForm) => {
    setMessageState({...messageState, message: ''});
    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('message', form.message);
      if (files !== null) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
          formData.append('screenshots', files[i]);
        }
      }
      await submitContactRequest(formData);
      setMessageState({message: 'Message sent!', variant: 'success'});
    } catch {
      setMessageState({message: 'An Error occurred, try again later', variant: 'danger'});
    }
  };


  return (
    <Layout>
      <h1>Contact Us</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactUsSchema}
        onSubmit={onSubmit}
      >
        {({handleSubmit, isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <Col sm='6' className='m-auto'>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label column={true}>Email</Form.Label>
                <Input name='email' placeholder='Enter Email' type='email' />
              </Form.Group>
              <Form.Group controlId='formBasicFile'>
                <Form.Label column={true}>Screenshot - Optional</Form.Label>
                <Form.Control
                  type='file'
                  accept='image/*'
                  onChange={onFileChange}
                  placeholder='Upload a screenshot'
                  multiple={true}
                />
              </Form.Group>
              <text>
                If this is a bug report, please tell us what you were attempting to do, what happened, and what was
                supposed to happen.
              </text>
              <Form.Group controlId='formBasicCurrentPassword'>
                <Form.Label column={true}>Message</Form.Label>
                <Input name='message' type='textarea' />
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

