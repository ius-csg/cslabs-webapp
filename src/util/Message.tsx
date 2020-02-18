import {MessageState} from './index';
import {Alert, Row} from 'react-bootstrap';
import * as React from 'react';

export function Message({state}: {state: MessageState}) {
  return (
    <Row className='flex-column mt-4'>
      <Alert show={Boolean(state.message)} variant={state.variant}>{state.message}</Alert>
    </Row>
  );
}
