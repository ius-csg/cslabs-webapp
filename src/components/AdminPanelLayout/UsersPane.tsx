import {Button, Modal, ModalBody, ModalFooter, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {Role, User} from '../../types/User';
import {changeUserRole, getCurrentUserFromServer, getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';
import UserListItem from './UserListItem';
import {ChangeUserRoleRequest} from '../../api';
import {AxiosResponse} from 'axios';
import ModalHeader from 'react-bootstrap/ModalHeader';

const UsersPane = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [updateRequests, setUpdateRequests] = useState<ChangeUserRoleRequest[]>([]);
  const [commitResponseCode, setCommitResponseCode] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [userToUpdateOnConfirm, setUserToUpdate] = useState<[Role, User]>();

  useMount(async () => {
    setUsers(await getUserList());
    setCurrentUser(await getCurrentUserFromServer());
    setLoading(false);
  });

  const handleRoleChange = (role: Role, user: User) => {
    if (user.id === currentUser.id && !warningShown) {
      setShowWarning(true);
      setUserToUpdate([role, user]);
    }
    else {
      updateUser(role, user);
    }
  };

  const updateUser = (role: Role, user: User) => {
    user.role = role;
    addUserToUpdate({
      userId: user.id,
      newRole: role
    });
  };

  const addUserToUpdate = (request: ChangeUserRoleRequest) => {
    const requestIndex = updateRequests.findIndex((req) => req.userId === request.userId);
    if (requestIndex < 0) {
      setUpdateRequests([...updateRequests, request]);
    }
    else {
      const newRequests = [...updateRequests];
      newRequests[requestIndex] = request;
      setUpdateRequests(newRequests);
    }
  };

  const commitUsers = async () => {
    try {
      const response = await (changeUserRole(updateRequests));
      setCommitResponseCode(response.status);
      setUpdateRequests([]);
    } catch (e) {
      setCommitResponseCode((e as AxiosResponse<string>).status);
    }
    window.setTimeout(() => setCommitResponseCode(undefined), 2000);
  };


  const ConfirmRoleChange = () => {

    const closeModal = () => {
      setShowWarning(false);
    };

    const handleCancel = () => {
      closeModal();
      setUserToUpdate(undefined);
    };

    const handleConfirm = () => {
      closeModal();
      setWarningShown(true);
      if (userToUpdateOnConfirm) {
        updateUser(userToUpdateOnConfirm[0], userToUpdateOnConfirm[1]);
      }
    };

    return (
      <Layout>
        <Modal
          show={showWarning}
          backdrop={'static'}
          keyboard={false}
        >
          <ModalHeader style={{color: '#fff', backgroundColor: '#d9534f'}}>
            CAUTION
          </ModalHeader>
          <ModalBody>
            You are editing your own role. Doing so could lead to unexpected behavior, and you may be denied access to the
            admin panel. Are you certain you wish to proceed?
          </ModalBody>
          <ModalFooter>
            <Button variant={'primary'} onClick={handleCancel}>Cancel</Button>
            <Button variant={'secondary'} onClick={handleConfirm}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </Layout>
    );
  };

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : (
    <div>
      <ConfirmRoleChange/>
      <div style={{textAlign: 'right', padding: '10px 20px'}}>
        {commitResponseCode === 204 ?
          (<p style={{position: 'absolute', top: '0', right: '0', color: '#02b875'}}>Save successful!</p>) :
          commitResponseCode === 401 ?
            (<p style={{position: 'absolute', top: '0', right: '0', color: '#d9534f'}}>You are not authorized to change
              user roles, or you are no longer signed in. If you are signed in, and you believe
              this to be in error, please see a CSLabs admin</p>) :
            commitResponseCode ?
              (<p style={{position: 'absolute', top: '0', right: '0', color: '#d9534f'}}>Error saving changes, please try again</p>) :
              null}
        <Button variant={'outline-primary'} onClick={commitUsers}>Save</Button>
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
          <UserListItem key={u.id} user={u} onRoleChange={handleRoleChange}/>
        ))}
        </tbody>
      </Table>
    </div>
  )}
  </Layout>;

};

export default UsersPane;
