import React from 'react';
import { Nav, Navbar, Container} from 'react-bootstrap';
import styles from './NavigationBar.module.scss';

export const NavigationBar = () => (
  <Navbar expand='lg' className={styles['navbar']}>
    <Container>
      <Navbar.Brand href='/' className={styles.navbarBrand}>CSG</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id={'basic-navbar-nav'} className={styles.navbarNav}>
        <nav className={'mr-auto'}>
          <Nav.Item><Nav.Link href={'/'}>Home > Explore</Nav.Link></Nav.Item>
        </nav>
        <Nav className={'ml-auto nav'}>
          <Nav.Item><Nav.Link href={'/explore'} className={styles.navLink}>Explore</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href={'/explore'}>Modules</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href={'/login'}>Account</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)
