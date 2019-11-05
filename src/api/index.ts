import axios, {AxiosResponse} from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';
import {Module} from '../types/Module';
import {User, UserWithToken} from '../types/User';
import {RegisterForm} from '../pages/Login/Login';
import {makeAxios} from '../components/util/Util';
import {Dispatch} from 'redux';
import {setCurrentUser} from '../redux/actions/entities/currentUser';

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
}

export async function acquireTicket(id: number): Promise<TicketResponse> {
  return (await api.get<TicketResponse>('/VirtualMachines/get-ticket/' + id)).data;
}

export async function listVms(): Promise<VirtualMachine[]> {
 return (await axios.get<VirtualMachine[]>('http://localhost:4567/vms')).data;
}

export async function startUpVm(name: string): Promise<VirtualMachine> {
  return (await axios.put<VirtualMachine>(`/LabVirtualMachines/${name}`)).data;
}

export async function shutdownVm(name: string): Promise<VirtualMachine> {
  return (await axios.put<VirtualMachine>(`/LabVirtualMachines/${name}`)).data;
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

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser(null));
};

export async function getPublicModules(): Promise<Module[]> {
  return ( await api.get<Module[]>(`/modules`)).data;
}

export async function getPublicModule(id: number) {
  return ( await api.get<Module>(`/modules/${id}`)).data;
}

export async function getPrivateModules() {
  return ( await api.get<Module[]>(`/modules/`)).data;
}
