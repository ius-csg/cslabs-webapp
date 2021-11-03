import * as React from 'react';
import {Layout} from '../Layout/Layout';
import styles from './ServiceUnavailable.module.scss';
import image from '../../assets/images/broken_server.png';
import {useMount} from '../../hooks/useMount';
import {useState} from 'react';
import {getMaintenances} from '../../api';
import ServiceMessage from '../../components/ServiceMessage/ServiceMessage';

const ServiceUnavailable = () => {

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
            startTime={maintenance.startTime}
            endTime={maintenance.endTime}
          />
          : <div>Sorry, our servers are unavailable at the moment. We are actively working to get them back up as soon as possible.</div>}
        <div>For more information, please contact your local CSG administrator</div>
      </div>
    </Layout>
  );
};

export default ServiceUnavailable;


