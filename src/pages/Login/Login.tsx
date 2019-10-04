import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Container, Form, Col, Tabs, Tab, Alert} from 'react-bootstrap';
import {isEmailValid, RegisterTab} from '../../components/RegisterTab/RegisterTab';
import {BootstrapFormEvent} from '../../components/util/Util';
import {login, register} from '../../api';
import {Redirect} from 'react-router';
import {LoadingButton} from '../../util/LoadingButton';

export interface RegisterForm extends LoginForm {
  firstName: string;
  lastName: string;
  gradYear: string;
  phoneNumber: string;
  confirmPass: string;
}

export interface LoginForm {
  schoolEmail: string;
  password: string;
}

type TabKeys = 'Login' | 'Register';

interface LoginPageState {
  activeTab: TabKeys;
  form: RegisterForm;
  redirectToProfile: boolean;
  errorMessage: string;
  submitted: boolean;
  emailTouched: boolean;
  submitting: boolean;
}

export default class Login extends Component<{}, LoginPageState> {

  state: LoginPageState = {
    redirectToProfile: false,
    activeTab: 'Login',
    errorMessage: '',
    submitted: false,
    submitting: false,
    emailTouched: false,
    form: {
      firstName: '',
      lastName: '',
      schoolEmail: '',
      gradYear: '',
      phoneNumber: '',
      confirmPass: '',
      password: ''
    }
  };

  onInputChange = (event: BootstrapFormEvent) => {
    const input: HTMLInputElement = event.currentTarget as unknown as HTMLInputElement;
    if (input.name === 'schoolEmail') {
      this.setState({emailTouched: true});
    }
    this.setState({form: {...this.state.form, [input.name]: event.currentTarget.value}});
  };

  onTabSelect = (eventKey: string) => this.setState({activeTab: eventKey as TabKeys});

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.setState({submitted: true});
    const form: HTMLFormElement = e.currentTarget as unknown as HTMLFormElement;
    if (!form.checkValidity() || !isEmailValid(this.state.form.schoolEmail)) {
      return;
    }
    try {
      this.setState({submitting: true});
      if (this.state.activeTab === 'Login') {
        await login(this.state.form.schoolEmail, this.state.form.password);
      } else if (this.state.activeTab === 'Register') {
        await register(this.state.form);
      }
      this.setState({redirectToProfile: true});
    } catch (e) {
      const req: XMLHttpRequest = e.request;
      if (req.status === 0) {
        this.setState({errorMessage: 'Could not make a connection!', submitting: false});
      } else if (req.status >= 500 && req.status < 600) {
        this.setState({errorMessage: 'A server error has occurred', submitting: false});
      }
    }
  };

  renderRedirect() {
    if (this.state.redirectToProfile) {
      return <Redirect to='/profile'/>;
    }
    return null;
  }

  render() {
    return (
      <Container>
        {this.renderRedirect()}
        <h1>Login / Register</h1>
        <Col sm='6' style={{margin: 'auto'}}>
          <Form onSubmit={this.onSubmit}>
            <Tabs activeKey={this.state.activeTab} onSelect={this.onTabSelect} id='tabs' mountOnEnter={true} unmountOnExit={true}>
              <Tab eventKey='Login' title='Login'>
                <Form.Group controlId='formBasicUsername'>
                  <Form.Label column={true}>Email</Form.Label>
                  <Form.Control name='schoolEmail' type='email' required={true} value={this.state.form.schoolEmail} onChange={this.onInputChange} placeholder='Enter Email'/>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label column={true}>Password</Form.Label>
                  <Form.Control name='password' type='password' required={true} value={this.state.form.password} onChange={this.onInputChange} placeholder='Password'/>
                </Form.Group>
                <Form.Group controlId='formBasicCheckbox'>
                  <Form.Check type='checkbox' label='Remember Me'/>
                </Form.Group>
                {this.state.errorMessage ?
                  <Alert variant='danger'>{this.state.errorMessage}</Alert> : null}
                  <LoadingButton loading={this.state.submitting} label='Login'/>
              </Tab>
              <Tab eventKey='Register' title='Register'>
                <RegisterTab
                  submitting={this.state.submitting}
                  errorMessage={this.state.errorMessage}
                  emailTouched={this.state.emailTouched}
                  submitted={this.state.submitted}
                  onInputChange={this.onInputChange}
                  form={this.state.form}
                />
              </Tab>
            </Tabs>
          </Form>
        </Col>
      </Container>
    );
  }
}
