import {LoginFormValues, LoginFormSchema} from './LoginFormSchema';
import {Alert, Form} from 'react-bootstrap';
import Input from '../../components/util/Input/Input';
import {LoadingButton} from '../../util/LoadingButton';
import {Formik} from 'formik';
import * as React from 'react';
import {useState} from 'react';
import {
  getErrorResponseMessage,
  isBadRequest,
  isServerError,
  isUnknownError
} from '../../components/util/Util';
import {login} from '../../api';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {connect} from 'react-redux';
import {handleKeyUp} from './LoginRegisterPage';
import {Link} from 'react-router-dom';

type Props = {
  onRedirect: (redirect: string) => void;
} &ReturnType<typeof mapDispatchToProps>;

const getFieldName = (prop: keyof LoginFormValues) => prop;

function LoginForm(props: Props) {
  const [capsLock, setCapsLockKey] = useState(false);
  const [initialValues] = useState<LoginFormValues>({
    schoolEmail: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const resp = await login(values.schoolEmail, values.password);
      props.actions.setCurrentUser(resp.data);
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
            <Input name={getFieldName('schoolEmail')} placeholder='Enter Email' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label column={true}>Password</Form.Label>
            <Input name={getFieldName('password')} onKeyUp={(e) => handleKeyUp(e, setCapsLockKey)} type='password' placeholder='Enter Password'/>
          </Form.Group>
          {capsLock ? <Alert variant='warning'>Your caps lock is on!</Alert> : null}
          <Link to='/ForgotPassword'> Forgot Password?<br/><br/></Link>
          {errorMessage ?
            <Alert variant='danger'>{errorMessage}</Alert> : null}
          <LoadingButton loading={isSubmitting} label='Login'/>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});

export default connect(undefined, mapDispatchToProps)(LoginForm);
