import * as React from 'react';
// import {Component, FormEvent} from 'react';
import {Button, Form, Col, Alert, Row} from 'react-bootstrap';
import styles from './ResetPassword.module.scss';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
// import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';
import {PasswordRequirements} from '../../components/util/PasswordRequirements';
import {object, string} from 'yup';
import {useState} from 'react';
import {makeMessageState} from '../../util';
import {submitChangePasswordRequest} from '../../api';
import {Formik} from 'formik';

interface ChangePasswordRequestForm {
  currentPassword: string;
  newPassword: string;
}

const ChangePasswordRequestSchema = object<ChangePasswordRequestForm>({
  currentPassword: string().required('Required'),
  newPassword: string().required('Required')
});

const getFieldName = (prop: keyof ChangePasswordRequestForm) => prop;

export default function ResetPassword(){
  // state = {
  //   currentPass: '',
  //   password: '',
  //   confirmPass: ''
  // };

  // onCurrentPasswordChange = (event: FormEvent<HTMLInputElement>) => {
  //   this.setState({currentPass: event.currentTarget.value});
  // };
  // onPasswordChange = (event: FormEvent<HTMLInputElement>) => {
  //   this.setState({password: event.currentTarget.value});
  // };
  // onConfirmPassChange = (event: FormEvent<HTMLInputElement>) => {
  //   this.setState({confirmPass: event.currentTarget.value});
  // };
 // const isPassInvalid = () => {
 //    return this.state.password !== this.state.confirmPass;
 //  };

  // render() {
    const [messageState, setMessageState] = useState(makeMessageState());
    const [initialState] = useState<ChangePasswordRequestForm>({currentPassword: '', newPassword: ''});

    const onSubmit = async (form: ChangePasswordRequestForm) => {
      setMessageState({...messageState, message: ''});
      try {
        await submitChangePasswordRequest(form);
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
                  <Form.Control
                    type='password'
                    name={getFieldName('currentPassword')}
                    // onChange={this.onCurrentPasswordChange}
                    placeholder='Enter Current Password'
                  />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label column={true}>New Password</Form.Label>
                  <Form.Control
                    type='password'
                    name={getFieldName('newPassword')}
                    // onChange={this.onPasswordChange}
                    placeholder='Enter New Password'
                  />
                  <PasswordRequirements/>
                  {/*<PasswordStrength password={this.state.password}/>*/}
                </Form.Group>
                <Form.Group controlId='formBasicConfirmPassword'>
                  <Form.Label column={true}>Confirm Password</Form.Label>
                  <Form.Control
                    // isInvalid={this.isPassInvalid()}
                    type='password'
                    name={getFieldName('newPassword')}
                    // onChange={this.onConfirmPassChange}
                    placeholder='Confirm New Password'
                  />
                  <Form.Control.Feedback type='invalid'>
                    The password did not match, please try again.
                  </Form.Control.Feedback>
                  <Button className={styles['button']} variant='primary' type='submit'>Reset Password</Button>
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
