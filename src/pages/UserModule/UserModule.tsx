import React from 'react';
import {RouteComponentProps} from 'react-router';
import {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {UserLabVm} from '../../types/UserLabVm';
import {getUserLabVmStatuses, getUserModule, startUpVm} from '../../api';
import {UserModule} from '../../types/Module';

type UserModuleProps = RouteComponentProps<{id: string}>;

interface UserModuleState {
  vms: UserLabVm[];
  userModule?: UserModule;
  statuses: {[key: number]: string};
}

export class UserModulePage extends Component<UserModuleProps, UserModuleState> {

  state: UserModuleState = { statuses: {}, vms: []};
  private interval: any;

  async componentDidMount() {
    const userModule = await getUserModule(Number(this.props.match.params.id));
    this.setState({
      vms: userModule.userLabs[0].userLabVms,
      userModule: userModule
    }, async () => {
      if (this.state.userModule) {
        this.setState({
          statuses:  await getUserLabVmStatuses(this.state.userModule.userLabs[0].id)
        }, () => {
          for (const vm of this.state.vms) {
            if (this.state.statuses[vm.id] === 'stopped') {
                startUpVm(vm.id);
            }
          }
        });
      }
      this.setInterval();

    });
  }

  setInterval() {
    this.interval = setInterval(async () => {
      if (this.state.userModule) {
        this.setState({
          statuses:  await getUserLabVmStatuses(this.state.userModule.userLabs[0].id)
        });
      }
    }, 5000);
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
        <Layout fluid={true} className='full-height-container'>
          {this.state.vms ? <LabEnvironment vms={this.state.vms} statuses={this.state.statuses} /> : null}
        </Layout>
    );
  }

}
