import * as React from 'react';
import {Form, Col} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {Formik, FormikHelpers} from 'formik';
import Input from '../../components/util/Input/Input';
import {ContactUsForm, ContactUsSchema} from './ContactUsSchema';
import {LoadingButton} from '../../util/LoadingButton';
import {handleAxiosError, isBadRequest, makeMessageState} from '../../util';
import {Message} from '../../util/Message';
import {submitContactRequest} from '../../api';
import {FileInput} from '../../components/util/FileInput';

const initialValues: ContactUsForm = {email: '', message: '', screenshots: null};

export default function ContactUs() {
  const [messageState, setMessageState] = React.useState(makeMessageState());

  const onSubmit = async (form: ContactUsForm, formikHelpers: FormikHelpers<ContactUsForm>) => {
    setMessageState({...messageState, message: ''});
    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('message', form.message);
      const files = form.screenshots;
      if (files !== null) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
          formData.append('screenshots', files[i]);
        }
      }
      await submitContactRequest(formData);
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
                <Form.Label column={true}>Screenshots - Optional</Form.Label>
                <FileInput name='screenshots' accept='image/*' multiple={true}/>
              </Form.Group>
              <p>
                If this is a bug report, please tell us what you were attempting to do, what happened, and what was
                supposed to happen.
              </p>
              <Form.Group controlId='formBasicCurrentPassword'>
                <Form.Label column={true}>Message</Form.Label>
                <Input name='message' type='textarea' />
              </Form.Group>
              <LoadingButton loading={isSubmitting} type='submit' label='Submit'/>
              <Message state={messageState} />
            </Col>
          </Form>
        )}
      </Formik>
    </Layout>
  );

}

