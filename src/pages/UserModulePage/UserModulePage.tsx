import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {Layout} from '../Layout/Layout';
import {getUserModule} from '../../api';
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import * as styles from './UserModulePage.module.scss';
import {getUserLabStatusLabel, UserLabStatus} from '../../types/UserLab';
import {makeUserModule} from 'factories';

export function getIndicatorClassName(status: UserLabStatus) {
  return [
    styles['lab-status-indicator'],
    status === 'Started' ? styles['in-progress'] : '',
    status === 'Completed' ? styles['completed'] : ''
  ].join(' ');
}

function UserModulePage() {
  const params = useParams();
  const [userModule, setUserModule] = useState(makeUserModule);

  useEffect(() => {
    loadModules();
  }, []);

  async function loadModules() {
    const uM = await getUserModule(Number(params.id));
    setUserModule(uM);
  }

  const moduleName = userModule.module.name;
  const labs = userModule.userLabs;
  return (
    <Layout>
      <h1>Module : {moduleName}</h1>
      <ListGroup>
        {labs.map((l, i) => (
          <Link to={RoutePaths.userLab.replace(':id', String(l.id))} key={i}>
            <ListGroup.Item key={userModule.id}  className={getIndicatorClassName(l.status)}>{l.lab.name}
              <span style={{textAlign: 'right', float: 'right'}}>{getUserLabStatusLabel(l.status)}</span>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </Layout>
  );
}

export default UserModulePage;
