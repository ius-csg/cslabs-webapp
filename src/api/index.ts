import axios from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';
import {Module} from '../types/Module';

const baseUrl = 'https://localhost:5001/api';

export async function acquireTicket(vmName: string): Promise<string> {
  return (await axios.get<string>('http://localhost:4567/acquireTicket?name=' + vmName)).data;
}

export async function listVms(): Promise<VirtualMachine[]> {
 return (await axios.get<VirtualMachine[]>('http://localhost:4567/vms')).data;
}

export async function getModule(id: number) {
  return ( await axios.get<Module>(`${baseUrl}/modules/${id}`)).data;
}

export async function getPublicModules(): Promise<Module[]> {
  return ( await axios.get<Module[]>(`${baseUrl}/modules`)).data;
}

export async function getPrivateModules(): Promise<Module[]> {
  return ( await axios.get<Module[]>(`${baseUrl}/modules`)).data;
}
