import React from 'react';
import {Maintenance} from '../../types/Maintenance';
const ServiceMessage = (props: Maintenance) => {
   return <div>Our servers are currently down for maintenance and are scheduled to be back up
        at {props.endTime}</div>;
};
export default ServiceMessage;
