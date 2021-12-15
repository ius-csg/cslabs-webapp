import React, {Component} from 'react';
import {Module} from '../../types/Module';
import {getModuleByPrivateCode, getPublicModule, startUserModule} from '../../api';
import {RouteComponentProps} from 'react-router';
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
import {TagEditor} from "../../components/TagEditor/TagEditor";

interface MyModuleState {
  module: Module;
  message?: string;
  startingModule: boolean;
}

function doNothing() {
  // do nothing
}

type PublicModuleProps = RouteComponentProps<{ id: string }> & ReturnType<typeof mapStateToProps>;

class PublicModule extends Component<PublicModuleProps, MyModuleState> {

  state: MyModuleState = {
    module: {
      id: 0,
      createdAt: '',
      description: '',
      name: 'Loading',
      published: false,
      userId: 0,
      specialCode: '',
      type: 'SingleUser',
      updatedAt: '',
      moduleTags: []
    },
    startingModule: false
  };

  getId = () => Number(this.props.match.params.id);

  async componentDidMount() {
    try {
      if (isNaN(Number(this.props.match.params.id))) {
        this.setState({module: await getModuleByPrivateCode(this.props.match.params.id)});
      } else {
        this.setState({module: await getPublicModule(this.getId())});
      }
    } catch (e) {
      this.setState({message: 'Could not load module'});
    }

  }

  startModule = async () => {
    if (this.state.module !== undefined) {
      try {
        this.setState({startingModule: true});
        const userModule = await startUserModule(String(this.state.module.specialCode));
        this.setState({module: {...this.state.module, userModuleId: (userModule).id}, startingModule: false});
      } catch (e) {
        this.setState({message: 'Failed to start module!', startingModule: false});
      }
    }
  };

  isUserModuleReady() {
    return Boolean(this.getModule().userModuleId) && !this.state.startingModule;
  }

  hasUserModule() {
    return Boolean(this.getModule().userModuleId);
  }

  renderStartButton() {
    if (this.state.message) {
      return null;
    }
    if (this.state.module.id === 0) {
      return null;
    }
    if (this.props.authenticated) {
      if (this.isUserModuleReady()) {
        return (
          <Link to={'/user-module/' + this.getModule().userModuleId}>
            {this.renderButton()}
          </Link>
        );
      } else {
        return this.renderButton();
      }
    } else {
      return (
        <Link to={RoutePaths.loginWithRedirect.replace(':redirect', RoutePaths.module.replace(':id', this.state.module.specialCode))}>
          <Button className='btn btn-primary' style={{width: 200}}>Login</Button>
        </Link>
      );
    }
  }

  renderButton() {
    return (
      <LoadingButton
        label={this.getButtonText()}
        loading={this.state.startingModule}
        className='btn btn-primary'
        onClick={this.hasUserModule() ? undefined : this.startModule}
      />
    );
  }

  getButtonText() {
    if (this.isUserModuleReady()) {
      return 'Go to Module';
    }
    return this.state.module.type === 'SingleUser' ? 'Start' : 'Join';
  }

  getModule(): Module {
    if (!this.state.module) {
      return {} as Module;
    }
    return this.state.module;
  }

  render() {
    const module = this.getModule();
    return (
      <Layout>
        <Alert style={{textAlign: 'center'}} show={Boolean(this.state.message)} variant='danger'>{this.state.message}</Alert>
        <Card className={Styles.card}>
          <Card.Body>
            <Card.Title>{module.name}</Card.Title>
            <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
              {module.description}
            </Card.Text>
            <TagEditor
              onAdd={doNothing}
              editing={false}
              tagSuggestions={[]}
              onInput={doNothing}
              onDelete={doNothing}
              tags={module.moduleTags.map(mt => mt.tag)}
            />
          </Card.Body>
          <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <small className='text-muted'>{getLocalDateTimeString(module.updatedAt)}</small>
            {this.renderStartButton()}
          </Card.Footer>
        </Card>

      </Layout>
    );
  }
}

const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(PublicModule);

