import {Component} from 'react';
import React from 'react';
import {Alert, Form} from 'react-bootstrap';
import PasswordStrength from '../AccountManagementLayout/PasswordStrength';
import {RegisterForm} from '../../pages/Login/Login';
import {BootstrapFormEvent} from '../util/Util';
import {LoadingButton} from '../../util/LoadingButton';
import {isPassValid} from '../../util';

export const isSchoolEmailValid = (email: string) => {
  return email.length === 0 || email.indexOf('@ius.edu') !== -1;
};

export const isEmailValid = (email: string) => {
  return email.length === 0 || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

export const isPhoneNumberValid = (phoneNumber: string) => {
  return phoneNumber.length === 0 || /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNumber);
};

interface RegisterTabProps {
  form: RegisterForm;
  onInputChange: (event: BootstrapFormEvent) => void;
  submitted: boolean;
  submitting: boolean;
  emailTouched: boolean;
  errorMessage: string;
}

export class RegisterTab extends Component<RegisterTabProps, {personalEmailTouched: boolean}> {

  state = {
    personalEmailTouched: false
  };

  isPassInvalid = () => {
    return this.props.form.password !== this.props.form.confirmPass;
  };

  onPersonalEmailChange = (event: BootstrapFormEvent) => {
    this.setState({
      personalEmailTouched: true
    });
    this.props.onInputChange(event);
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
        <Form.Label column={true}>School Email (Either personal or school email is required)</Form.Label>
        <Form.Control
          isInvalid={this.props.emailTouched && !isSchoolEmailValid(this.props.form.schoolEmail)}
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
      <Form.Group controlId='formBasicEmail'>
        <Form.Label column={true}>Personal Email (Either personal or school email is required)</Form.Label>
        <Form.Control
          isInvalid={this.state.personalEmailTouched && !isEmailValid(this.props.form.personalEmail)}
          name='personalEmail'
          type='text'
          value={this.props.form.personalEmail}
          onChange={this.onPersonalEmailChange}
          placeholder='Enter Personal Email'
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a valid email address
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
        <p>For password security we use zxcvbn which checks your password based on crackability.
          There are not any specific guidelines, but we would recommend the password be at least 12 characters.
          Creating your password out of a series of words is also easier to remember and harder to crack (cup phone dog)
          than a single password of a complex word (H1st0r13s).
          Use the crack-timer to gauge how strong your password is.</p>
        <Form.Control
          required={true}
          name='password'
          type='password'
          value={this.props.form.password}
          onChange={this.props.onInputChange}
          isInvalid={!isPassValid(this.props.form.password)}
          placeholder='Password'
        />
      </Form.Group><PasswordStrength password={this.props.form.password}/>
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
      <LoadingButton loading={this.props.submitting} label='Register'/>
    </React.Fragment>
    );
  }
}
