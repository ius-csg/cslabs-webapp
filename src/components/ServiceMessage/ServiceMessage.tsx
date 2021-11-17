import React from 'react';
import {Maintenance} from '../../types/Maintenance';

const ServiceMessage = (props: Maintenance) => {

  const end = new Date(props.endTime);
  const currentDate = new Date();

  if (end.toDateString() === currentDate.toDateString()) {
    return <div>Our servers are currently down for maintenance and are scheduled to be back up
      at {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.</div>;
  }
  else {
    return <div>Our servers are currently down for maintenance and are scheduled to be back up
      on {end.toDateString()} at {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.</div>;
  }

};
export default ServiceMessage;
