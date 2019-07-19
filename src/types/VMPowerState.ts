
export enum VMPowerState {
  POWERED_ON = 'poweredOn',
  POWERED_OFF = 'poweredOff',
  SUSPENDED = 'suspended'
}

export function getPowerStateLabel(powerState: VMPowerState) {
  switch (powerState) {
    case VMPowerState.POWERED_ON: return 'Powered On';
    case VMPowerState.POWERED_OFF: return 'Powered Off';
    case VMPowerState.SUSPENDED: return 'Suspended';
    default: return '';
  }
}
