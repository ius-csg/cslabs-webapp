import {LabVm} from './Module';

export interface UserLabVm {
  id: number;
  proxmoxVmId: number;
  labVm: LabVm;
}

export interface Statuses {
  [key: number]: string;
}

export function isRunning(status: string) {
  return status === 'running';
}
