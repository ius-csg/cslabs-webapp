import {VMPowerState} from './VMPowerState';

export interface UserLabVm {
  id: number;
  proxmoxVmId: number;
  name: string;
  powerState: VMPowerState;
}
