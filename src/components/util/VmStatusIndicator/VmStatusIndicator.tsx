import * as styles from '../../LabEnvironment/LabEnvironment.module.scss';
import {isRunning} from '../../../types/UserLabVm';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../../util/CenteredIcon';
import * as React from 'react';


export function getIndicatorClassName(running: boolean) {
  return [
    styles['power-indicator'],
    running ? styles['on'] : ''
  ].join(' ');
}
interface Props {
  status: string;
}
export function VmStatusIndicator({status}: Props) {
  return (
    <CenteredIcon className={getIndicatorClassName(isRunning(status))} icon={faPowerOff} />
  );
}
