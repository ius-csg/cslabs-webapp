import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {OverlayTrigger, Popover} from 'react-bootstrap';
const popover = (
    <Popover id='popover-basic' style={{ maxWidth: '750px'}}>
        <Popover.Title as='h3'>Lab Types:</Popover.Title>
        <Popover.Content>
        <div>- Temporary - only persist for only an hour and torn down afterwards. Their is no long term persistence with temporary labs.</div>
        <div>
            - Semester - these labs persist until a certain date-time is reached. 
            Once the date-time is reach the lab is torn down is unable to be started again.</div>
        <div>- Permanent - these labs are never torn down.</div>
        </Popover.Content>
    </Popover>
);  
const LabTypesComponent = () => (
    <OverlayTrigger trigger='hover' placement='right' overlay={popover}>
        <a> <FontAwesomeIcon icon={faInfoCircle}/></a>
    </OverlayTrigger>
);
export const LabTypes = (LabTypesComponent);