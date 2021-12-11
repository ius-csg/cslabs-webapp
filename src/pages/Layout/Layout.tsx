import React, {CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
import {CookieAlert} from '../../components/CookieAlert/CookieAlert';
import {BrowserSupportAlert} from '../../components/BrowserSupportAlert/BrowserSupportAlert';
import {NavigationBar} from '../../components/NavigationBar/NavigationBar';
import SystemMessageList from '../../components/SystemMessageList/SystemMessageList';

interface LayoutProps {
  fluid?: boolean;
  children: any;
  style?: CSSProperties;
  className?: string;
  navigation: boolean;
  // disableNavigation
}
export const Layout = (props: LayoutProps) => (
  <div>
    if(props.navigation){
      // https://raquo.net/2018/11/left-side-of-comma-operator-is-unused-and-has-no-side-effects/
      <>
        <NavigationBar/>
        <SystemMessageList/>
      </>
    }
    <Container style={{marginTop: 20, marginBottom: 20, ...props.style || {}}} {...{fluid: props.fluid}} className={props.className}>
      {props.children}
      <CookieAlert />
      <BrowserSupportAlert/>
    </Container>
  </div>
);

Layout.defaultProps = {
  navigation: true
};
