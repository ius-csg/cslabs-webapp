import {Layout} from '../Layout/Layout';
import styles from './ServiceUnavailable.module.scss';
import image from '../../assets/images/broken_server.png';
import {useMount} from '../../hooks/useMount';
import {useState} from 'react';
import {getMaintenances} from '../../api';
import ServiceMessage from '../../components/ServiceMessage/ServiceMessage';
import {Maintenance} from '../../types/Maintenance';

const ServiceUnavailable = () => {

  const [maintenances, setMaintenances] = useState<Maintenance[]|undefined>(undefined);

  const [isErrored, setIsErrored] = useState(false);
  useMount( async () => {
    try {
      setMaintenances(await getMaintenances());
    } catch {
      setIsErrored(true);
    }

  });

  return (
    <Layout>
      <div className={styles['number-code']}>
        <img src={image} alt={'broken_server.png'}/>
        <h1>503</h1>
        <h2>Service Unavailable</h2>
        {maintenances && maintenances.length > 0 && !isErrored
          ? <ServiceMessage
            startTime={maintenances[0].startTime}
            endTime={maintenances[0].endTime}
          />
          :
          <div>Sorry, our servers are unavailable at the moment. We are actively working to get them back up as soon as possible.</div>}
        <div>For more information, please contact your local administrator</div>
      </div>
    </Layout>
  );
};

export default ServiceUnavailable;


