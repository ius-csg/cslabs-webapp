import {VMPowerState} from './VMPowerState';

export interface VirtualMachine {
  id: number;
  proxmoxId: number;
  name: string;
  powerState: VMPowerState;
}
