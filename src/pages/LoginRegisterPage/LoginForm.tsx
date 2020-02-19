import {LoginFormValues, LoginFormSchema} from './LoginFormSchema';
import {Alert, Form} from 'react-bootstrap';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {Formik} from 'formik';
import * as React from 'react';
import {useState} from 'react';
import {login} from '../../api';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {CapsLockAlert} from '../../components/util/CapsLockAlert';
import {getErrorResponseMessage, isBadRequest, isServerError, isUnknownError} from '../../util';

type Props = {
  onRedirect: (redirect: string) => void;
} &ReturnType<typeof mapDispatchToProps>;

const getFieldName = (prop: keyof LoginFormValues) => prop;

function LoginForm(props: Props) {
  const [initialValues] = useState<LoginFormValues>({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const resp = await login(values.email, values.password);
      await props.actions.setCurrentUser(resp.data);
      props.onRedirect('/my-modules');
    } catch (e) {
      if (isBadRequest(e)) {
        setErrorMessage(getErrorResponseMessage(e));
      } else if (isUnknownError(e) || isServerError(e)) {
        setErrorMessage(isUnknownError(e) ? 'Could not make a connection!' : 'A server error has occurred');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting}) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='schoolEmail'>
            <Form.Label column={true}>Email</Form.Label>
            <Input name={getFieldName('email')} placeholder='Enter Email' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label column={true}>Password</Form.Label>
            <Input name={getFieldName('password')} type='password' placeholder='Enter Password'/>
          </Form.Group>
          <CapsLockAlert />
          <Link to='/ForgotPassword'> Forgot Password?<br/><br/></Link>
          <Alert show={Boolean(errorMessage)} variant='danger'>{errorMessage}</Alert>
          <LoadingButton loading={isSubmitting} label='Login'/>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});

export default connect(undefined, mapDispatchToProps)(LoginForm);
