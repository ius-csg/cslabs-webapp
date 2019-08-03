import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';
import Login from '../pages/Login/Login';

const Routes = () => (
  <Router history={History}>
    <Switch>
      <Route exact={true} path='/' component={Home}/>
      <Route exact={true} path='/Login' component={Login}/>
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
