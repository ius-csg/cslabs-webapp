import {Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {User} from '../../types/User';
import {getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';


const UsersPane = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useMount(async () => {
    setUsers(await getUserList());
    completeLoading();
  });

  function completeLoading() {
    setLoading(false);
  }

  const renderUserList = () => (
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
        <tr key={u.id} style={{cursor: 'pointer'}}>
          <td>{u.firstName} {u.lastName}</td>
          <td>{u.email}</td>
          <td>{u.role}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : renderUserList()}</Layout>;

};

export default UsersPane;
