import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

interface ToolTipProps {
  id: string;
  placement: 'auto-start' | 'auto' | 'auto-end'
  | 'top-start' | 'top' | 'top-end' | 'right-start'
  | 'right' | 'right-end' | 'bottom-end' | 'bottom'
  | 'bottom-start' | 'left-end' | 'left' | 'left-start';
  delay?: { show: number; hide: number };
  text: string;
  children: any;
}

export default function ToolTip(props: ToolTipProps) {
  return (
    <OverlayTrigger
      key={props.id}
      placement={props.placement}
      delay={props.delay}
      overlay={
        <Tooltip id={`tooltip-${props.id}`} style={{margin: '0.4rem'}}>
          {props.text}
        </Tooltip>}
    >
      <div>
        {props.children}
      </div>
    </OverlayTrigger>
  );
}
