import {VMPowerState} from './VMPowerState';
import {LabVm} from './Module';

export interface UserLabVm {
  id: number;
  proxmoxVmId: number;
  powerState: VMPowerState;
  labVm: LabVm;
}
