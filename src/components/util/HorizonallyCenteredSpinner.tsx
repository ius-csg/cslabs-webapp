import {Spinner} from 'react-bootstrap';

export function HorizontallyCenteredSpinner() {
  return (
    <div style={{textAlign: 'center'}}>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
}
