import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import {Layout} from '../Layout/Layout';
import {UserModule} from '../../types/Module';
import {getUserModule} from '../../api';
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

type UserModuleLabsProps = RouteComponentProps<{id: string}>;

export interface UserModuleLabsState {
  userModule: UserModule;
  moduleLab: {[key: number]: string};
}

class UserModulePage extends Component <UserModuleLabsProps, UserModuleLabsState> {
  state: UserModuleLabsState = {
     userModule: {
       id: 0,
       module: {
         id: 0,
         name: '',
         shortName: '',
         description: '',
         published: false,
         updatedAt: '',
         createdAt: '',
         userModuleId: 0
       },
       userLabs: []
     },
    moduleLab: {}
  };

  componentDidMount(): void {
    this.loadModules();
  }

  async loadModules() {
    const userModule = await getUserModule(Number(this.props.match.params.id));
    this.setState({ userModule: userModule});
  }

  render() {
    const moduleName = this.state.userModule.module.name;
    const labs = this.state.userModule.userLabs;
    const labList = labs.map((m, i) =>
      // tslint:disable-next-line:jsx-wrap-multiline
      <Link to={`lab/` + m.id} key={i}>
        <ListGroup.Item key={this.state.userModule.id}>{m.lab.name}</ListGroup.Item>
      </Link>
    );
    return (
      <Layout>
        <h1>Module {moduleName}</h1>
        <ListGroup>{labList}</ListGroup>
      </Layout>
    );
  }
}

export default UserModulePage;
