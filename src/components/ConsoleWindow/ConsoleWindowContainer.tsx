import {UserLabVm} from '../../types/UserLabVm';
import * as React from 'react';
import {useState} from 'react';
import ConsolePopout from './ConsolePopout';
import ConsoleWindow from './ConsoleWindow';
import {Button, Col, Row} from 'react-bootstrap';

interface Props {
  vm: UserLabVm;
  status: string;
}

export function ConsoleWindowContainer(props: Props) {
  const [showWindowPortal, setShowWindowPortal] = useState(false);
  return (
    <>
      <ConsoleWindow vm={props.vm} status={props.status}/>
      <Row>
        <Button onClick={() => setShowWindowPortal(!showWindowPortal)} as={Col} style={{marginLeft: 'auto', marginRight: 'auto'}} xs={3} sm={2}>
          {showWindowPortal ? 'Close the' : 'Open a'} Popout Window
        </Button>
      </Row>
      {showWindowPortal && (
        <ConsolePopout closeWindowPortal={() => setShowWindowPortal(false)}>
          <ConsoleWindow vm={props.vm} status={props.status}/>
        </ConsolePopout>
      )}
    </>
  );
}
