import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {faBook, faList, faUser, faEnvelopeOpenText, faEdit, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated, isAdmin, isCreator, isVerified} from '../../redux/selectors/entities';
import {NavItem} from './NavItem';
import {NavLogo} from './NavLogo';
import {RoutePaths} from '../../router/RoutePaths';


// https://stackoverflow.com/questions/38321601/easier-way-to-to-disable-link-in-react
const NavigationBarComponent =
({authenticated, creator, admin, verified}: ReturnType<typeof mapStateToProps>) => <Navbar className={styles['navbar']}>
  <Container>
    <NavLogo/>
    <Nav>
      <NavItem label='Explore' link='/explore' icon={faBook} linkDisabled={verified}/>
      {authenticated ? <NavItem label='My Modules' link='/my-modules' icon={faList}/> : null}
      {admin ? <NavItem label='Admin Panel' icon={faUserCog} link={RoutePaths.adminPanel}/> : null}
      {creator || admin ? <NavItem label='Module Editor' icon={faEdit} link={RoutePaths.contentCreator} /> : null}
      <NavItem label='Account' link='/login' icon={faUser} linkDisabled={verified} />
      <NavItem label='Contact Us' link='/contact' icon={faEnvelopeOpenText} linkDisabled={verified}/>
    </Nav>
  </Container>
</Navbar>;

const mapStateToProps = (state: WebState) => {
  return ({
    authenticated: isAuthenticated(state),
    creator: isCreator(state),
    admin: isAdmin(state),
    verified: isVerified(state)
  });
};
export const NavigationBar = connect(mapStateToProps)(NavigationBarComponent);
