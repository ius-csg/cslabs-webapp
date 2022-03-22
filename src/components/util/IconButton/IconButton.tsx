import { Fragment, CSSProperties } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';
import styles from './IconButton.module.scss';
import {Link} from 'react-router-dom';

interface IconButtonProps {
  icon: IconProp;
  hideIcon?: boolean;
  size?: SizeProp;
  customSize?: number;
  styles?: CSSProperties;
  onClick?: () => void;
  children?: any;
  link?: string;
  disableHover?: boolean;
  className?: string;
  color?: string;
}

export function IconButton(props: IconButtonProps) {

  const style = { cursor: 'pointer', ...props.styles, ...(props.color ? {color: props.color} : {}) };

  let button = null;
  const commonProps = {
    'className': styles['icon-button'],
    'style': {display: 'flex', alignItems: 'center'},
    'hidden': props.hideIcon
  };
  if (props.link) {
    button = (
      <Link {...commonProps} to={props.link}>
        <IconButtonIcon {...props} />
      </Link>
    );
  } else {
    button =  (
      <span {...commonProps} onClick={props.onClick}>
        <IconButtonIcon {...props} />
      </span>
    );
  }
  return (
    <span style={{display: 'inline-block', ...style}} className={props.className}>{button}</span>
  );
}

function IconButtonIcon(props: IconButtonProps) {
  return (
    <Fragment>
      <FontAwesomeIcon
        icon={props.icon}
        size={props.size}
        className={styles['icon']}
        style={{
          cursor: 'pointer',
          ...(props.customSize ? {fontSize: props.customSize} : {}),
          ...(props.color ? {color: props.color} : {})
        }}
      />
      {props.children ? <span style={{marginLeft: '1rem'}}>{props.children}</span> : null}
    </Fragment>
  );
}
