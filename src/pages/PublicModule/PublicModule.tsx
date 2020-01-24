import React, {Component} from 'react';
import {Module} from '../../types/Module';
import {getModuleByPrivateCode, getPublicModule, getUserModuleStatus, startUserModule} from '../../api';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {Layout} from '../Layout/Layout';
import {Button, Card, Spinner} from 'react-bootstrap';
import Styles from './PublicModule.module.scss';

interface MyModuleState {
  module: Module;
  message?: string;
  status?: string;
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
      shortName: '',
      specialCode: '',
      updatedAt: ''
    }
  };
  private interval: any;
  constructor(props: PublicModuleProps) {
    super(props);

  }

  async componentDidMount() {
    try {
      let module = null;
      if (isNaN(Number(this.props.match.params.id))) {
        module = await getModuleByPrivateCode(this.props.match.params.id);
      } else {
        module = await getPublicModule(Number(this.props.match.params.id));
      }
      this.checkStatusIfModuleInstantiated();
      this.setState({module: module});
    } catch (e) {
      this.setState({message: 'Could not load module'});
    }

  }

  async checkStatusIfModuleInstantiated() {
    const userModuleId = (this.state.module || {}).userModuleId;
    if (userModuleId) {
      const status = await getUserModuleStatus(userModuleId);
      this.setState({status: status});
      if (status !== 'Initialized') {
        this.setStatusCheckInterval();
      }
    }
  }

  setStatusCheckInterval() {
    this.interval = setInterval(async () => {
      const status = await getUserModuleStatus(Number(this.getModule().userModuleId));
      if (this.state.status !== status) {
        this.setState({status: status});
        if (status === 'Initialized') {
          this.clearInterval();
        }
      }
    }, 5000);
  }

  componentWillUnmount(): void {
    this.clearInterval();
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startModule = async () => {
    if (this.state.module !== undefined) {
      try {
        const module = await startUserModule(String(this.state.module.specialCode));
        this.setStatusCheckInterval();
        this.setState({status: 'Initializing'});
        this.setState({
          module: {
            ...this.state.module,
            userModuleId: (module).id
          }
        });
      } catch (e) {
        this.setState({message: 'Failed to instantiate module!'});
        this.clearInterval();
      }
    }
  };

  isModuleReady() {
    return Boolean(this.getModule().userModuleId) && this.state.status === 'Initialized';
  }

  isModuleLoading(): boolean {
    return this.state.status === 'Initializing';
  }

  hasModule() {
    return Boolean(this.getModule().userModuleId);
  }

  getButtonText() {
    if (this.isModuleReady()) {
      return 'Go to Module';
    }
    if (this.isModuleLoading()) {
      return 'Initializing Lab';
    }
    return 'Start';
  }

  renderButton() {
    return (
      <Button
        disabled={this.isModuleLoading()}
        className='btn btn-primary'
        style={{width:  this.isModuleLoading() ? 300 : 200}}
        onClick={this.hasModule() ? undefined : this.startModule}
      >
        {this.isModuleLoading() ? <span style={{marginRight: 10}}><Spinner animation='border' size='sm' /></span> : null}
        {this.getButtonText()}
      </Button>
    );
  }

  getStartButton() {
    if (this.state.module.id === 0) {
      return null;
    }
    if (this.props.authenticated) {
      if (this.isModuleReady()) {
        return (
          <Link to={'/user-module/' + this.getModule().userModuleId}>
            {this.renderButton()}
          </Link>
        );
      } else {
        return this.renderButton();
      }
    } else {
      return null;
    }
  }

  getModule(): Module {
    if (!this.state.module) {
      return {} as Module;
    }
    return this.state.module;
  }

  render() {
    const module = this.getModule();
    if (!this.props.authenticated) {
      return <Link to={RoutePaths.login}/>;
    }
    return (
      <Layout>
        <h5 style={{textAlign: 'center'}}>{this.state.message ? this.state.message : null}</h5>
        <Card className={Styles.card}>
          <Card.Body>
            <Card.Title>{module.name}</Card.Title>
            <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
              {module.description.substring(0, 150)}
            </Card.Text>
            {this.state.status === 'Initializing' ?
              <h5>Your lab is starting. Please Wait...</h5> : null}
          </Card.Body>
          <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <small className='text-muted'>{module.updatedAt}</small>
            {this.getStartButton()}
          </Card.Footer>
        </Card>

      </Layout>
    );
  }
}

const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(PublicModule);
