import {Spinner} from 'react-bootstrap';
import React from 'react';

export function HorizontallyCenteredSpinner() {
  return (
    <div style={{textAlign: 'center'}}>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
}
