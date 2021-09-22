import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const ToolTip = (props: any) => {
    return (
    <OverlayTrigger
      key={props.placement}
      placement={props.placement}
      delay={{ show: 100, hide: 250 }}
      overlay={
        <Tooltip id={`tooltip-${props.placement}`}>
          {props.text}
        </Tooltip>
      }
    >
      {props.tool}
    </OverlayTrigger>
    );    
}

export default ToolTip;