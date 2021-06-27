import {TabPane, Table} from 'react-bootstrap';
import React from 'react';
import {User} from '../../types/User';
import {getUserList} from '../../api';

interface UsersPaneState {
  users: User[];
}

class UsersPane extends React.Component<{}, UsersPaneState> {

  state:UsersPaneState = {
    users: []
  };

  constructor(props: {}) {
    super(props);
  }

  componentWillMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const users = await getUserList();
    this.setState({users: users});
  }

  render() {
    return (
      <TabPane key='user-management' eventKey='#user-management'>
        <Table striped={true} bordered={true} hover={true}>
          <thead style={{backgroundColor: '#adb5bd'}}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>
          <tbody>
          {this.state.users.map((u) => (
            <tr key={u.id} style={{cursor: 'pointer'}}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </TabPane>
    );
  }
}

export default UsersPane;
