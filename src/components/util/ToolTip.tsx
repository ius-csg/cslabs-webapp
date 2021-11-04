import React from 'react';
import { Tooltip, OverlayTrigger, Container } from 'react-bootstrap';

interface ToolTipProps {
  key: string;
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
      key={props.key}
      placement={props.placement}
      delay={props.delay}
      overlay={
        <Tooltip id={`tooltip-${props.key}`}>
          {props.text}
        </Tooltip>}
    >
      <Container className='p-0'>
        {props.children}
      </Container>
    </OverlayTrigger>
  );
}
