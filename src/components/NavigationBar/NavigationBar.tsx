import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faList, faUser} from '@fortawesome/free-solid-svg-icons';
import CSGIcon from '../../assets/icons/cs-labs-icon-128.png';

export const NavigationBar = () => (
  <Navbar bg={styles.navbar} variant={styles.navbar} className={styles['navbar']}>
    <Container>
      <Navbar.Brand href='/' className={styles['navbar-brand']}><img src={CSGIcon} alt={'CSG Icon'}/></Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id={'basic-navbar-nav'} className={styles['navbar']}>
        <nav className={'mr-auto'}>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link href={'/'}>Home > Explore</Nav.Link>
          </Nav.Item>
        </nav>
        <Nav>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link href={'/explore'}><FontAwesomeIcon icon={faBook} size={'2x'} rotation={180}/> Explore</Nav.Link>
          </Nav.Item>
          <Nav.Item className={styles['nav-item']}><Nav.Link href={'/explore'}><FontAwesomeIcon icon={faList} size={'2x'}/> Modules</Nav.Link></Nav.Item>
          <Nav.Item className={styles['nav-item']}><Nav.Link href={'/login'}><FontAwesomeIcon icon={faUser} size={'2x'}/> Account</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
