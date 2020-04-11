import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';
import React, {CSSProperties} from 'react';
import {ButtonProps} from 'react-bootstrap/Button';
import {NavLinkProps} from 'react-router-dom';

type Props = {
  to: NavLinkProps['to'];
  children: any;
  style?: CSSProperties;
  className?: string;
} & ButtonProps;

export function ButtonLink({to, children, ...props}: Props) {
  return (
    <LinkContainer to={to} style={props.style}>
      <Button type='button' {...props} >{children}</Button>
    </LinkContainer>
  );
}
