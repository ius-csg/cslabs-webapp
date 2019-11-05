import React from 'react';
import {RouteComponentProps} from 'react-router';
import {Component} from 'react';
import {Layout} from '../Layout/Layout';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {UserLabVm} from '../../types/UserLabVm';
import {getUserModule} from '../../api';

type UserModuleProps = RouteComponentProps<{id: string}>;

interface UserModuleState {
  vms?: UserLabVm[];
}

export class UserModulePage extends Component<UserModuleProps, UserModuleState> {

  state: UserModuleState = {
    vms: undefined
  };

  async componentDidMount() {
    this.setState({
      vms: (await getUserModule(Number(this.props.match.params.id))).userLabs[0].userLabVms
    });
  }

  render() {
    return (
        <Layout fluid={true} className='full-height-container'>
          {this.state.vms !== undefined ? <LabEnvironment vms={this.state.vms}/> : null}
        </Layout>
    );
  }

}
