import {Button, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {User} from '../../types/User';
import {changeUserRole, getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';
import UserListItem from './UserListItem';
import {ChangeUserRoleRequest} from '../../api';
import {AxiosResponse} from 'axios';

const UsersPane = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [updateRequests, setUpdateRequests] = useState<ChangeUserRoleRequest[]>([]);
  const [commitResponseCode, setCommitResponsecode] = useState();

  useMount(async () => {
    setUsers(await getUserList());
    setLoading(false);
  });

  const addUserToUpdate = (request: ChangeUserRoleRequest) => {
    const requestIndex = updateRequests.findIndex((req) => req.userId === request.userId);
    if (requestIndex < 0) {
      setUpdateRequests([...updateRequests, request]);
    }
    else {
      setUpdateRequests(updateRequests.splice(requestIndex, 1, request));
    }
  };

  const commitUsers = async () => {
    try {
      const response = await (changeUserRole(updateRequests));
      setCommitResponsecode(response.status);
      setUpdateRequests([]);
    } catch (e) {
      setCommitResponsecode((e as AxiosResponse<string>).status);
    }
    window.setTimeout(() => setCommitResponsecode(undefined), 2000);
  };

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : (
    <div>
      <div style={{float: 'right'}}>
        <Button variant={'outline-primary'} onClick={commitUsers}>Save</Button>
        {commitResponseCode === 204 ?
          (<p style={{color: '#02b875'}}>Save successful!</p>) :
          commitResponseCode === 401 ?
            (<p style={{color: '#d9534f'}}>You are not authorized to change user roles, please see a CSLabs admin</p>) :
            commitResponseCode ?
              (<p style={{color: '#d9534f'}}>Error saving changes, please try again</p>) :
              null}
      </div>
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
          <UserListItem key={u.id} user={u} onRoleChange={addUserToUpdate}/>
        ))}
        </tbody>
      </Table>
    </div>
  )}
  </Layout>;

};

export default UsersPane;
