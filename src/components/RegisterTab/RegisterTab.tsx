import {Component} from 'react';
import React from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import PasswordStrength from '../AccountManagementLayout/PasswordStrength';
import {RegisterForm} from '../../pages/Login/Login';
import {BootstrapFormEvent} from '../util/Util';

export const isEmailValid = (email: string) => {
  return email.indexOf('@ius.edu') !== -1;
};

export const isPhoneNumberValid = (phoneNumber: string) => {
  return phoneNumber.length === 0 || /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNumber);
};

interface RegisterTabProps {
  form: RegisterForm;
  onInputChange: (event: BootstrapFormEvent) => void;
  submitted: boolean;
  emailTouched: boolean;
  errorMessage: string;
}

export class RegisterTab extends Component<RegisterTabProps> {

  isPassInvalid = () => {
    return this.props.form.password !== this.props.form.confirmPass;
  };

  render() {
    return (
    <React.Fragment>
      <Form.Group controlId='formBasicFirstName'>
        <Form.Label column={true}>First Name</Form.Label>
        <Form.Control required={true} name='firstName' type='text' value={this.props.form.firstName} onChange={this.props.onInputChange} placeholder='Enter First Name' />
      </Form.Group>
      <Form.Group controlId='formBasicLastName'>
        <Form.Label column={true}>Last Name</Form.Label>
        <Form.Control required={true} name='lastName' type='text' value={this.props.form.lastName} onChange={this.props.onInputChange} placeholder='Enter Last Name' />
      </Form.Group>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label column={true}>Email</Form.Label>
        <Form.Control
          required={true}
          isInvalid={this.props.emailTouched && !isEmailValid(this.props.form.schoolEmail)}
          name='schoolEmail'
          type='text'
          value={this.props.form.schoolEmail}
          onChange={this.props.onInputChange}
          placeholder='Enter School Email'
        />
        <Form.Control.Feedback type='invalid'>
          Please provide an email with @ius.edu
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId='formBasicGradTime'>
        <Form.Label column={true}>Graduation Year</Form.Label>
        <Form.Control name='gradYear' type='number' value={this.props.form.gradYear} onChange={this.props.onInputChange} placeholder='Enter Graduation Year' />
      </Form.Group>
      <Form.Group controlId='formBasicPhoneNumber'>
        <Form.Label column={true}>Phone Number</Form.Label>
        <Form.Control isInvalid={!isPhoneNumberValid(this.props.form.phoneNumber)} name='phoneNumber' type='tel' value={this.props.form.phoneNumber} pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' onChange={this.props.onInputChange} placeholder='Enter Phone Number' />
        <Form.Control.Feedback type='invalid'>
          Please type in format of XXX-XXX-XXXX
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label column={true}>Password</Form.Label>
        <Form.Control required={true} name='password' type='password' value={this.props.form.password} onChange={this.props.onInputChange} placeholder='Password' />
      </Form.Group>
      <PasswordStrength password={this.props.form.password}/>
      <Form.Group controlId='formBasicConfirmPassword'>
        <Form.Label column={true}>Confirm Password</Form.Label>
        <Form.Control
          isInvalid={this.isPassInvalid()}
          name='confirmPass'
          required={true}
          type='password'
          value={this.props.form.confirmPass}
          onChange={this.props.onInputChange}
          placeholder='Password'
        />
        <Form.Control.Feedback type='invalid'>
          The password did not match, please try again.
        </Form.Control.Feedback>
      </Form.Group>
      {this.props.errorMessage ?
        <Alert variant='danger'>{this.props.errorMessage}</Alert> : null}
      <Button variant='primary' type='submit'>Register</Button>
    </React.Fragment>
    );
  }
}
