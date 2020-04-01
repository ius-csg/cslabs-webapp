import {LabVm} from './LabVm';
import {Entity} from './Entity';

export interface UserLabVm extends Entity {
  proxmoxVmId: number;
  labVm: LabVm;
}

export interface Statuses {
  [key: number]: string;
}

export function isRunning(status: string) {
  return status === 'running';
}
