import { useState, useEffect } from 'react';
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
import {useQuery} from '../../components/util/Util';

type TabKeys = 'Login' | 'Register';

type LoginProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> ;

export function LoginRegisterPage({authenticated}: LoginProps) {
  const redirectTo= useQuery<{redirectTo: string | undefined}>().redirectTo;
  const [redirect, setRedirect] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabKeys>('Login');
  const onRedirect = (r: string) => setRedirect(redirectTo ? redirectTo : r);

  useEffect(() => {
    if(authenticated) { onRedirect(RoutePaths.profile); }
  }, [authenticated]);

  const onTabSelect = (eventKey: string | null) => setActiveTab(eventKey as TabKeys);
  const RenderRedirect = () => redirect.length !== 0 ? <Redirect to={redirect} />: null;

  return (
    <Layout style={{marginBottom: '5rem'}}>
      <RenderRedirect />
      <h1>Login / Register</h1>
      <Col sm='6' style={{margin: 'auto'}}>
        <Tabs activeKey={activeTab} onSelect={onTabSelect} id='tabs' mountOnEnter={true} unmountOnExit={true}>
          <Tab eventKey='Login' title='Login'>
            <LoginForm onRedirect={onRedirect}/>
          </Tab>
          <Tab eventKey='Register' title='Register'>
            <RegisterForm onRedirect={onRedirect}/>
          </Tab>
        </Tabs>
      </Col>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: setCurrentUser}, dispatch)});
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterPage);
