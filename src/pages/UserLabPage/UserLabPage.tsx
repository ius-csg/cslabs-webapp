import React from 'react';
import {RouteComponentProps} from 'react-router';
import {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {getUserLab, getUserLabVmStatuses, startUpVm} from '../../api';
import {UserLab} from '../../types/UserLab';

type UserModuleProps = RouteComponentProps<{id: string}>;

interface UserModuleState {
  userLab?: UserLab;
  statuses: {[key: number]: string};
}

export class UserLabPage extends Component<UserModuleProps, UserModuleState> {

  state: UserModuleState = { statuses: {}};
  private interval: any;

  async componentDidMount() {
    const userLab = await getUserLab(Number(this.props.match.params.id));
    this.setState({
      userLab: userLab
    }, async () => {
      if (this.state.userLab) {
        this.setState({
          statuses:  await getUserLabVmStatuses(this.state.userLab.id)
        }, () => {
          for (const vm of (this.state.userLab as UserLab).userLabVms ) {
            if (this.state.statuses[vm.id] === 'stopped') {
                startUpVm(vm.id);
            }
          }
        });
      }
      this.setStatusInterval();

    });
  }

  setStatusInterval() {
    this.interval = setInterval(async () => {
      if (this.state.userLab) {
        this.setState({
          statuses:  await getUserLabVmStatuses(this.state.userLab.id)
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
          {this.state.userLab ? <LabEnvironment userLab={this.state.userLab} statuses={this.state.statuses} /> : null}
        </Layout>
    );
  }

}
