import {useEffect, useState } from 'react';
import {Layout} from '../Layout/Layout';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {
  getUserLab,
  getUserLabVmStatuses,
  getUserLabInitializationStatus,
  startUserLab,
  turnOnUserLab
} from '../../api';
import {UserLab} from '../../types/UserLab';
import {handleAxiosError} from '../../util';
import {Alert} from 'react-bootstrap';
import {useParams} from 'react-router';
import {makeUserLab} from 'factories';


export function UserLabPage () {
  const params = useParams();
  const [userLab, setUserLab] = useState<UserLab>(makeUserLab());
  const [statuses, setStatuses] = useState<{ [key: number]: string }>();
  const [starting, setStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userLabResult, setUserLabResult] = useState<UserLab>(makeUserLab());

  let interval: any;
  let initializationInterval: any;

  const getId = () => Number(params.id);

  useEffect(() => {
    async function start() {
      const newUserLab = await getUserLab(getId());
      setUserLab(newUserLab);
      if (newUserLab.status === 'Started') {
        startVmsAndInitiateStatuses(newUserLab);
      }
    }
    start();

    return () => {
      if (interval)
        clearInterval(interval);
    };
  }, []);

  async function startVmsAndInitiateStatuses(uL: UserLab) {
    const newStatuses = await getUserLabVmStatuses(uL.id);
    setStatuses(newStatuses);
    await turnOnUserLab(uL.id);
    interval = setInterval(async () => {
      setStatuses(await getUserLabVmStatuses(userLab.id));
      setUserLab(await getUserLab(userLab.id));
      }, 5000);
  }

  const initializeUserLab = async () => {
    setStarting(true);
    try {
      setUserLabResult(await startUserLab(getId()));
      await startCheckingIfLabIsInitialized();
    } catch (e: any) {
      setErrorMessage(handleAxiosError(e));
    } finally {
      setStarting(false);
    }
  };

  async function startCheckingIfLabIsInitialized() {
    const initialized = await checkIfLabInitialized();
    if (initialized) {
      initializationInterval = setInterval(async () => checkIfLabInitialized(), 5000);
    }
  }

  async function checkIfLabInitialized() {
    try {
      const status = await getUserLabInitializationStatus(getId());
      setStarting(status === 'Initializing');
      if (status === 'Initialized') {
        if (initializationInterval) {
          clearInterval(initializationInterval);
        }
        setUserLab(userLabResult);
        startVmsAndInitiateStatuses(userLabResult);
      }
      return status === 'Initialized';
    } catch (e: any) {
      setErrorMessage(handleAxiosError(e));
      setStarting(false);
      return true;
    }
  }

  return (
    <Layout fluid={true} className='full-height-container'>
      <Alert show={Boolean(errorMessage)} variant='danger'>{errorMessage}</Alert>
      {userLab ?
        <LabEnvironment
          userLab={userLab}
          statuses={statuses!}
          starting={starting}
          onStartLab={initializeUserLab}
        /> : null}
    </Layout>
  );
}
