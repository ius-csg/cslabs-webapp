import axios from 'axios';
import {VirtualMachine} from '../types/VirtualMachine';

export async function acquireTicket(vmName: string): Promise<string> {
  return (await axios.get<string>('http://localhost:4567/acquireTicket?name=' + vmName)).data;
}

export async function listVms(): Promise<VirtualMachine[]> {
 return (await axios.get<VirtualMachine[]>('http://localhost:4567/vms')).data;
}
