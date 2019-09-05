import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';
import Login from '../pages/Login/Login';
import {PublicModule} from '../pages/public-module/Public-module';

const Routes = () => (
  <Router history={History}>
    <Switch>
      <Route exact={true} path='/' component={Home}/>
      <Route exact={true} path='/Login' component={Login}/>
      <Route exact={true} path='/Public-module' component={PublicModule}/>
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
