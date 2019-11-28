import React, {CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
interface LayoutProps {
  fluid?: boolean;
  children: any;
  style?: CSSProperties;
  className?: string;
}
export const Layout = (props: LayoutProps) => (
  <Container style={{marginTop: 20, marginBottom: 20, ...props.style || {}}} {...{fluid: props.fluid}} className={props.className}>
    {props.children}
  </Container>
);
