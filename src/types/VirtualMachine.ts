import {VirtualMachinePowerState} from './VirtualMachinePowerState';

export interface VirtualMachine {
  name: string;
  powerState: VirtualMachinePowerState;
}
