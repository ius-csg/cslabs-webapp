import {AxiosResponse} from 'axios';
import {Module} from '../types/Module';
import {User, UserWithToken} from '../types/User';
import {makeAxios} from '../components/util/Util';
import {Dispatch} from 'redux';
import {setCurrentUser} from '../redux/actions/entities/currentUser';
import {appDispatch} from '../redux/store';
import axiosRetry from 'axios-retry';
import {RegisterFormValues} from '../pages/LoginRegisterPage/RegisterFormSchema';
import {UserModule} from '../types/UserModule';
import {InitializationStatus, UserLab} from '../types/UserLab';

let api = makeAxios();

function setToken(token?: string) {
  if (token) {
    localStorage.setItem('token', token);
  }
  api = makeAxios(token);
}

export interface TicketResponse {
  port: number;
  ticket: string;
  cert: string;
  upid: string;
  user: string;
  url: string;
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser(null));
};

export async function acquireTicket(id: number): Promise<TicketResponse> {
  return (await api.get<TicketResponse>(`/virtual-machine/${id}/get-ticket`)).data;
}

export async function startUpVm(id: number): Promise<string> {
  const retry = makeAxios();
  axiosRetry(retry, { retryDelay: (num) => 1000 * num, retries: 10});
  return (await retry.post<string>(`/virtual-machine/${id}/start`)).data;
}

export async function shutdownVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/shutdown`)).data;
}

export async function stopVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/stop`)).data;
}

export async function scrubVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/scrub`)).data;
}

export async function resetVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/${id}/reset`)).data;
}

export async function getModule(id: number) {
  return ( await api.get<Module>(`/modules/${id}`)).data;
}

export async function login(email: string, password: string): Promise<AxiosResponse<UserWithToken>> {
  const resp = await api.post<UserWithToken>('/user/authenticate', {email: email, password: password });
  setToken(resp.data.token);
  return resp;
}
export async function forgotPassword(email: string) {
  return api.post<string>(`/user/forgot-password/${encodeURIComponent(email)}`);
}

export function confirmForgotPassword(code: string, password: string) {
  return api.post<string>(`/user/confirm-forgot-password`, {passwordRecoveryCode: code, newPassword: password});
}

export async function register(form: RegisterFormValues): Promise<AxiosResponse<UserWithToken>> {
  const resp = await api.post<UserWithToken>('/user/register', form);
  setToken(resp.data.token);
  return resp;
}
export async function getCurrentUserFromServer() {
  return ( await api.get<User>('/user/current')).data;
}

export async function getPublicModules() {
  return handleResponse( await api.get<Module[]>(`/module`)).data;
}
export async function getModuleByPrivateCode(code: string): Promise<Module> {
  return handleResponse( await api.get<Module>(`/module/code/${code}`)).data;
}

export async function getPublicModule(id: number) {
  return handleResponse( await api.get<Module>(`/module/${id}`)).data;
}

export async function getUserModules() {
  return handleResponse( await api.get<UserModule[]>(`/user-module/`)).data;
}
export async function getUserModule(id: number) {
  return handleResponse( await api.get<UserModule>(`/user-module/${id}`)).data;
}

export async function getUserLab(id: number) {
  return handleResponse( await api.get<UserLab>(`/user-lab/${id}`)).data;
}

export async function startUserLab(id: number) {
  return handleResponse( await api.post<UserLab>(`/user-lab/${id}/start`)).data;
}

export function getUserLabTopologyUrl(id: number) {
  return  `${process.env.REACT_APP_API_URL}/user-lab/${id}/topology`;
}

export function getUserLabReadmeUrl(id: number) {
  return  `${process.env.REACT_APP_API_URL}/user-lab/${id}/readme`;
}

export async function getUserLabInitializationStatus(id: number) {
  return handleResponse( await api.get<InitializationStatus>(`/user-lab/${id}/initialization-status`)).data;
}

export async function getUserLabVmStatuses(id: number) {
  return handleResponse( await api.get<{[key: number]: string}>(`/user-lab/${id}/status`)).data;
}
export async function startUserModule(id: string) {
  return handleResponse(await api.post<UserModule>(`/user-module/${id}`)).data;
}

export async function verifyEmail(code: string) {
  return handleResponse(await api.post<string>(`/user/verify-email`, {code: code}));
}

function handleResponse<T>(response: AxiosResponse<T>) {
  if (response.status < 400) {
    return response;
  }
  if (response.status === 401) {
    appDispatch(logout());
  }
  throw response;
}
