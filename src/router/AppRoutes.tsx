import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Login from '../pages/LoginRegisterPage/LoginRegisterPage';
import Profile from '../pages/Profile/Profile';
import ResetEmail from '../pages/ResetEmail/ResetEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import {NavigationBar} from '../components/NavigationBar/NavigationBar';
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
import SystemMessageList from '../components/SystemMessageList/SystemMessageList';


const AppRoutes = () => (
  <div style={{display: 'flex', flexFlow: 'column', minHeight: '100vh'}}>
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      <NavigationBar />
        <SystemMessageList/>
      <Routes>
        <Route path={RoutePaths.home} element={<Home/>} />
        <Route path={RoutePaths.explore} element={<Explore/>} />
        <Route path={RoutePaths.login} element={<Login/>} />
        <Route path={RoutePaths.profile} element={<PrivateRoute component={Profile}/>} />
        <Route path={RoutePaths.resetEmail} element={<PrivateRoute component={ResetEmail}/>} />
        <Route path={RoutePaths.resetPassword} element={<PrivateRoute component={ResetPassword}/>} />
        <Route path={RoutePaths.myModules} element={<PrivateRoute component={MyModules}/>} />
        <Route path={RoutePaths.module} element={<PublicModule/>} />
        <Route path={RoutePaths.NewModule} element={<ModuleEditor/>} />
        <Route path={RoutePaths.EditModule} element={<ModuleEditor/>} />
        <Route path={RoutePaths.EditLab} element={<LabEditor/>} />
        <Route path={RoutePaths.NewLab} element={<LabEditor/>} />
        <Route path={RoutePaths.forgotPassword} element={<ForgotPassword/>} />
        <Route path={RoutePaths.contactUs} element={<Contact/>} />
        <Route path={RoutePaths.confirmForgotPassword} element={<ConfirmForgotPassword/>} />
        <Route path={RoutePaths.userModule} element={<UserModulePage/>} />
        <Route path={RoutePaths.userLab} element={<UserLabPage/>} />
        <Route path={RoutePaths.logout} element={<LogOut/>} />
        <Route path={RoutePaths.verifyEmail} element={<VerifyEmail/>} />
        <Route path={RoutePaths.sitePolicy} element={<SitePolicy/>} />
        <Route path={RoutePaths.contentCreator} element={<ModulesEditor/>} />
        <Route path={RoutePaths.adminPanel} element={<AdminPage/>} />
        <Route element={<NotFound/>} />
        <Route element={<ServiceUnavailable/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default AppRoutes;
