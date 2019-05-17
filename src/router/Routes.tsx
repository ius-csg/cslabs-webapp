import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';

const Routes = () => (
  <Router history={History}>
    <Switch>
      <Route exact={true} path='/' component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
