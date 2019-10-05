import axios, {AxiosResponse} from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';
import {Module} from '../types/Module';
import {User, UserWithToken} from '../types/User';
import {RegisterForm} from '../pages/Login/Login';
import {makeAxios} from '../components/util/Util';
import jwt_decode from 'jwt-decode';
import {AuthToken} from '../types/AuthToken';

let api = makeAxios();

function setToken(token?: string) {
  if (token) {
    localStorage.setItem('token', token);
  }
  api = makeAxios(token);
}

export async function acquireTicket(vmName: string): Promise<string> {
  return (await axios.get<string>('http://localhost:4567/acquireTicket?name=' + vmName)).data;
}

export async function listVms(): Promise<VirtualMachine[]> {
 return (await axios.get<VirtualMachine[]>('http://localhost:4567/vms')).data;
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
export async function getCurrentUser() {
  return ( await api.get<User>('/user/current')).data;
}

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (token) {
    // @ts-ignore
    const decoded = jwt_decode<AuthToken>(token);
    // @todo implement auth checking.
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getPublicModules(): Promise<Module[]> {
  return ( await axios.get<Module[]>(`${baseUrl}/modules`)).data;
}

export async function getPrivateModules(): Promise<Module[]> {
  return ( await axios.get<Module[]>(`${baseUrl}/modules`)).data;
}
