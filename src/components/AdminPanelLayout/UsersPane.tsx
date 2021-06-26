import {TabPane, ListGroup, ListGroupItem} from 'react-bootstrap';
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
      this.state.users.map((u) =>
        <TabPane key='user-management' eventKey='#user-management'>
          <ListGroup>
            <ListGroupItem key={u.id}>
              <span style={styles.nameSpan}>
                {u.firstName}
              </span>
              <span style={styles.nameSpan}>
                {u.lastName}
              </span>
              <span style={styles.emailSpan}>
                {u.email}
              </span>
              <span style={styles.roleSpan}>
                {u.role}
              </span>
            </ListGroupItem>
          </ListGroup>
        </TabPane>
      )
    );
  }
}

const styles = {
  nameSpan: {
    display: 'inline-block',
    width: '25%'
  },
  emailSpan: {
    display: 'inline-block',
    width: '40%'
  },
  roleSpan: {
    display: 'inline-block',
    width: '10%'
  }
};

export default UsersPane;
