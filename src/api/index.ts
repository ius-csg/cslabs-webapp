import axios from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';
import {Module} from '../types/Module';
import {User} from '../types/User';
import {RegisterForm} from '../pages/Login/Login';

let api = makeAxios();

function makeAxios(token?: string) {
  if (!token) {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      token = storedToken;
    }
  }
  return axios.create({
    baseURL: 'https://localhost:5001/api',
    ...(token ? {
      headers: {Authorization: `Bearer ${token}`}
    } : {})
  });
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

export async function login(email: string, password: string) {
  const user =  ( await api.post<User>('/user/authenticate', {email: email, password: password })).data;
  const token: string = String(user.token);
  localStorage.setItem('token', token);
  api = makeAxios(user.token);
  return user;
}

export async function register(form: RegisterForm) {
  const user =  ( await api.post<User>('/user/register', form)).data;
  const token: string = String(user.token);
  localStorage.setItem('token', token);
  api = makeAxios(user.token);
  return user;
}
export async function getCurrentUser() {
  return ( await api.get<User>('/user/current')).data;
}
