import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {faBook, faList, faUser, faEnvelopeOpenText, faEdit, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated, isCreator, isAdmin} from '../../redux/selectors/entities';
import {NavItem} from './NavItem';
import {NavLogo} from './NavLogo';

const NavigationBarComponent =
  ({authenticated, creator, admin}: ReturnType<typeof mapStateToProps>) => <Navbar className={styles['navbar']}>
  <Container>
    <NavLogo/>
    <Nav>
      <NavItem label='Explore' link='/explore' icon={faBook}/>
      {authenticated ? <NavItem label='My Modules' link='/my-modules' icon={faList}/> : null}
      {creator ? <NavItem label='Module Editor' icon={faEdit} link='/ContentCreator'/> : null}
      {admin ? <NavItem label='Module Editor' icon={faUserCog} link='/admin'/> : null}
      <NavItem label='Account' link='/login' icon={faUser}/>
      <NavItem label='Contact Us' link='/contact' icon={faEnvelopeOpenText}/>
    </Nav>
  </Container>
</Navbar>;
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state), creator: isCreator(state), admin: isAdmin(state) });
export const NavigationBar = connect(mapStateToProps)(NavigationBarComponent);
