import React, {CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
import {CookieAlert} from '../../components/CookieAlert/CookieAlert';
import {BrowserSupportAlert} from '../../components/BrowserSupportAlert/BrowserSupportAlert';
import {NavigationBar} from '../../components/NavigationBar/NavigationBar';
import SystemMessageList from '../../components/SystemMessageList/SystemMessageList';
import {WebState} from '../../redux/types/WebState';
import {getShouldRedirectToEmailVerification} from '../../redux/selectors/entities';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';


interface LayoutProps {
  fluid?: boolean;
  children: any;
  style?: CSSProperties;
  className?: string;
  isEmailVerificationPage?: boolean;
}


// lambda function to full function
const LayoutComponent = (props: LayoutProps & ReturnType<typeof mapStateToProps>) =>
  <div>
    <NavigationBar/>
    <SystemMessageList/>
    {props.shouldRedirectToEmailVerification && !props.isEmailVerificationPage && <Redirect to={'/emailverification'} />}
    <Container
      style={{marginTop: 20, marginBottom: 20, ...props.style || {}}}
      {...{fluid: props.fluid}}
      className={props.className}
    >
      {props.children}
      <CookieAlert/>
      <BrowserSupportAlert/>
    </Container>
  </div>;

const mapStateToProps = (state: WebState) => {
  return ({
    shouldRedirectToEmailVerification: getShouldRedirectToEmailVerification(state)
  });
};

export const Layout = connect(mapStateToProps)(LayoutComponent);
