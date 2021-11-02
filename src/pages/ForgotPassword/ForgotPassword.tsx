import * as React from 'react';
import {Form, Col, Alert, Row} from 'react-bootstrap';
import {forgotPassword} from '../../api';
import {Layout} from '../Layout/Layout';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {emailValidationMessage} from '../LoginRegisterPage/RegisterFormSchema';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {makeMessageState} from '../../util';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordSchema = object<ForgotPasswordForm>({
  email: string().email(emailValidationMessage).required('Required')
});

const getFieldName = (prop: keyof ForgotPasswordForm) => prop;

export default function ForgotPassword() {
  const [messageState, setMessageState] = React.useState(makeMessageState());
  const [initialState] = React.useState<ForgotPasswordForm>({email: ''});

  const onSubmit = async (form: ForgotPasswordForm) => {
    setMessageState({...messageState, message: ''});
    try {
      await forgotPassword(form.email);
      setMessageState({message: 'If your email exists, a confirmation was sent to your inbox!', variant: 'success'});
    } catch (e) {
      setMessageState({message: 'An Error occurred, try again later', variant: 'danger'});
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={initialState}
        validationSchema={ForgotPasswordSchema}
        onSubmit={onSubmit}
      >
        {({handleSubmit, isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <Col sm='6' style={{margin: 'auto'}}>
              <h2>Password Recovery</h2>
              <Form.Group as={Row}>
                <Form.Label column={true}>Email</Form.Label>
                <Input name={getFieldName('email')} placeholder='Enter Email'/>
              </Form.Group>
              <Form.Group as={Row}>
                <LoadingButton loading={isSubmitting} label='Send Confirmation'/>
              </Form.Group>
              <Row className='flex-column'>
                <Alert show={Boolean(messageState.message)} variant={messageState.variant}>{messageState.message}</Alert>
              </Row>
            </Col>
          </Form>
        )}
      </Formik>
    </Layout>
  );

}
