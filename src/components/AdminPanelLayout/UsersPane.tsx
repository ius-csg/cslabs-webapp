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
    this.renderNoUsers();
    this.loadUsers();
  }

  async loadUsers() {
    const users = await getUserList();
    this.setState({ users: users});
  }

  renderNoUsers() {
    return (
      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <h6>Loading registered users.</h6>
      </div>
    );
  }

  // TODO: figure out how to get this list to flow horizontally
  render() {
    return (
      this.state.users.map((u) =>
        <TabPane key='user-management' eventKey='#user-management'>
          <ListGroup>
            <ListGroup key={u.id}>
              <ListGroupItem key={u.firstName}>
                {u.firstName}
              </ListGroupItem>
              <ListGroupItem key={u.lastName}>
                {u.lastName}
              </ListGroupItem>
              <ListGroupItem key={u.role}>
                {u.role}
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </TabPane>
      )
    );
  }
}

export default UsersPane;
