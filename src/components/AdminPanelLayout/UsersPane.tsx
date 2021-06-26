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
  }

  componentWillMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const users = await getUserList();
    this.setState({ users: users});
  }

  renderNoUsers() {
    return (
      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <h6>There was an error loading registered users.</h6>
      </div>
    );
  }


  render() {
    return (
      this.state.users.map((u) =>
        <TabPane key='user-management' eventKey='#user-management'>
          <ListGroup>
            <ListGroupItem key={u.id}>
              <span style={styles.userSpan}>
                {u.firstName}
              </span>
              <span style={styles.userSpan}>
                {u.lastName}
              </span>
              <span style={styles.userSpan}>
                {u.email}
              </span>
              <span style={styles.userSpan}>
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
  userSpan: {
    margin: '10px'
  }
};

export default UsersPane;
