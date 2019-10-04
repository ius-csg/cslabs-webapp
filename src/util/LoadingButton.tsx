import * as React from 'react';
import {Button, Spinner} from 'react-bootstrap';

export const LoadingButton = (props: {loading: boolean; label: string}) => (
  <Button disabled={props.loading} variant='primary' type='submit'>
    { props.loading ?
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      /> : props.label}
  </Button>
);
