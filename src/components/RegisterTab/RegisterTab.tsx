import {Component} from 'react';
import React from 'react';
import {Alert, Form} from 'react-bootstrap';
import PasswordStrength from '../AccountManagementLayout/PasswordStrength';
import {RegisterForm} from '../../pages/Login/Login';
import {BootstrapFormEvent} from '../util/Util';
import {LoadingButton} from '../../util/LoadingButton';
import {isPassValid} from '../../util';

export const isSchoolEmailValid = (email: string) => {
  return email.length === 0 || email.indexOf('@ius.edu') !== -1 || email.indexOf('@iu.edu') !== -1;
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

interface RegisterTabState {
  personalEmailTouched: boolean;
  agreedToTerms: boolean;
  boxChanged: boolean;
}

export class RegisterTab extends Component<RegisterTabProps, RegisterTabState> {

  state = {
    personalEmailTouched: false,
    agreedToTerms: false,
    boxChanged: false
  };
  isPassInvalid = () => {
    return this.props.form.password !== this.props.form.confirmPass;
  };

  onPolicyBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      agreedToTerms: !this.state.agreedToTerms
    });
    this.setState({
      boxChanged: true
    });
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
          Please provide an email with @ius.edu or @iu.edu
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
        <Form.Control
          required={true}
          name='password'
          type='password'
          value={this.props.form.password}
          onChange={this.props.onInputChange}
          isInvalid={!isPassValid(this.props.form.password)}
          placeholder='Password'
        />
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
      <Form.Group controlId='formBasicCheckbox'>
        <Form.Check required={true} type='checkbox'>
          <Form.Check.Input isInvalid={!this.state.agreedToTerms && this.state.boxChanged} onChange={this.onPolicyBoxChange}/>
          <Form.Check.Label><h6>I agree to the <a href='/policy'>terms and conditions</a>.</h6></Form.Check.Label>
          <Form.Control.Feedback type='invalid'>You must agree before submitting.</Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
      {this.props.errorMessage ?
        <Alert variant='danger'>{this.props.errorMessage}</Alert> : null}
      <p>*Note: We will send you an email verification for each email entered.</p>
      <LoadingButton loading={this.props.submitting} label='Register'/>
    </React.Fragment>
    );
  }
}
