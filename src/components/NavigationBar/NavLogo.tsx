import styles from './NavigationBar.module.scss';
import {Link} from 'react-router-dom';
import CSGIcon from '../../assets/icons/cs-labs-icon-128.png';
import {Navbar} from 'react-bootstrap';
import React from 'react';

export function NavLogo() {
  return (
    <Navbar.Brand className={styles['navbar-brand']}>
      <Link to={'/'}  style={{display: 'block'}}>
        <img className={styles['logo']} src={CSGIcon} alt={'CSG Icon'}/>
      </Link>
    </Navbar.Brand>
  );
}
