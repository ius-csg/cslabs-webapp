import * as React from 'react';
import { Form, Col, Alert, Row} from 'react-bootstrap';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {object, string} from 'yup';
import {useState} from 'react';
import {makeMessageState} from '../../util';
import {submitChangePasswordRequest} from '../../api';
import {Formik} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {confirmPasswordValidator, passwordValidator} from '../LoginRegisterPage/RegisterFormSchema';

interface ChangePasswordRequestForm {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}

const ChangePasswordRequestSchema = object<ChangePasswordRequestForm>({
  currentPassword: string().required('Required'),
  newPassword: passwordValidator,
  confirmPassword: confirmPasswordValidator
});

const getFieldName = (prop: keyof ChangePasswordRequestForm) => prop;

export default function ResetPassword(){
    const [messageState, setMessageState] = useState(makeMessageState());
    const [initialState] = useState<ChangePasswordRequestForm>({currentPassword: '', newPassword: '', confirmPassword: ''});

    const onSubmit = async (form: ChangePasswordRequestForm) => {
      setMessageState({...messageState, message: ''});
      try {
        await submitChangePasswordRequest({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        });
        setMessageState({message: 'Password successfully changed', variant: 'success'});
      } catch (e) {
        setMessageState({message: 'An Error occurred, try again later', variant: 'danger'});
      }
    };

    return (
      <AccountManagementLayout>
        <h2>Reset Password</h2>
        <Formik
          initialValues={initialState}
          validationSchema={ChangePasswordRequestSchema}
          onSubmit={onSubmit}
        >
          {({handleSubmit, isSubmitting}) => (
            <Form onSubmit={handleSubmit}>
              <Col sm='6'>
                <Form.Group controlId='formBasicCurrentPassword'>
                  <Form.Label column={true}>Current Password</Form.Label>
                  <Input type='password' name={getFieldName('currentPassword')} placeholder='Enter Current Password'/>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>New Password</Form.Label>
                  <Input type='password' name={getFieldName('newPassword')} placeholder='Enter New Password'/>
                  <PasswordRequirements/>
                </Form.Group>
                <Form.Group controlId='formBasicConfirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Input type='password' name={getFieldName('newPassword')} placeholder='Confirm New Password'/>
                </Form.Group>
                <Form.Group as={Row}>
                  <LoadingButton loading={isSubmitting} label='Reset Password'/>
                </Form.Group>
                <Row className='flex-column'>
                  <Alert show={Boolean(messageState.message)} variant={messageState.variant}>{messageState.message}</Alert>
                </Row>
              </Col>
            </Form>
          )}
        </Formik>
      </AccountManagementLayout>
    );
  // }
}
