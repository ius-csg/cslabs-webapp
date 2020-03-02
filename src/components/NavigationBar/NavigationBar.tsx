import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {faBook, faList, faUser, faEnvelopeOpenText, faEdit} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {NavItem} from './NavItem';
import {NavLogo} from './NavLogo';

const NavigationBarComponent =
  ({authenticated, userType}: ReturnType<typeof mapStateToProps>) => <Navbar className={styles['navbar']}>
  <Container>
    <NavLogo/>
    <Nav>
      <NavItem label='Explore' link='/explore' icon={faBook}/>
      {userType === 'creator' ? <NavItem label='Module Editors' icon={faEdit} link='/ContentCreator'/> : null}
      {authenticated ? <NavItem label='My Modules' link='/my-modules' icon={faList}/> : null}
      {/*{authenticated ? <NavItem label='Modules' link='/modules' icon={faList} /> : null}*/}
      <NavItem label='Account' link='/login' icon={faUser}/>
      <NavItem label='Contact Us' link='/contact' icon={faEnvelopeOpenText}/>
    </Nav>
  </Container>
</Navbar>;
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state), userType: state.entities.currentUser.userType });
export const NavigationBar = connect(mapStateToProps)(NavigationBarComponent);
