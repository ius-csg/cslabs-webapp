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
// import Explore from '../pages/Explore/Explore';
import PublicModule from '../pages/PublicModule/PublicModule';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute';
import {LogOut} from '../pages/Logout/Logout';
import {RoutePaths} from './RoutePaths';
import MyModules from '../pages/MyModules/MyModules';
import {UserLabPage} from '../pages/UserLabPage/UserLabPage';
import Labs from '../pages/Labs/Labs';
import UserModulePage from '../pages/UserModulePage/UserModulePage';

const Routes = () => (
  <div style={{display: 'flex', flexFlow: 'column', minHeight: '100vh'}}>
    <Router history={History} >
      <NavigationBar />
      <Switch>
        <Route exact={true} path={RoutePaths.home} component={Home}/>
        <Route exact={true} path={RoutePaths.login} component={Login} redirectTo={RoutePaths.profile}/>
        <PrivateRoute exact={true} path={RoutePaths.profile} component={Profile}/>
        <PrivateRoute exact={true} path={RoutePaths.resetEmail} component={ResetEmail}/>
        <PrivateRoute exact={true} path={RoutePaths.resetPassword} component={ResetPassword}/>
        {/*<Route exact={true} path={RoutePaths.explore} component={Explore}/>*/}
        <PrivateRoute exact={true} path={RoutePaths.myModules} component={MyModules}/>
        <PrivateRoute path={RoutePaths.modules} component={PublicModule}/>
        <Route exact={true} path={RoutePaths.userModule} component={UserLabPage}/>
        <PrivateRoute exact={true} path={RoutePaths.userModuleLabs} component={UserModulePage} />
        <Route exact={true} path={RoutePaths.logout} component={LogOut}/>
        <PrivateRoute exact={true} path={RoutePaths.lab} component={Labs} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
