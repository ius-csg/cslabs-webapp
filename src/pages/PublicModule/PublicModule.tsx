import {useEffect, useState} from 'react';
import {Module} from '../../types/Module';
import {getModuleByPrivateCode, getPublicModule, startUserModule} from '../../api';
import {useParams} from 'react-router';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {Layout} from '../Layout/Layout';
import {Alert, Button, Card} from 'react-bootstrap';
import Styles from './PublicModule.module.scss';
import {getLocalDateTimeString} from '../../util';
import {LoadingButton} from '../../util/LoadingButton';
import { makeModule } from 'factories';


type PublicModuleProps = ReturnType<typeof mapStateToProps>;

function PublicModule (props: PublicModuleProps) {
  const params = useParams();
  const [module, setModule] = useState(makeModule());
  const [message, setMessage] = useState<any>(null);
  const [startingModule, setStartingModule] = useState(false);

  const getId = () => Number(params.id);

  useEffect(() => {
  async function showModule() {  
    try {
      if (isNaN(Number(params.id))) {
        setModule(await getModuleByPrivateCode(params.id!));
      } else {
        setModule(await getPublicModule(getId()));
      }
    } catch (e) {
      setMessage('Could not load module');
    }
  }
  showModule();
  }, []);

  const startModule = async () => {
    if (module) {
      try {
        setStartingModule(true);
        const userModule = await startUserModule(String(module.specialCode));
        setModule({...module, userModuleId: (userModule).id});
        setStartingModule(false);
      } catch (e: any) {
        setMessage('Failed to start module!');
        setStartingModule(false);
      }
    }
  };

  function isUserModuleReady() {
    return Boolean(getModule().userModuleId) && !startingModule;
  }

  function hasUserModule() {
    return Boolean(getModule().userModuleId);
  }

  function renderStartButton() {
    if (message) {
      return null;
    }
    if (module.id === 0) {
      return null;
    }
    if (props.authenticated) {
      if (isUserModuleReady()) {
        return (
          <Link to={'/user-module/' + getModule().userModuleId}>
            {renderButton()}
          </Link>
        );
      } else {
        return renderButton();
      }
    } else {
      return (
        <Link to={RoutePaths.loginWithRedirect.replace(':redirect', RoutePaths.module.replace(':id', module.specialCode))}>
          <Button className='btn btn-primary' style={{width: 200}}>Login</Button>
        </Link>
      );
    }
  }

  function renderButton() {
    return (
      <LoadingButton
        label={getButtonText()}
        loading={startingModule}
        className='btn btn-primary'
        onClick={hasUserModule() ? undefined : startModule}
      />
    );
  }

  function getButtonText() {
    if (isUserModuleReady()) {
      return 'Go to Module';
    }
    return module.type === 'SingleUser' ? 'Start' : 'Join';
  }

  function getModule(): Module {
    if (!module) {
      return {} as Module;
    }
    return module;
  }

  const currentModule = getModule();
  return (
    <Layout>
      <Alert style={{textAlign: 'center'}} show={Boolean(message)} variant='danger'>{message}</Alert>
      <Card className={Styles.card}>
        <Card.Body>
          <Card.Title>{currentModule.name}</Card.Title>
          <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {currentModule.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <small className='text-muted'>{getLocalDateTimeString(currentModule.updatedAt)}</small>
          {renderStartButton()}
        </Card.Footer>
      </Card>
    </Layout>
  );
}

const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(PublicModule);

