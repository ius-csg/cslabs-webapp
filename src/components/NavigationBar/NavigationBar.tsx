import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faUser} from '@fortawesome/free-solid-svg-icons';
import CSGIcon from '../../assets/icons/cs-labs-icon-128.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';

const NavigationBarComponent = ({authenticated}: ReturnType<typeof mapStateToProps>) => (
  <Navbar className={styles['navbar']}>
    <Container>
      <Navbar.Brand className={styles['navbar-brand']}>
        <Link to={'/'}>
          <img className={styles['logo']} src={CSGIcon} alt={'CSG Icon'}/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id={'basic-navbar-nav'} className={styles['navbar']}>
        <nav className={'mr-auto'} />
        <Nav>
          {/*<Nav.Item className={styles['nav-item']}>*/}
          {/*  <Nav.Link as='span'>*/}
          {/*    <Link to='/explore'>*/}
          {/*      <FontAwesomeIcon icon={faBook} size={'1x'} rotation={180}/> Explore*/}
          {/*    </Link>*/}
          {/*  </Nav.Link>*/}
          {/*</Nav.Item>*/}
          {authenticated ?
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link as='span'>
              <Link to='/my-modules'>
                <FontAwesomeIcon icon={faList} size={'lg'}/>
                <span>My Modules</span>
              </Link>
            </Nav.Link>
          </Nav.Item>
          : null }
          {/*authenticated ?
            <Nav.Item className={styles['nav-item']}>
              <Nav.Link as='span'>
                <Link to='/modules'>
                  <FontAwesomeIcon icon={faList} size={'1x'}/>
                  <span>Modules</span>
                </Link>
              </Nav.Link>
            </Nav.Item>
          : null*/}
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link as='span'>
              <Link to={'/login'}>
                <FontAwesomeIcon icon={faUser} size={'lg'}/>
                <span>Account</span>
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const NavigationBar = connect(mapStateToProps)(NavigationBarComponent);
