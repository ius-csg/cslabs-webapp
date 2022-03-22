import {useState} from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';
import {Navigate, useParams} from 'react-router';
import {Layout} from '../Layout/Layout';
import {Formik} from 'formik';
import {object} from 'yup';
import {makeConfirmPasswordValidator, passwordValidator} from '../LoginRegisterPage/RegisterFormSchema';
import Input from '../../components/util/Input/Input';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {CapsLockAlert} from '../../components/util/CapsLockAlert';
import {LoadingButton} from '../../util/LoadingButton';
import {confirmForgotPassword} from '../../api';
import {delay, handleAxiosError, makeMessageState} from '../../util';
import {RoutePaths} from '../../router/RoutePaths';
import {Message} from '../../util/Message';

interface ConfirmForgotPasswordForm {
  password: string;
  confirmPass: string;
}

const ConfirmForgotPasswordSchema = object<ConfirmForgotPasswordForm>({
  password: passwordValidator,
  confirmPass: makeConfirmPasswordValidator('password')
});

const getFieldName = (prop: keyof ConfirmForgotPasswordForm) => prop;

export default function ConfirmForgotPassword() {
  const params = useParams();
  const [initialState] = useState<ConfirmForgotPasswordForm>({
    password: '',
    confirmPass: ''
  });
  const [messageState, setMessageState] = useState(makeMessageState());
  const [redirect, setRedirect] = useState('');

  const onSubmit = async (form: ConfirmForgotPasswordForm) => {
    const code = params.passwordRecoveryCode;
    setMessageState({...messageState, message: ''});
    try {
      await confirmForgotPassword(form.password, code);
      setMessageState({message: 'Password changed!', variant: 'success'});
      await delay(1500);
      setRedirect(RoutePaths.login);
    } catch (e: any) {
      setMessageState({message: handleAxiosError(e), variant: 'danger'});
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={initialState}
        validationSchema={ConfirmForgotPasswordSchema}
        onSubmit={onSubmit}
      >
        {({handleSubmit, values, isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            {redirect ? <Navigate to={redirect} replace={true} /> : null}
            <Col sm='6' style={{margin: 'auto'}}>
              <h2>Reset Password</h2>
              <Form.Group as={Row} controlId='password'>
                <Form.Label column={true}>New Password</Form.Label>
                <Input name={getFieldName('password')} type='password' placeholder='Enter Password'/>
              </Form.Group>
              <CapsLockAlert/>
              <PasswordStrength password={values.password}/>
              <PasswordRequirements/>
              <Form.Group as={Row}>
                <Form.Label column={true}>Confirm Password</Form.Label>
                <Input name={getFieldName('confirmPass')} type='password' placeholder='Confirm Password'/>
              </Form.Group>
              <Form.Group as={Row}>
                <LoadingButton loading={isSubmitting} label='Change Password'/>
              </Form.Group>
              <Message state={messageState} />
            </Col>
          </Form>
        )}
      </Formik>
    </Layout>
  );

}
