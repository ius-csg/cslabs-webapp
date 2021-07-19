import {Button, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {User} from '../../types/User';
import {changeUserRole, getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';
import UserListItem, {ChangeUserRoleRequestSchema} from './UserListItem';

const UsersPane = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [usersToUpdate, setUsersToUpdate] = useState<User[]>([]);

  useMount(async () => {
    setUsers(await getUserList());
    setLoading(false);
  });

  const addUserToUpdate = (user: User) => {
    const listToUpdate = usersToUpdate;
    listToUpdate.push(user);
    setUsersToUpdate(listToUpdate);
  };

  const commitUsers = () => {
    const updateRequest: ChangeUserRoleRequestSchema[] = [];
    for (const user of usersToUpdate) {
      updateRequest.push({
        userId: user.id,
        newRole: user.role
      });
    }

    changeUserRole(updateRequest);

    setUsersToUpdate([]);
  };

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
        <UserListItem key={u.id} user={u} updateRolesFunction={addUserToUpdate} />
      ))}
      </tbody>
    </Table>
  )}
    <Button variant={'outline-primary'} onClick={commitUsers}>Commit</Button>
  </Layout>;

};

export default UsersPane;
