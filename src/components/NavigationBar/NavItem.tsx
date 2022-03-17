import styles from './NavigationBar.module.scss';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';


export function NavItem({icon, link, label}: {icon: IconProp; link: string; label: string}) {
  return (
    <Nav.Item className={styles['nav-item']}>
      <Nav.Link as='span'>
        <Link to={link}>
          <FontAwesomeIcon icon={icon} size={'lg'} style={{fontSize: 20}}/>
          <span style={{fontSize: 14}}>{label}</span>
        </Link>
      </Nav.Link>
    </Nav.Item>
  );
}
