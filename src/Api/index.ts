import axios from 'axios';

export function acquireTicket(vmName: string): Promise<string> {
  return axios.get('http://localhost:4567/acquireTicket?name=' + vmName).then(r => r.data as string);
}

let cachedVms: string[];
export async function listVms(): Promise<string[]> {
  if (!cachedVms) {
    cachedVms = await axios.get('http://localhost:4567/vms').then(r => r.data as string[]);
  }
  return cachedVms;
}
