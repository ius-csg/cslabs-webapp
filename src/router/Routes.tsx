import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';
import Login from '../pages/Login/Login';
import {Layout} from '../pages/Layout/Layout';
import {NavigationBar} from '../components/NavigationBar/NavigationBar';
import Explore from '../pages/Explore/Explore';

const Routes = () => (
  <React.Fragment>
    <NavigationBar />
    <Layout>
      <Router history={History}>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route exact={true} path='/login' component={Login}/>
          <Route exact={true} path='/explore' component={Explore}/>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Layout>
  </React.Fragment>
);

export default Routes;
