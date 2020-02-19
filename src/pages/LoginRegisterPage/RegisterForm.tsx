import {useState} from 'react';
import React from 'react';
import {Alert, Form} from 'react-bootstrap';
import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';
import {LoadingButton} from '../../util/LoadingButton';
import {RegisterFormSchema, RegisterFormValues} from './RegisterFormSchema';
import Input from '../../components/util/Input/Input';
import CheckBoxInput from '../../components/util/CheckBoxInput/CheckBoxInput';
import {register} from '../../api';
import {Formik} from 'formik';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {connect} from 'react-redux';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {CapsLockAlert} from '../../components/util/CapsLockAlert';
import {getErrorResponseMessage, isBadRequest, isServerError, isUnknownError} from '../../util';

type Props  = {
  onRedirect: (redirect: string) => void;
} & ReturnType<typeof mapDispatchToProps>;

const getFieldName = (prop: keyof RegisterFormValues) => prop;

function RegisterForm(props: Props) {
  const [initialValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    gradYear: '',
    phoneNumber: '',
    confirmPass: '',
    password: '',
    acceptedTerms: '' as any
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const resp = await register(values);
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
      validationSchema={RegisterFormSchema}
      onSubmit={onSubmit}
    >
      {({handleSubmit, isSubmitting, values}) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='firstName'>
            <Form.Label column={true}>First Name</Form.Label>
            <Input name={getFieldName('firstName')} placeholder='Enter First Name'/>
          </Form.Group>
          <Form.Group controlId='lastName'>
            <Form.Label column={true}>Last Name</Form.Label>
            <Input name={getFieldName('lastName')} placeholder='Enter Last Name'/>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label column={true}>Email - We will send you an email verification</Form.Label>
            <Input name={getFieldName('email')} placeholder='Enter Email'/>
          </Form.Group>
          <Form.Group controlId='gradYear'>
            <Form.Label column={true}>Graduation Year - Optional</Form.Label>
            <Input name={getFieldName('gradYear')} type='number' placeholder='Enter Graduation Year'/>
          </Form.Group>
          <Form.Group controlId='phoneNumber'>
            <Form.Label column={true}>Phone Number - Optional</Form.Label>
            <Input name={getFieldName('phoneNumber')} type='tel' placeholder='Enter Phone Number'/>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label column={true}>Password</Form.Label>
            <Input name={getFieldName('password')} type='password' placeholder='Enter Password'/>
          </Form.Group>
          <CapsLockAlert/>
          <PasswordStrength password={values.password}/>
          <PasswordRequirements/>
          <Form.Group controlId='confirmPass'>
            <Form.Label column={true}>Confirm Password</Form.Label>
            <Input name={getFieldName('confirmPass')} type='password' placeholder='Confirm Password'/>
          </Form.Group>
          <Form.Group controlId='acceptedTerms'>
            <CheckBoxInput
              name={getFieldName('acceptedTerms')}
              label={<h6>I agree to the <a href='/policy'>terms and conditions</a>.</h6>}
            />
          </Form.Group>
          <Alert show={Boolean(errorMessage)} variant='danger'>{errorMessage}</Alert>
          <LoadingButton loading={isSubmitting} label='Register'/>
        </Form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});

export default connect(undefined, mapDispatchToProps)(RegisterForm);
