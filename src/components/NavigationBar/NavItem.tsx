import styles from './NavigationBar.module.scss';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';


// convert to props
interface NavItemProp  {
  icon: IconProp;
  link: string;
  label: string;
  linkDisabled: boolean;
}

export function NavItem(props: NavItemProp) {
  return (
    <Nav.Item className={styles['nav-item']}>
      <Nav.Link as='span'>
        {props.linkDisabled ?
          <Link to={props.link} className={styles['link-disabled']} onClick={(event) => event.preventDefault()}/>
        :<Link to={props.link}>
          <FontAwesomeIcon icon={props.icon} size={'lg'} style={{fontSize: 20}}/>
          <span style={{fontSize: 14}}>{props.label}</span>
        </Link>
            }
      </Nav.Link>
    </Nav.Item>
  );
}

NavItem.defaultProps = {
  linkDisabled: false
};

