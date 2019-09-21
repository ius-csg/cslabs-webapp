import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export const NavigationBar = () => (
  <Navbar bg={styles.navbar} variant={styles.navbar} className={styles['navbar']}>
    <Container className={styles['links']}>
      <Navbar.Brand href='/' className={styles['navbar-brand']}>CSG</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id={'basic-navbar-nav'} className={styles['navbar']}>
        <nav className={'mr-auto'}>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link href={'/'}><FontAwesomeIcon icon={faBook} /> Home > Explore</Nav.Link>
          </Nav.Item>
        </nav>
        <Nav>
          <Nav.Item className={styles['nav-item']}>
            <Nav.Link href={'/explore'}><FontAwesomeIcon icon={faBook} /> Explore</Nav.Link>
          </Nav.Item>
          <Nav.Item className={styles['nav-item']}><Nav.Link href={'/explore'}>Modules</Nav.Link></Nav.Item>
          <Nav.Item className={styles['nav-item']}><Nav.Link href={'/login'}>Account</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
