import React from 'react';
import {RouteComponentProps} from 'react-router';
import {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {getUserLab, getUserLabVmStatuses, getUserLabInitializationStatus, startUpVm, startUserLab} from '../../api';
import {UserLab} from '../../types/UserLab';
import {handleAxiosError} from '../../util';
import {Alert} from 'react-bootstrap';

type UserModuleProps = RouteComponentProps<{ id: string }>;

interface UserModuleState {
  userLab?: UserLab;
  statuses: { [key: number]: string };
  starting: boolean;
  errorMessage: string;
  userLabResult?: UserLab;
}

export class UserLabPage extends Component<UserModuleProps, UserModuleState> {

  state: UserModuleState = {statuses: {}, starting: false, errorMessage: ''};
  private interval: any;
  private initializationInterval: any;
  getId = () => Number(this.props.match.params.id);

  async componentDidMount() {
    const userLab = await getUserLab(this.getId());
    this.setState({userLab: userLab});
    if (userLab.status === 'Started') {
      this.startVmsAndInitiateStatuses(userLab);
    }
  }

  async startVmsAndInitiateStatuses(userLab: UserLab) {
    const statuses = await getUserLabVmStatuses(userLab.id);
    this.setState({statuses: statuses});
    for (const vm of userLab.userLabVms) {
      if (this.state.statuses[vm.id] === 'stopped') {
        // noinspection ES6MissingAwait
        startUpVm(vm.id);
      }
    }
    this.interval = setInterval(async () => {
      this.setState({
        statuses: await getUserLabVmStatuses(this.state.userLab!.id),
        userLab: await getUserLab(this.state.userLab!.id)
      });

    }, 5000);
  }

  startUserLab = async () => {
    this.setState({starting: true});
    try {
      this.setState({userLabResult: await startUserLab(this.getId())});
      await this.startCheckingIfLabIsInitialized();
    } catch (e) {
      this.setState({errorMessage: handleAxiosError(e)});
    } finally {
      this.setState({starting: false});
    }
  };

  async startCheckingIfLabIsInitialized() {
    const initialized = this.checkIfLabInitialized();
    if (initialized) {
      this.initializationInterval = setInterval(async () => await this.checkIfLabInitialized(), 5000);
    }
  }

  async checkIfLabInitialized() {
    try {
      const status = await getUserLabInitializationStatus(this.getId());
      this.setState({starting: status === 'Initializing'});
      if (status === 'Initialized') {
        if (this.initializationInterval) {
          clearInterval(this.initializationInterval);
        }
        this.setState({userLab: this.state.userLabResult});
        this.startVmsAndInitiateStatuses(this.state.userLabResult!);
      }
      return status === 'Initialized';
    } catch (e) {
      this.setState({errorMessage: handleAxiosError(e)});
      this.setState({starting: false});
      return true;
    }
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <Layout fluid={true} className='full-height-container'>
        <Alert show={Boolean(this.state.errorMessage)} variant='danger'>{this.state.errorMessage}</Alert>
        {this.state.userLab ?
          <LabEnvironment
            userLab={this.state.userLab}
            statuses={this.state.statuses}
            starting={this.state.starting}
            onStartLab={this.startUserLab}
          /> : null}
      </Layout>
    );
  }

}
