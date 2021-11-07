import * as React from 'react';
import {Button, ButtonProps, Spinner} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

type onClick = ((e: React.SyntheticEvent<HTMLButtonElement>) => void) | (() => void) | (() => any);

interface Props {
  loading: boolean;
  label: string;
  className?: string;
  type?: ButtonProps['type'];
  disabled?: boolean;
  onClick?: onClick;
}

function renderButton(props: Props) {
  const innerButton = (
    <Button disabled={props.loading} variant='primary' type={props.type || 'submit'} className={props.className} onClick={props.onClick}>
      {props.loading ?
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
        /> : props.label}
    </Button>
  );

  if (props.disabled && props.disabledToolTip) {
    return (<>
      <ReactTooltip place='left' type='dark' effect='solid'/>
      <a data-tip='This lab is currently disabled'>
        {innerButton}
      </a>
    </>);
  }
  return innerButton;
}

export const LoadingButton = (props: Props) => (
  <>
    {renderButton(props)}
  </>
);
