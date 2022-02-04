import React, {CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
import {CookieAlert} from '../../components/CookieAlert/CookieAlert';
import {BrowserSupportAlert} from '../../components/BrowserSupportAlert/BrowserSupportAlert';
import {NavigationBar} from '../../components/NavigationBar/NavigationBar';
import SystemMessageList from '../../components/SystemMessageList/SystemMessageList';
import {WebState} from '../../redux/types/WebState';
import {isVerified} from '../../redux/selectors/entities';
import {connect} from 'react-redux';

interface LayoutProps {
  fluid?: boolean;
  children: any;
  style?: CSSProperties;
  className?: string;
  // navigation?: boolean; // disableNavigation
}

// lambda function to full function
const LayoutComponent = (props: LayoutProps, {verified}: ReturnType<typeof mapStateToProps>) =>
  <div>
    {verified ? // https://raquo.net/2018/11/left-side-of-comma-operator-is-unused-and-has-no-side-effects/
      <>
        <NavigationBar/>
        <SystemMessageList/>
      </> : null
    }

    <Container style={{marginTop: 20, marginBottom: 20, ...props.style || {}}} {...{fluid: props.fluid}} className={props.className}>
      {props.children}
      <CookieAlert/>
      <BrowserSupportAlert/>
    </Container>
  </div>;

const mapStateToProps = (state: WebState) => {
  return ({
    verified: isVerified(state)
  });
};


/*Layout.defaultProps = {
  navigation: true
};*/


export const Layout = connect(mapStateToProps)(LayoutComponent);
