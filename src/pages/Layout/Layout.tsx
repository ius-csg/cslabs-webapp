import React, {CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
import {CookieAlert} from '../../components/CookieAlert/CookieAlert';
import {BrowserSupportAlert} from '../../components/BrowserSupportAlert/BrowserSupportAlert';
import {Alerts} from '../../components/Alert/Alerts';



interface LayoutProps {
  fluid?: boolean;
  children: any;
  style?: CSSProperties;
  className?: string;
}
export const Layout = (props: LayoutProps) => (
  <Container style={{marginTop: 20, marginBottom: 20, ...props.style || {}}} {...{fluid: props.fluid}} className={props.className}>
    <Alerts/>
    {props.children}
    <CookieAlert />
    <BrowserSupportAlert/>
  </Container>
);
