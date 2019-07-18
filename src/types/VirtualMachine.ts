import {VMPowerState} from './VMPowerState';

export interface VirtualMachine {
  name: string;
  powerState: VMPowerState;
}
