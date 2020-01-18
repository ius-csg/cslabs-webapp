import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Form, Col, Tabs, Tab, Alert} from 'react-bootstrap';
import {isSchoolEmailValid, RegisterTab} from '../../components/RegisterTab/RegisterTab';
import {
  BootstrapFormEvent,
  ErrorResponse, getErrorResponseMessage, getResponseData,
  isBadRequest,
  isServerError,
  isUnknownError,
} from '../../components/util/Util';
import {login, register} from '../../api';
import {Redirect} from 'react-router';
import {LoadingButton} from '../../util/LoadingButton';
import {connect} from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {UserWithToken} from '../../types/User';
import {AxiosResponse} from 'axios';
import {isPassValid} from '../../util';
import {Layout} from '../Layout/Layout';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {RoutePaths} from '../../router/RoutePaths';
export interface RegisterForm extends LoginForm {
  firstName: string;
  lastName: string;
  gradYear: string;
  phoneNumber: string;
  confirmPass: string;
  personalEmail: string;
}

export interface LoginForm {
  schoolEmail: string;
  password: string;
}

type TabKeys = 'Login' | 'Register';

export type UserErrorResponse = ErrorResponse<RegisterForm>;

interface LoginPageState {
  activeTab: TabKeys;
  form: RegisterForm;
  redirectUrl: string;
  errorMessage: string;
  submitted: boolean;
  emailTouched: boolean;
  submitting: boolean;
  errors?: UserErrorResponse;
  shouldHide: boolean,
}

type LoginProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export class Login extends Component<LoginProps, LoginPageState> {

  state: LoginPageState = {
    redirectUrl: '',
    activeTab: 'Login',
    errorMessage: '',
    submitted: false,
    submitting: false,
    emailTouched: false,
    shouldHide: false,
    
    form: {
      firstName: '',
      lastName: '',
      schoolEmail: '',
      personalEmail: '',
      gradYear: '',
      phoneNumber: '',
      confirmPass: '',
      password: ''
    }
  };
  componentDidMount(): void {
    if (this.props.authenticated) {
      this.setState({redirectUrl: RoutePaths.profile});
    }
  }
  onCapsChange()
  {
    this.setState({shouldHide: true})
  }
  onInputChange = (event: BootstrapFormEvent) => {
    const input: HTMLInputElement = event.currentTarget as unknown as HTMLInputElement;
    if (input.name === 'schoolEmail') {
      this.setState({emailTouched: true});
    }
    // When the user presses any key on the keyboard, run the function
    input.addEventListener("keyup", function(this: any, event: any) {
      if(event.code === "CapsLock")
      {
        if(event.getModifierState("CapsLock") === true)
        {
          this.setState({shouldHide: true})
        }
        if(event.getModifierState("CapsLock") === false)
        {
          this.setState({shouldHide: false})
        }
      }
    }.bind(this));
    this.setState({form: {...this.state.form, [input.name]: event.currentTarget.value}});
  };

  onTabSelect = (eventKey: string) => this.setState({activeTab: eventKey as TabKeys, errors: undefined, errorMessage: ''});

  async makeRequest(): Promise<AxiosResponse<UserWithToken>> {
    if (this.state.activeTab === 'Login') {
      return await login(this.state.form.schoolEmail, this.state.form.password);
    } else {
      return await register(this.state.form);
    }
  }

  isFormInvalid(form: HTMLFormElement) {
    return(!form.checkValidity() ||
      ((!isSchoolEmailValid(this.state.form.schoolEmail) ||
        (!isPassValid(this.state.form.password))) &&
        this.state.activeTab === 'Register')
    );
    
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    this.setState({submitted: true});
    const form: HTMLFormElement = e.currentTarget as unknown as HTMLFormElement;
    if (this.isFormInvalid(form)) {
      return;
    }
    if (this.state.form.schoolEmail.length === 0 && this.state.form.personalEmail.length === 0) {
      this.setState({errorMessage: 'At least one email address is required'});
      return;
    }
    await this.trySubmit();
  };

  async trySubmit() {
    try {
      this.setState({submitting: true});
      const resp = await this.makeRequest();
      this.props.actions.setCurrentUser(resp.data);
      this.setState({redirectUrl: '/my-modules'}, () => console.log(this.state));
    } catch (e) {
      if (isBadRequest(e)) {
        this.setState({errorMessage: getErrorResponseMessage(e), submitting: false, errors: getResponseData(e)});
      } else if (isUnknownError(e) || isServerError(e)) {
        this.setState({errorMessage: isUnknownError(e) ? 'Could not make a connection!' : 'A server error has occurred', submitting: false});
      }
    }
  }

  renderRedirect() {
    if (this.state.redirectUrl.length !== 0) {
      return <Redirect to={this.state.redirectUrl} />;
    }
    return null;
  }

  render() {
    return (
      <Layout>
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
                {this.state.shouldHide ?
                  <Alert variant='danger'>Your caps lock is on!</Alert> : null}
                {/*<Form.Group controlId='formBasicCheckbox'>*/}
                {/*  <Form.Check type='checkbox' label='Remember Me'/>*/}
                {/*</Form.Group>*/}
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
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
