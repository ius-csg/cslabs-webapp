import {UserLabVm} from '../../types/UserLabVm';
import * as React from 'react';
import {useState} from 'react';
import ConsolePopout from './ConsolePopout';
import ConsoleWindow from './ConsoleWindow';

interface Props {
  vm: UserLabVm;
  status: string;
}

export function ConsoleWindowContainer(props: Props) {
  const [showWindowPortal, setShowWindowPortal] = useState(false);
  return (
    <>
      <ConsoleWindow vm={props.vm} status={props.status}/>
      <button onClick={() => setShowWindowPortal(!showWindowPortal)}>{showWindowPortal ? 'Close the' : 'Open a'} Portal</button>
      {showWindowPortal && (
        <ConsolePopout closeWindowPortal={() => setShowWindowPortal(false)}>
          <ConsoleWindow vm={props.vm} status={props.status}/>
        </ConsolePopout>
      )}
    </>
  );
}
