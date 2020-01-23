import * as React from 'react';
import {useState} from 'react';
import {Form, Col, Row} from 'react-bootstrap';
import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';
import {RouteComponentProps} from 'react-router';
import {Layout} from '../Layout/Layout';
import {Formik} from 'formik';
import {object} from 'yup';
import {confirmPasswordValidator, passwordValidator} from '../LoginRegisterPage/RegisterFormSchema';
import Input from '../../components/util/Input/Input';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {CapsLockAlert} from '../../components/util/CapsLockAlert';
import {LoadingButton} from '../../util/LoadingButton';

type Props = RouteComponentProps<{ passwordRecoveryCode: string }>;

interface ConfirmForgotPasswordForm {
  password: string;
  confirmPass: string;
}

const ConfirmForgotPasswordSchema = object<ConfirmForgotPasswordForm>({
  password: passwordValidator,
  confirmPass: confirmPasswordValidator
});

const getFieldName = (prop: keyof ConfirmForgotPasswordForm) => prop;

export default function ConfirmForgotPassword(props: Props) {
  const [initialState] = useState<ConfirmForgotPasswordForm>({
    password: '',
    confirmPass: ''
  });

  const onSubmit = async (form: ConfirmForgotPasswordForm) => {
    const code = props.match.params.passwordRecoveryCode;
    console.log(code);
    // await forgotPassword(this.state.email);
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
            </Col>
          </Form>
        )}
      </Formik>
    </Layout>
  );

}
