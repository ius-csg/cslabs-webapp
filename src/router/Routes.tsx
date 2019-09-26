import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import ResetEmail from '../pages/ResetEmail/ResetEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import {NavigationBar} from '../components/NavigationBar/NavigationBar';

const Routes = () => (
  <React.Fragment>
    <NavigationBar />
    <Layout>
	  <Router history={History}>
	    <Switch>
	      <Route exact={true} path='/' component={Home}/>
	      <Route exact={true} path='/login' component={Login}/>
	      <Route exact={true} path='/profile' component={Profile}/>
	      <Route exact={true} path='/resetemail' component={ResetEmail}/>
	      <Route exact={true} path='/resetpassword' component={ResetPassword}/>
	      <Route component={NotFound} />
	    </Switch>
	  </Router>
    </Layout>
  </React.Fragment>
);

export default Routes;
