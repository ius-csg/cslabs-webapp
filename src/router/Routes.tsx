import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import History from './history';
import Login from '../pages/LoginRegisterPage/LoginRegisterPage';
import Profile from '../pages/Profile/Profile';
import ResetEmail from '../pages/ResetEmail/ResetEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Explore from '../pages/Explore/Explore';
import PublicModule from '../pages/PublicModule/PublicModule';
import {PrivateRoute} from '../components/PrivateRoute/PrivateRoute';
import {LogOut} from '../pages/Logout/Logout';
import {RoutePaths} from './RoutePaths';
import MyModules from '../pages/MyModules/MyModules';
import ModuleEditor from '../pages/ModuleEditor/ModuleEditor';
import UserModulePage from '../pages/UserModulePage/UserModulePage';
import {VerifyEmail} from '../pages/VerifyEmail/VerifyEmail';
import SitePolicy from '../pages/SitePolicy/SitePolicy';
import {UserLabPage} from '../pages/UserLabPage/UserLabPage';
import ConfirmForgotPassword from '../pages/ConfirmForgotPassword/ConfirmForgotPassword';
import Contact   from '../pages/Contact/ContactUs';
import ModulesEditor from '../pages/ModulesEditor/ModulesEditor';
import AdminPage from '../pages/AdminPanel/AdminPage';
import LabEditor from '../pages/LabEditor/LabEditor';
import ServiceUnavailable from '../pages/ServiceUnavailable/ServiceUnavailable';
import EmailVerification from '../pages/EmailVerification/EmailVerification';

const Routes = () => (
  <div style={{display: 'flex', flexFlow: 'column', minHeight: '100vh'}}>
    <Router history={History} >
      <Switch>
        <Route exact={true} path={RoutePaths.home} component={Home} redirectTo={RoutePaths.explore}/>
        <Route exact={true} path={RoutePaths.explore} component={Explore}/>
        <Route exact={true} path={RoutePaths.login} component={Login} redirectTo={RoutePaths.profile}/>
        <PrivateRoute exact={true} path={RoutePaths.profile} component={Profile}/>
        <PrivateRoute exact={true} path={RoutePaths.resetEmail} component={ResetEmail}/>
        <PrivateRoute exact={true} path={RoutePaths.resetPassword} component={ResetPassword}/>
        <PrivateRoute exact={true} path={RoutePaths.myModules} component={MyModules}/>
        <Route exact={true} path={RoutePaths.module} component={PublicModule}/>
        <Route exact={true} path={RoutePaths.NewModule} component={ModuleEditor}/>
        <Route exact={true} path={RoutePaths.EditModule} component={ModuleEditor}/>
        <Route exact={true} path={RoutePaths.EditLab} component={LabEditor}/>
        <Route exact={true} path={RoutePaths.NewLab} component={LabEditor}/>
        <Route exact={true} path={RoutePaths.forgotPassword} component={ForgotPassword}/>
        <Route exact={true} path={RoutePaths.contactUs} component={Contact}/>
        <Route exact={true} path={RoutePaths.confirmForgotPassword} component={ConfirmForgotPassword}/>
        <Route exact={true} path={RoutePaths.userModule} component={UserModulePage}/>
        <Route exact={true} path={RoutePaths.userLab} component={UserLabPage}/>
        <Route exact={true} path={RoutePaths.logout} component={LogOut}/>
        <Route exact={true} path={RoutePaths.verifyEmail} component={VerifyEmail}/>
        <Route exact={true} path={RoutePaths.sitePolicy} component={SitePolicy}/>
        <Route exact={true} path={RoutePaths.contentCreator} component={ModulesEditor}/>
        <Route exact={true} path={RoutePaths.adminPanel} component={AdminPage}/>
        <Route exact={true} path={RoutePaths.emailVerification} component={EmailVerification}/>
        <Route component={NotFound} />
        <Route component={ServiceUnavailable} />
      </Switch>
    </Router>
  </div>
);

export default Routes;
