import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faList, faUser} from '@fortawesome/free-solid-svg-icons';
import CSGIcon from '../../assets/icons/cs-labs-icon-128.png';
import {Link} from 'react-router-dom';

export const NavigationBar = () => (
  <Navbar bg={styles.navbar} variant={styles.navbar} className={styles['navbar']}>
    <Container>
      <Navbar.Brand className={styles['navbar-brand']}>
        <Link to={'/'}>
          <img src={CSGIcon} alt={'CSG Icon'}/>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id={'basic-navbar-nav'} className={styles['navbar']}>
        <nav className={'mr-auto'}>
        </nav>
        <Nav>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link>
              <Link to='/explore'>
                <FontAwesomeIcon icon={faBook} size={'2x'} rotation={180}/> Explore
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link>
              <Link to='/explore'>
                <FontAwesomeIcon icon={faList} size={'2x'}/> Modules
              </Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link>
              <Link to={'/login'}>
                <FontAwesomeIcon icon={faUser} size={'2x'}/> Account
              </Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
