import React from 'react';
import {Maintenance} from '../../types/Maintenance';
// this will need changed to reflect backend
const ServiceMessage = (props: Maintenance) => {
  if (props.endTime != null) {
      return <div>Our servers are currently down for maintenance and are scheduled to be back up
        at {props.endTime}</div>;
  }
  else {
    return <div>Sorry, our servers are unavailable at the moment. We are actively working to get them back up as soon as possible.</div>;
  }
};
export default ServiceMessage;
