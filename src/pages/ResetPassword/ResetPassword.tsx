import { useState } from 'react';
import { Form, Col, Alert, Row} from 'react-bootstrap';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {object, string} from 'yup';
import {handleAxiosError, makeMessageState} from '../../util';
import {submitChangePasswordRequest} from '../../api';
import {Formik} from 'formik';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {makeConfirmPasswordValidator, passwordValidator} from '../LoginRegisterPage/RegisterFormSchema';
import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';

interface ChangePasswordRequestForm {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}

const ChangePasswordRequestSchema = object<ChangePasswordRequestForm>({
  currentPassword: string().required('Required'),
  newPassword: passwordValidator,
  confirmPassword: makeConfirmPasswordValidator('newPassword')
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
      } catch (e: any) {
        setMessageState({message: handleAxiosError(e), variant: 'danger'});
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
          {({handleSubmit, isSubmitting, values}) => (
            <Form onSubmit={handleSubmit}>
              <Col sm='6'>
                <Form.Group controlId='formBasicCurrentPassword'>
                  <Form.Label column={true}>Current Password</Form.Label>
                  <Input type='password' name={getFieldName('currentPassword')} placeholder='Enter Current Password'/>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>New Password</Form.Label>
                  <Input type='password' name={getFieldName('newPassword')} placeholder='Enter New Password'/>
                  <PasswordStrength password={values.newPassword}/>
                  <PasswordRequirements/>
                </Form.Group>
                <Form.Group controlId='formBasicConfirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Input type='password' name={getFieldName('confirmPassword')} placeholder='Confirm New Password'/>
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
