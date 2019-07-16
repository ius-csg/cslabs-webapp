import axios from 'axios';

export function acquireTicket(vmName: string): Promise<string> {
  return axios.get('http://localhost:4567/acquireTicket?name=' + vmName).then(r => r.data as string);
}

export function listVms(): Promise<string[]> {
  return axios.get('http://localhost:4567/vms').then(r => r.data as string[]);
}
