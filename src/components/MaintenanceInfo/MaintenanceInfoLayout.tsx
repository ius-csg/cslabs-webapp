import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import styles from './MaintenanceInfoLayout.module.scss';
import image from '../../assets/images/broken_server.png';
import {useMount} from '../../hooks/useMount';
import {useState} from 'react';
import {getMaintenances} from '../../api';
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
    return <div>serviceMessage</div>;
  }
};

const MaintenanceInfoLayout = () => {

  const [maintenance, setMaintenance] = useState();

  useMount( async () => {
    setMaintenance(await getMaintenances());
  });

  return (
    <Layout>
      <div className={styles['number-code']}>
        <img src={image} alt={'broken_server.png'}/>
        <h1>503</h1>
        <h2>Service Unavailable</h2>
        {maintenance ?
          <ServiceMessage
            isMaintenanceMode={maintenance.isMaintenanceMode}
            isRestorationTimeKnown={maintenance.isRestorationTimeKnown}
            restorationTime={maintenance.restorationTime}
          />
          : <div>Sorry, our servers are unavailable at the moment. We are actively working to get them back up as soon as possible.</div>}
        <div>For more information, please contact your local CSG administrator</div>
      </div>
    </Layout>
  );
};
export default MaintenanceInfoLayout;


