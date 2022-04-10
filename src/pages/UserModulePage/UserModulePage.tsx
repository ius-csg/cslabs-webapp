import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import {Layout} from '../Layout/Layout';
import {getUserModule} from '../../api';
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {UserModule} from '../../types/UserModule';
import * as styles from './UserModulePage.module.scss';
import {getUserLabStatusLabel, UserLabStatus} from '../../types/UserLab';

type UserModuleLabsProps = RouteComponentProps<{id: string}>;

export interface UserModuleLabsState {
  userModule: UserModule;
  moduleLab: {[key: number]: string};
}

export function getIndicatorClassName(status: UserLabStatus) {
  return [
    styles['lab-status-indicator'],
    status === 'Started' ? styles['in-progress'] : '',
    status === 'Completed' ? styles['completed'] : ''
  ].join(' ');
}

class UserModulePage extends Component <UserModuleLabsProps, UserModuleLabsState> {
  state: UserModuleLabsState = {
     userModule: {
       id: 0,
       createdAt: '',
       updatedAt: '',
       module: {
         id: 0,
         name: '',
         description: '',
         userId: 0,
         published: false,
         updatedAt: '',
         createdAt: '',
         specialCode: '',
         type: 'SingleUser',
         userModuleId: 0,
         moduleTags: []
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
    return (
      <Layout>
        <h1>Module : {moduleName}</h1>
        <ListGroup>
          {labs.map((l, i) => (
            <Link to={RoutePaths.userLab.replace(':id', String(l.id))} key={i}>
              <ListGroup.Item key={this.state.userModule.id}  className={getIndicatorClassName(l.status)}>{l.lab.name}
                <span style={{textAlign: 'right', float: 'right'}}>{getUserLabStatusLabel(l.status)}</span>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </Layout>
    );
  }
}

export default UserModulePage;
