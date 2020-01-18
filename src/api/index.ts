import {AxiosResponse} from 'axios';
import {Module, UserModule} from '../types/Module';
import {User, UserWithToken} from '../types/User';
import {RegisterForm} from '../pages/Login/Login';
import {makeAxios} from '../components/util/Util';
import {Dispatch} from 'redux';
import {setCurrentUser} from '../redux/actions/entities/currentUser';
import {appDispatch} from '../redux/store';
import axiosRetry from 'axios-retry';

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
  return (await api.get<TicketResponse>('/virtual-machine/get-ticket/' + id)).data;
}

export async function startUpVm(id: number): Promise<string> {
  const retry = makeAxios();
  axiosRetry(retry, { retryDelay: (num) => 1000 * num, retries: 10});
  return (await retry.post<string>(`/virtual-machine/start/${id}`)).data;
}

export async function shutdownVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/shutdown/${id}`)).data;
}

export async function stopVm(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/stop/${id}`)).data;
}

export async function scrub(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/scrub/${id}`)).data;
}

export async function reset(id: number): Promise<string> {
  return (await api.post<string>(`/virtual-machine/reset/${id}`)).data;
}

export async function getModule(id: number) {
  return ( await api.get<Module>(`/modules/${id}`)).data;
}

export async function login(email: string, password: string): Promise<AxiosResponse<UserWithToken>> {
  const resp = await api.post<UserWithToken>('/user/authenticate', {email: email, password: password });
  setToken(resp.data.token);
  return resp;
}

export async function register(form: RegisterForm): Promise<AxiosResponse<UserWithToken>> {
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

export async function getUserModuleStatus(id: number) {
  return handleResponse( await api.get<string>(`/user-module/${id}/status`)).data;
}

export async function getUserLabVmStatuses(id: number) {
  return handleResponse( await api.get<{[key: number]: string}>(`/user-lab/${id}/status`)).data;
}
export async function startUserModule(id: string) {
  return handleResponse(await api.post<UserModule>(`/user-module/${id}`)).data;
}

export async function verifyEmail(type: string, code: string) {
  return handleResponse(await api.post<string>(`/user/verify-email`, {type: type, code: code}));
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
