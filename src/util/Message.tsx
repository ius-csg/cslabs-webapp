import {MessageState} from './index';
import {Alert, Row} from 'react-bootstrap';

export function Message({state}: {state?: MessageState}) {
  if(!state) {
    return null;
  }
  return (
    <Row className='flex-column mt-4'>
      <Alert show={Boolean(state.message)} variant={state.variant}>{state.message}</Alert>
    </Row>
  );
}
