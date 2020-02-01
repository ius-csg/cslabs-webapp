import * as React from 'react';
import {Button, ButtonProps, Spinner} from 'react-bootstrap';
import {SyntheticEvent} from 'react';

type onClick = ((e: SyntheticEvent<HTMLButtonElement>) => void) | (() => void) | (() => any);

interface Props {
  loading: boolean;
  label: string;
  className?: string;
  type?: ButtonProps['type'];
  disabled?: boolean;
  onClick?: onClick;
}

export const LoadingButton = (props: Props) => (
  <Button disabled={props.loading || props.disabled} variant='primary' type={props.type || 'submit'} className={props.className} onClick={props.onClick}>
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
