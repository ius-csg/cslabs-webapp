import axios from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';

export function acquireTicket(vmName: string): Promise<string> {
  return axios.get('http://localhost:4567/acquireTicket?name=' + vmName).then(r => r.data as string);
}

export function listVms(): Promise<VirtualMachine[]> {
 return axios.get('http://localhost:4567/vms').then(r => r.data as VirtualMachine[]);
}
