import * as React from 'react';
import {Button, Spinner} from 'react-bootstrap';

interface Props {loading: boolean; label: string; className?: string; }

export const LoadingButton = (props: Props) => (
  <Button className={props.className} disabled={props.loading} variant='primary' type='submit'>
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
