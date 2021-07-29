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

  const commitUsers = () => {
    changeUserRole(updateRequests)
      .then((response) => {
      setCommitResponsecode(response.status);
      setUpdateRequests([]);
    })
      .catch((response: AxiosResponse<string>) => {
        setCommitResponsecode(response.status);
      });
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
        <UserListItem key={u.id} user={u} onRoleChange={addUserToUpdate} />
      ))}
      </tbody>
    </Table>
  )}
    <div style={{float: 'right'}}>
      <Button variant={'outline-primary'} onClick={commitUsers}>Commit</Button>
      {commitResponseCode === 204 ?
        (<p style={{color: '#02b875'}}>Commit successful!</p>) :
        commitResponseCode === 401 ?
          (<p style={{color: '#d9534f'}}>You are not authorized to change user roles, please see a CSLabs admin</p>) :
          commitResponseCode ?
          (<p style={{color: '#d9534f'}}>Error committing changes, please try again</p>) :
            null
          }
    </div>
  </Layout>;

};

export default UsersPane;
