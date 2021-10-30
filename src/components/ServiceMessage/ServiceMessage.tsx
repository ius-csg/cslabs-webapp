import React from 'react';
import {Maintenance} from '../../types/Maintenance';

const ServiceMessage = (props: Maintenance) => {
  if (props.isMaintenanceMode) {
    if (props.isRestorationTimeKnown) {
      return <div>Our servers are currently down for maintenance and are scheduled to be back up
        at {props.restorationTime}</div>;
    } else {
      return <div>Our servers are currently down for maintenance. Please check back later.</div>;
    }
  }
  else {
    return <div>Sorry, our servers are unavailable at the moment. We are actively working to get them back up as soon as possible.</div>;
  }
};
export default ServiceMessage;
