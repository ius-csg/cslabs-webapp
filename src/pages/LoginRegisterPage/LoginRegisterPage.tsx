import * as React from 'react';
import {Component} from 'react';
import {Col, Tab, Tabs} from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {Layout} from '../Layout/Layout';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {RoutePaths} from '../../router/RoutePaths';
import LoginForm from './LoginForm';

type TabKeys = 'Login' | 'Register';

interface LoginPageState {
  activeTab: TabKeys;
  redirectUrl: string;
}

type LoginProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export function handleKeyUp(event: KeyboardEvent, setCapsLockKey: (state: boolean) => void) {
    setCapsLockKey(event.getModifierState('CapsLock'));
}

export class LoginRegisterPage extends Component<LoginProps, LoginPageState> {

  state: LoginPageState = {
    redirectUrl: '',
    activeTab: 'Login'
  };

  componentDidMount(): void {
    if (this.props.authenticated) {
      this.setState({redirectUrl: RoutePaths.profile});
    }
  }

  onTabSelect = (eventKey: string) => this.setState({activeTab: eventKey as TabKeys});

  renderRedirect() {
    if (this.state.redirectUrl.length !== 0) {
      return <Redirect to={this.state.redirectUrl} />;
    }
    return null;
  }

  render() {
    return (
      <Layout style={{marginBottom: '5rem'}}>
        {this.renderRedirect()}
        <h1>Login / Register</h1>
        <Col sm='6' style={{margin: 'auto'}}>
          <Tabs activeKey={this.state.activeTab} onSelect={this.onTabSelect} id='tabs' mountOnEnter={true} unmountOnExit={true}>
            <Tab eventKey='Login' title='Login'>
              <LoginForm onRedirect={redirect => this.setState({redirectUrl: redirect})}/>
            </Tab>
            <Tab eventKey='Register' title='Register'>
              <RegisterForm onRedirect={redirect => this.setState({redirectUrl: redirect})}/>
            </Tab>
          </Tabs>
        </Col>
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterPage);
