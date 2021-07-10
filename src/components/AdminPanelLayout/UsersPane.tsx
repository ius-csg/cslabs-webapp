import {Button, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {User} from '../../types/User';
import {getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';
import UserListItem from './UserListItem';

const UsersPane = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useMount(async () => {
    setUsers(await getUserList());
    setLoading(false);
  });



  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : (
    <Table striped={true} bordered={true} hover={true}>
      <thead style={{backgroundColor: '#adb5bd'}}>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
      </thead>
      <tbody>
      {users.map((u: User) => (
        <UserListItem key={u.id} user={u} />
      ))}
      </tbody>
    </Table>
  )}
    <Button variant={'outline-primary'}>Commit</Button>
  </Layout>;

};

export default UsersPane;
