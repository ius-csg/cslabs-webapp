import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface CenteredIconProps {
  icon: any;
  className?: string;
  style?: React.CSSProperties;
}

export function CenteredIcon(props: CenteredIconProps) {
  return (
    <span className={props.className} style={{fontSize: '100%', lineHeight: '100%', marginLeft: '.5em', marginRight: '.5em', ...(props.style || {})}}>
      <FontAwesomeIcon style={{fontSize: '70%', lineHeight: '100%', verticalAlign: 'middle'}} icon={props.icon} />
    </span>
  );
}
