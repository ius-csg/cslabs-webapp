import {IconDropDownItem} from '../util/IconDropDownItem';
import {resetVm, scrubVm, shutdownVm, startUpVm, stopVm} from '../../api';
import {faPlay, faPowerOff, faUndo} from '@fortawesome/free-solid-svg-icons';
import {Dropdown} from 'react-bootstrap';
import * as React from 'react';
import {UserLabVm} from '../../types/UserLabVm';

export function VmActionsMenu({vm}: {vm: UserLabVm}) {
  const [scrubbing, setScrubbing] = React.useState(false);
  const [shuttingDown, setShuttingDown] = React.useState(false);
  const performScrub = async (vmId: number) => {
    if(window.confirm('Are you sure you wish to scrub this VM?')) {
      setScrubbing(true);
      await scrubVm(vmId);
      setScrubbing(false);
    }
  };
  const performShutdown =  async (vmId: number) => {
    setShuttingDown(true);
    await shutdownVm(vmId);
    setTimeout(() =>  setShuttingDown(false), 20000);
  };
  return (
    <Dropdown.Menu>
      <IconDropDownItem onClick={() => startUpVm(vm.id)} icon={faPlay} label='Start Up'/>
      <IconDropDownItem onClick={() => performShutdown(vm.id)} loading={shuttingDown} loadingText='Shutting Down' icon={faPowerOff} label='Shutdown'/>
      <IconDropDownItem onClick={() => stopVm(vm.id)} color='red' icon={faPowerOff} label='Force Shutdown'/>
      <IconDropDownItem onClick={() => performScrub(vm.id)} color='red' loading={scrubbing} loadingText='Scrubbing' icon={faUndo} label='Scrub'/>
      <IconDropDownItem onClick={() => resetVm(vm.id)} color='red' icon={faUndo} label='Reset'/>
    </Dropdown.Menu>
  );
}
