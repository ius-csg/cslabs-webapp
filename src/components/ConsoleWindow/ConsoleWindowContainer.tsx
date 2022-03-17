import {UserLabVm} from '../../types/UserLabVm';
import { useState } from 'react';
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
      <div className='full-height-container'>
        <ConsoleWindow vm={props.vm} status={props.status} inPopout={false}/>
        <Row style={{marginTop: 20}}>
          <Col xs={3} sm={2}>
            <Button onClick={() => setShowWindowPortal(!showWindowPortal)} style={{marginLeft: 'auto', marginRight: 'auto'}}>
              {showWindowPortal ? 'Close the' : 'Open a'} Popout Window
            </Button>
          </Col>
        </Row>
      </div>
      {showWindowPortal && (
        <ConsolePopout closeWindowPortal={() => setShowWindowPortal(false)}>
          <ConsoleWindow vm={props.vm} status={props.status} inPopout={true}/>
        </ConsolePopout>
      )}
    </>
  );
}
